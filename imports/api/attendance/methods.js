import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Attendance } from './attendance';

/**
 * Inserts a new attendance record.
 * 
 * @param {string} eventId the Google event ID
 * @param {string} attendanceCode the corresponding attendance code
 * 
 * @returns {bool} success
 */
export const insertAttendance = new ValidatedMethod({
    name: 'Attendance.methods.insert',

    validate: new SimpleSchema({
        eventId: { type: String },
        attendanceCode: { type: String },
    }).validator(),

    run({ eventId, attendanceCode }) {
        const _user = Meteor.users.findOne(this.userId);
        let email = "";
        if (_user && _user.services && _user.services.google) {
            email = _user.services.google.email;
        } 

        const at = {
            userId: this.userId,
            userEmail: email,
            eventId: eventId,
        };

        const evLocal = Attendance.findOne(
            { $and: [
                { eventId: at.eventId },
                { $or: [
                    { userId: at.userId },
                    { userEmail: at.userEmail },
                ]}
            ]}
        );

        if (!evLocal) {
            // check against attendance code
            const code = Meteor.call('AttendanceCodes.methods.getByEventId', { eventId: eventId });
            if (code.trim().toUpperCase() === attendanceCode.trim().toUpperCase()) {
                Attendance.insert(at);
                console.log("Attendance inserted: " + at.eventId);
                return true;
            }
        }
        else {
            console.log("Attendance not inserted: " + at.eventId);
            return false;
        }

        return false;
    },
});

/**
 * Exports event attendance to Google Sheet.
 * 
 * @param {string} eventId the Google event ID
 * @returns {bool} success
 */
export const exportToGoogleSheet = new ValidatedMethod({
    name: 'Attendance.methods.exportToGoogleSheet',

    validate: new SimpleSchema({
        eventId: {type: String },
    }).validator(),

    run({ eventId }) {
        const at = {
            userId: this.userId,
            eventId: eventId,
        };

        try {
            if (!Roles.userIsInRole(this.userId, 'admin')) {
                throw new Meteor.Error("User is not an admin, cannot export attendance");
            }

            //Need to use the service account's credentials to output
            const _user = Meteor.users.findOne(this.userId);

            if (_user && _user.services && _user.services.google) {
                var options = {};
                options.headers = {};
                options.headers.Authorization = 'Bearer ' + _user.services.google.accessToken;
            } else {
                throw new Meteor.Error("User's google access token not found");
            }

            //console.log('eventId: ' + eventId);
            // need to figure out how to get the eventId from the button pushed
            cursor = Attendance.find({eventId: eventId});


            //var sheet_id = '1Vn0pArZ18ZuTck-RczNW0-nRNssf5V_87VdjjOHDMKc'; this is the old sheet id
            var sheet_id = '1b57ojZdDdYmrqkRrqAS60aXByJuferL_rnGhUNj0tCo'
            var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheet_id + '/values/Sheet1!A:A:append?valueInputOption=RAW';

            var date = new Date(Date.now()).toLocaleString();
            var options = {
                'data' : {
                    'values' : [['Exported at', date]]
                },

                'headers' : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _user.services.google.accessToken,
                    'X-JavaScript-User-Agent': "Google APIs Explorer"
                }                
            };

            var response = HTTP.call('POST', url, options);

            var options = {
                'data' : {
                    'values' : [['EventId', eventId]]
                },

                'headers' : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _user.services.google.accessToken,
                    'X-JavaScript-User-Agent': "Google APIs Explorer"
                }
            };

            var response = HTTP.call('POST', url, options);
            

            // loop through the attendees and send an API call to the google sheet for each one
            cursor.forEach(function(myDoc) {

                var options = {
                    'data' : {
                        'values' : [[myDoc.userEmail]]
                    },

                    'headers' : {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + _user.services.google.accessToken,
                        'X-JavaScript-User-Agent': "Google APIs Explorer"
                    }                
                };

                var response = HTTP.call('POST', url, options);
                if (response.data.error) {
                    throw new Meteor.Error('Error outputting to sheet, sheet does not exist');
                } else {
                    return response.data;
                }

            });

         

        } catch (error) {
            console.log("Attendance.methods.exportToGoogleSheet :: " + error);
        }
    }
});

/**
 * Deletes an attendance record.
 * 
 * @param {string} eventId the Google event ID
 * @returns {bool} success
 */
export const deleteAttendance = new ValidatedMethod({
    name: 'Attendance.methods.delete',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ userId, eventId }) {
        try {
            if (!Roles.userIsInRole(this.userId, 'admin')) {
                throw new Meteor.Error("User is not an admin, cannot export attendance");
            }

            const _user = Meteor.users.findOne(this.userId);
            const email = "";
    
            if (_user && _user.services && _user.services.google) {
                email = user.services.google.email;
            } 
    
            Attendance.remove({ $and: [
                { eventId: at.eventId },
                { $or: [
                    { userId: this.userId },
                    { userEmail: email },
                ]}
            ]});   
        } catch (err) {
            console.log("Attendance.methods.delete :: " + error);
        } 
    },
});
