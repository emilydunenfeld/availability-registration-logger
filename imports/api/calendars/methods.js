import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Calendars, CalendarsRep } from './calendars';

/**
 * Inserts a new calendar.
 * 
 * @param {string} calendarId the Google calendar ID
 * @param {string} calendarName the display name of the calendar
 * 
 * @returns {bool} success
 */
export const insertCalendar = new ValidatedMethod({
    name: 'Calendars.methods.insert',

    validate: new SimpleSchema({
        calendarId: { type: String },
        calendarName: { type: String }
    }).validator(),

    run({ calendarId, calendarName }) {
        const _user = Meteor.users.findOne(this.userId);

        let googleId = "";

        if (_user && _user.services && _user.services.google) {
            googleId = _user.services.google.id;
        } else {
            return false;
        }

        const cal = {
            calendarId: calendarId,
            calendarName: calendarName,
            googleId: googleId
        };

        //TODO - go to google to check if calendar id valid
        Calendars.insert(cal);
        console.log("Calendars.methods.insert :: calendar insert successful - " + calendarId);
        CalendarsRep.insert(cal);
        return true;
    },
});

/**
 * Deletes a calendar.
 * 
 * @param {string} calendarId the Google calendar ID
 * @returns {bool} success
 */
export const deleteCalendar = new ValidatedMethod({
    name: 'Calendars.methods.delete',

    validate: new SimpleSchema({
        calendarId: { type: String }
    }).validator(),

    run({ calendarId }) {
        const _user = Meteor.users.findOne(this.userId);
        let googleId = "";

        if (_user && _user.services && _user.services.google) {
            googleId = _user.services.google.id;
        } else {
            return false;
        }

        Calendars.remove({
            calendarId: calendarId,
            googleId: googleId
        });
        console.log("Calendars.methods.insert :: calendar delete successful - " + calendarId);
        CalendarsRep.remove({
            calendarId: calendarId,
            googleId: googleId
        })
        return true;
    }
});