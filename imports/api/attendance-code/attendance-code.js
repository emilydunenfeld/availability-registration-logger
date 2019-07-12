import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const AttendanceCodes = new Mongo.Collection('attendance.codes');

// deny client side updates
AttendanceCodes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// schema
AttendanceCodes.schema = new SimpleSchema({
    eventId: {
        type: String,
    },
    attendanceCode: {
        type: String,
    },
});
AttendanceCodes.attachSchema(AttendanceCodes.schema);

// expose public fields
AttendanceCodes.publicFields = {
    eventId: 1,
    attendanceCode: 1,
};
