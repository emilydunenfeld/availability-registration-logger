import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// there are two calendars collections server-side because this was the
//   only way I could come up with to allow two calendars collections
//   on the client-side, due to Meteor's constraints.
export const Calendars = new Mongo.Collection('calendars');
export const CalendarsRep = new Mongo.Collection('calendarsrep');

// deny client side updates
Calendars.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

CalendarsRep.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

// schema
Calendars.schema = new SimpleSchema({
    calendarId: {
        type: String
    },
    calendarName: {
        type: String
    },
    googleId: {
        type: String
    },
});

CalendarsRep.schema = new SimpleSchema({
    calendarId: {
        type: String
    },
    calendarName: {
        type: String
    },
    googleId: {
        type: String
    },
});


Calendars.attachSchema(Calendars.schema);
CalendarsRep.attachSchema(CalendarsRep.schema);

Calendars.publicFields = {
    calendarId: 1,
    calendarName: 1,
    googleId: 1,
};

CalendarsRep.publicFields = {
    calendarId: 1,
    calendarName: 1,
    googleId: 1,
};