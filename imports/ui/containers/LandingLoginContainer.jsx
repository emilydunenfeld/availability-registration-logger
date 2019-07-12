import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import LandingPage from '../pages/LandingPage';

/**
 * Creates the Container for the Landing page.
 * 
 * @returns a user for the Landing page
 */

export default withTracker(() => {
	var userTwoHandle = Meteor.subscribe('user.data');
    return {
    	user: Meteor.users.findOne()
    };
})(LandingPage);

