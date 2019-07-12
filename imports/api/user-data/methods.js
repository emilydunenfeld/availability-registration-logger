import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';

/**
 * Sends an email of notes taken via MAIL_URL SMTPS to the user from
 *   capstone.reg.log@gmail.com.
 * 
 * @param {string} notesText the notes taken by the user
 * 
 * @returns {bool} success
 */
export const sendEmail = new ValidatedMethod({
    name: 'User-data.methods.sendEmail',

    validate: new SimpleSchema({
    	notesText: { type: String }
    }).validator(),

    run({ notesText }) {
    	const _user = Meteor.users.findOne(this.userId);

    	let googleEmail = "";

    	if(_user && _user.services && _user.services.google) {
    		googleEmail = _user.services.google.email;
    	} else {
    		return false;
    	}
    	var htmlText = "<p><strong>Here are today's notes! Thanks for using Registration Logger.</strong></p><br/>";
    	Email.send({
    		to: googleEmail,
    		from: "capstone.reg.log@gmail.com",
    		subject: "Your Notes from Today",
    		html: htmlText + notesText
    	});

    	console.log("User-data.methods.sendEmail :: email sent successfully to - " + googleEmail);
    	return true;
    },
});