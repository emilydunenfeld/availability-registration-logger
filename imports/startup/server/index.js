// define collections, publications, and methods that the
// app provides as API to client
import './register-api';

// define a starting set of data if app is loaded with an empty db
import './fixtures';

// register security
import './security';

// set SMTPS for emailing notes to the user
process.env.MAIL_URL = "smtps://capstone.reg.log%40gmail.com:registrationlogger@smtp.gmail.com:465/";