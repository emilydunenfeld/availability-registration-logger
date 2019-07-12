import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AboutPage from '../pages/AboutPage';

/**
 * Creates the Container of the About page.
 * 
 * @returns a user for the About Page
 */

export default withTracker(() => {
	var userHandle = Meteor.subscribe('user.data');
	return {
		user: Meteor.users.findOne()	
	};
})(AboutPage);
