import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Attendance } from '../attendance';

/**
 * Publishes all events to which a specific user is attended.
 * 
 * @returns {Array|bool} collection of attendance records
 */
Meteor.publish('user.attendance', function () {
    if (!this.userId) {
        return this.ready();
    }

    const _user = Meteor.users.findOne(this.userId);
    let email = "";
    if (_user && _user.services && _user.services.google) {
        email = _user.services.google.email;
    } 

    if (email) {
        return Attendance.find({
            $or :[
                { userId: this.userId },
                { userEmail: email }
            ]
        }, {
            fields: Attendance.publicFields,
        })
    } else {
        return Attendance.find({ 
            userId: this.userId
        }, {
            fields: Attendance.publicFields,
        })
    }

    return this.ready();
});

/**
 * Publishes all attendance for an event.
 * Only visible to 'admin' level user.
 * 
 * @param {string} eventId the Google event ID
 * @returns {Array|bool} collection of attendance records for the event
 */
Meteor.publish('event.attendance', function (eventId) {
    check(eventId, String);

    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Attendance.find({ 
            eventId: eventId
        }, {
            fields: Attendance.publicFields
        });
    }

    return this.ready();
});