import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SettingsPage from '../pages/SettingsPage';

const Calendars = new Mongo.Collection('calendars');

/**
 * Creates the Container for the Settings page.
 * 
 * @returns {bool} showing whether the page is ready or not
 * @returns {array} of Calendars from the mongo collection
 * @returns {bool} showing whether user is an admin or not
 */

export default withTracker(() => {
    const calendarHandle = Meteor.subscribe('calendars.user');
    var userSettingsHandle = Meteor.subscribe('user.data');
    return {
        loading: !calendarHandle.ready(),
        calendars: Calendars.find({}).fetch(),
        userIsAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    };
})(SettingsPage);
