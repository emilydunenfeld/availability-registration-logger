import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NotesPage from '../pages/NotesPage';

/**
 * Creates the Container for the Notes page.
 * 
 * @returns a user for the Notes page
 */

export default withTracker(() => {
	var userHandle = Meteor.subscribe('user.data');
	return {
		user: Meteor.users.findOne()	
	};
})(NotesPage);

