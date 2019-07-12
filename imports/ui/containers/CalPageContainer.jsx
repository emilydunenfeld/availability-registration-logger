import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CalPage from '../pages/CalPage';

const CalendarsRep = new Mongo.Collection('calendarsrep');

/**
 * Creates the Container of the Calendar page.
 * 
 * @returns {bool} showing whether to display loading or not
 * @returns {array} of Calendars from the Mongo collection
 */

export default withTracker(() => {
	const calendarRepHandle = Meteor.subscribe('calendars.all');
	return {
		loading: !calendarRepHandle.ready(),
		calendarsRep: CalendarsRep.find({}).fetch()
	};
})(CalPage);
