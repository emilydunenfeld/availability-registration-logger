import { Meteor } from 'meteor/meteor';

/**
 * Publishes the user's name and email from Google.
 * 
 * @returns {object} the user
 */
Meteor.publish('user.data', function () {
    return Meteor.users.find(
        {_id: this.userId },
        { fields: {
            'services.google.name': 1,
            'services.google.email': 1   
        }});
});