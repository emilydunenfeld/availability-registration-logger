import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { AttendanceCodes } from './attendance-code';

/**
 * Gets the attendance code by event ID.
 * 
 * @param {string} eventId the Google event ID
 * @returns {string} the attendance code
 */
export const getAttendanceCodeByEventId = new ValidatedMethod({
    name: 'AttendanceCodes.methods.getByEventId',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) {
        const code = AttendanceCodes.findOne({ eventId: eventId });

        if (code) {
            console.log("AttendanceCodes.methods.getByEventId :: SUCCESS - eventId: " + eventId + "; code: " + code.attendanceCode);
            return code.attendanceCode;
        } else {
            console.log("AttendanceCodes.methods.getByEventId :: FAILURE - eventId: " + eventId + "; code: " + code.attendanceCode);
            return null;
        }

        return null;
    },
});

/**
 * Gets the event ID by attendance code.
 * 
 * @param {string} attendanceCode the attendance code
 * @returns {string} the event ID
 */
export const getEventIdByAttendanceCode = new ValidatedMethod({
    name: 'AttendanceCodes.methods.getEventIdByAttendanceCode',

    validate: new SimpleSchema({
        attendanceCode: { type: String },
    }).validator(),

    run({ attendanceCode }) {
        const event = AttendanceCodes.findOne({ attendanceCode: attendanceCode });
        if (event) {
            console.log("AttendanceCodes.methods.getEventIdByAttendanceCode :: SUCCESS - eventId: " + event.eventId + "; code: " + attendanceCode);
            return event.eventId;
        } else {
            console.log("AttendanceCodes.methods.getByEventId :: FAILURE - eventId: " + event.eventId + "; code: " + attendanceCode);
            return null;
        }

        return null;
    },
});

/**
 * Generates a new attendance code for the event.
 * 
 * @param {string} eventId the Google event ID
 * @returns {string} the new attendance code
 */
export const generateAttendanceCodeByEventId = new ValidatedMethod({
    name: 'AttendanceCodes.methods.generateByEventId',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) {
        const code = AttendanceCodes.findOne({ eventId: eventId });

        if (code) {
            console.log("AttendanceCodes.methods.generateByEventId :: Code already generated for event" + eventId);
            return null;
        } else {
            const rand = Random.hexString(4);
            const id = AttendanceCodes.insert({ eventId: eventId, attendanceCode: rand });

            if (id) {
                console.log("AttendanceCodes.methods.generateByEventId :: SUCCESS - eventId: " + eventId + "; code: " + rand);
                return rand;
            } else {
                console.log("AttendanceCodes.methods.generateByEventId :: FAILURE - Could not insert random code for Event ID : " + eventId);
            }
        }

        return null;
    },
});