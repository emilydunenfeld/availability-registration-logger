import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { EventItem } from '../components/EventItem';

const Attendance = new Mongo.Collection('attendance');
const AttendanceCodes = new Mongo.Collection('attendance.codes');

/**
 * Creates the Container for an Event Item.
 * 
 * @returns a reactive Event element
 * @returns an attendanceCode or null
 */

export default withTracker((params) => {
    Meteor.subscribe('user.attendance');
    Meteor.subscribe('attendance.codes');

    const queryCode = AttendanceCodes.findOne({ eventId: params.event.id });

    // update event code
    let eventReactive = params.event;
    eventReactive.isUserAttended = Attendance.find({ eventId: params.event.id }).count() > 0;

    return {
        event: eventReactive,
        attendanceCode: queryCode ? queryCode.attendanceCode : null
    };
})(EventItem);
