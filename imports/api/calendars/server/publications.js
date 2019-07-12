import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Calendars } from '../calendars';
import { CalendarsRep } from '../calendars';

/**
 * This publication publishes only the calendars that the current 
 * "admin" user has entered.
 * 
 * @returns {Array} collection of calendars
 */
Meteor.publish('calendars.user', function () {
    const isUserAdmin = this.userId && Roles.userIsInRole(this.userId, 'admin');

    if (isUserAdmin) {
        const _user = Meteor.users.findOne(this.userId);
        if (_user && _user.services && _user.services.google) {
            return Calendars.find({
                googleId: _user.services.google.id
            }, {
                fields: Calendars.publicFields
            });
        }
    } else {
        return this.ready();
    }
});

/**
 * Returns all calendars, regardless of user.
 * 
 * @returns {Array} collection of calendars
 */
Meteor.publish('calendars.all', function () {
    if (this.userId) {
        return CalendarsRep.find({}, {
            fields: CalendarsRep.publicFields 
        });
    } else {
        return this.ready();
    }
});