# Activity Availability and Registration Logger

https://registration-logger.appspot.com  
 
> __NOTE__ - The application allows login __only from an `https` origin.__
> If you try to access the application from `http://...` the login will hang.

### Technologies & Documentation

__Framework__ - [MeteorJS](https://docs.meteor.com/)  
__DB__ - [MongoDB](https://docs.mongodb.com/)  
__Front End__ - [React](https://reactjs.org/docs/)  
__UI__ - [Semantic UI React](https://react.semantic-ui.com/introduction)  

_For example file structure, see [meteor todo list example (react branch)](https://github.com/meteor/todos/tree/react)_

### Development
To set up your local machine for development after cloning the repo, follow the steps below:

1. [Install MeteorJS](https://www.meteor.com/install)
2. Install npm packages
```bash
$ cd availability-registration-logger
$ meteor npm install
```
3. Run meteor
```bash
$ meteor
```

You should see a message giving you the port at which the app is running on localhost, usually it is `localhost:3000`

#### Generating Attendance Codes
Attendance is submitted to events using codes generated in the `attendance.codes` database. To find the attendance code for an event in order to submit it, run the following commands in the project directory:

```bash
$ meteor mongo
$ db.attendance.codes.find({})
```

This will return a list of attendance codes correspoding to event IDs. To find the event ID of the event you are trying to attend, check the console output, or debug the javascript. 


### Testing
_See [docs](https://www.meteor.com/tutorials/react/testing)_

__Unit Tests__
```bash
$ TEST_WATCH=1 meteor test --driver-package meteortesting:mocha
```
__Integration Tests__
```bash
$ TEST_WATCH=1 meteor test --full-app --driver-package meteortesting:mocha
```
### Admin Account
__user:__ beta.reg.log@gmail.com  
__pass:__ registrationlogger

### General Methodology
For events to show up on the Newsfeed, they must be on a calendar that is added to the web app. The default calendar for the app is [capstone.reg.log@gmail.com](https://calendar.google.com/calendar/b/2/r?pli=1). If a new event is to be made, go to the [calendar](https://calendar.google.com/calendar/b/2/r?pli=1), and create a new event. Then, while logged in as an admin, generate an attendance code on the Newsfeed. Users will then be able to attend that event by clicking attend and then submitting the code. The admin will be able to export that event, and view it [here](https://docs.google.com/spreadsheets/d/1Vn0pArZ18ZuTck-RczNW0-nRNssf5V_87VdjjOHDMKc/edit#gid=0), and see the users in attendance. Make sure to keep track of the data you are exporting in the sheet, because the exported data is formatted to be useful for a scraper, as per our client's request. Also, if a user goes to the register page, they will be able to attend an event by only signing in with google and submitting the attendance code with it. This app is also deployed to the [Google Cloud](registration-logger.appspot.com). 

### Admin Settings
If an admin tries to add a calendar by putting a Google Email in, the calendar needs to first be set to public, otherwise the calendar will not add and display correctly. If a private calendar has been added, it must first be deleted, and then set to public, before it can be correctly added back.
