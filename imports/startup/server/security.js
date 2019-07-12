import { Meteor } from 'meteor/meteor';

// deny all updates to users' profiles
Meteor.users.deny({ update: () => true });

// automatically configure google login
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "1001900628086-204tadcdtjki6idaod9o43vcjb7en4ck.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "StpODtTPtTtZfmZSmR1db-up"
    }
});

//----- USER ROLES -----//
var ADMINS = [
  'capstone.reg.log@gmail.com',
  'beta.reg.log@gmail.com'
];

/**
 * Modifies user before insertion into Users table.
 * NOTE: 
 *   If this function is not being called it may be because the user logging 
 *   in already exists in the Users table. Clear the Users table in order to pick
 *   up these changes by running the following terminal commands:
 * 
 *     $ meteor mongo
 *     meteor:PRIMARY> db.users.remove({})
 */
Accounts.onCreateUser(function (options, user) {
  var userIsAdmin = user.services && user.services.google && ADMINS.includes(user.services.google.email);
  if (userIsAdmin) {
    /*
    * Equivalent to calling Roles.addUsersToRoles(user._id, ['admin']) from alanning:roles package.
    * NOTE:
    *   Because this method (onCreateUser) modifies the user BEFORE it is inserted into the Users table,
    *   the alanning:roles package cannot add user to a role GROUP (i.e., Roles.GLOBAL_GROUP). Therefore
    *   no role groups should be used throughout, and any calls to the Roles package will check default group. 
    */
    user.roles = ['admin'];
  }

  console.log("onCreateUser :: new admin: " + user._id);;
  return user;
});

Accounts.onLogin(function (user) {
  var isAdmin = Roles.userIsInRole(user.user._id, ['admin']);
  console.log("onLogin :: User is admin: " + isAdmin);
});
