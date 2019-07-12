import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { AttendanceCodes } from '../attendance-code';

/**
 * Publishes all events to which a specific user is attended.
 * 
 * @returns {Array|bool} collection attendance records
 */
Meteor.publish('attendance.codes', function () {
    const isUserAdmin = this.userId && Roles.userIsInRole(this.userId, 'admin');
    if (isUserAdmin) {
        return AttendanceCodes.find({}, {
            fields: AttendanceCodes.publicFields
        });
    } else {
        return this.ready();
    }
});