import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';

import { Calendars } from '../../calendars/calendars';

/**
 * Publishes the events from Google from each calendar ID in the db.
 * 
 * This publication assumes a client-side collection named "events", because
 * it is not backed by a server-side collection; instead, the data comes from Google
 * each time and is not stored on the application server.
 * 
 * @returns {bool} publication ready
 */
Meteor.publish('events', function () {
    var self = this;
    var publishedKeys = {};

    try {
        const _user = Meteor.users.findOne(this.userId);

        if (_user && _user.services && _user.services.google) {
            var options = {};
            options.headers = {};
            options.headers.Authorization = 'Bearer ' + _user.services.google.accessToken;
        } else {
            throw new Meteor.Error("User's google access token not found");
        }

        var options = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _user.services.google.accessToken,
                'X-JavaScript-User-Agent': "Google APIs Explorer"
            }
        };

        // for each calendar, call Google for a list of events and publish those
        // to a client-side collection called "events"
        const cals = Calendars.find({});
        cals.forEach(function (cal) {
            const id = cal.calendarId;
            const name = cal.calendarName;

            const url = 'https://www.googleapis.com/calendar/v3/calendars/' + id + '/events';
            const response = HTTP.get(url, options);

            _.each(response.data.items, function (item) {
                item.calendarName = name;

                if (publishedKeys[item.id]) {
                    self.changed('events', item.id, item);
                } else {
                    publishedKeys[item.id] = true;
                    self.added('events', item.id, item);
                }
            });
        })

        self.ready();

    } catch (error) {
        console.log("Publish events :: " + error);
    }
});
