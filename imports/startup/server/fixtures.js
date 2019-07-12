import { Meteor } from 'meteor/meteor';
import Calendars from '../../api/calendars/calendars';
import CalendarsRep from '../../api/calendars/calendars';

Calendars.Calendars.upsert(
  {},
  {
    $set: {
      calendarId: "capstone.reg.log@gmail.com",
      calendarName: "Capstone",
      googleId: "100988381135456193052"
    	//googleId: "capstone.reg.log",
    }
  }
 );

Calendars.CalendarsRep.upsert(
  {},
  {
    $set: {
      calendarId: "capstone.reg.log@gmail.com",
      calendarName: "Capstone",
      googleId: "100988381135456193052"
    	//googleId: "capstone.reg.log",
    }
  }
 );