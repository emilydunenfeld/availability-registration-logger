import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Navigation } from '../components/Navigation';

/**
 * Creates the Container for the Navigation element.
 * 
 * @returns a user for the Navigation element
 * @returns a {bool} for whether the user is an admin
 */

export default withTracker(() => {
    var userHandle = Meteor.subscribe('user.data');
    return { 
        user: Meteor.users.findOne(),
        userIsAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    };
})(Navigation);
