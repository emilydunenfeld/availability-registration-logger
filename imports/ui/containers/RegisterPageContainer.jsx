import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import RegisterPage from '../pages/RegisterPage';

/**
 * Creates the Container for the Register page.
 * 
 * @returns a user for the Register page
 * @returns {bool} for whether the user is an admin or not
 */

export default withTracker(() => {
    var registerUserHandle = Meteor.subscribe('user.data');
    return { 
        user: Meteor.users.findOne(),
        userIsAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    };
})(RegisterPage);
