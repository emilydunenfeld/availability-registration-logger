import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import App from '../layouts/App';

/**
 * Creates the Container of the App page.
 * 
 * @returns a user for the App
 */

export default withTracker(() => {
	var userHandle = Meteor.subscribe('user.data');
    return { 
    	user: Meteor.users.findOne()
    };
})(App);
