import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import Media from 'react-media';

/**
 * Creates the Landing page.
 * 
 * @returns render of the Landing page
 */

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }  
  googleLogon() {
    Meteor.loginWithGoogle({
      requestPermissions: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
      ],
      //forceApprovalPrompt: true,
      prompt: "select_account",
      requestOfflineToken: true
    });
  }
  //returns the address to direct the user to upon successful login
  getAddr = () => {
    if (this.testOnHomePage()) {
       return '/eventfeed';
    } else {
      return ('/' + window.location.href.split('/')[3]);
    }
  }
  //find out if the current page is the home page
  testOnHomePage = () => {
    if (window.location.href === 'http://localhost:3000/home' ||
        window.location.href === 'https://localhost:3000/home' ||
        window.location.href === 'http://registration-logger.appspot.com/home' ||
        window.location.href === 'https://registration-logger.appspot.com/home')
      return (true);
    else
      return (false);
  }
  render() {
    var widthStyle = {   
      width: '50%',
      margin: 'auto',
      paddingTop: '100px',
      paddingBottom: '50px'
    };
    var mobStyle = {   
      width: '70%',
      margin: 'auto',
      paddingTop: '50px',
      paddingBottom: '50px'
    };
    var videoStyle = {
      position: 'relative',
      overflow: 'hidden',
      frameborder: 0,
      scrolling: "no",
      marginLeft: '100px',
      allow: 'encrypted-media',
      paddingBottom: '50px'
    };

    if (Meteor.user())
      return(
        <Media query="(max-width: 600px)">
          {matches => matches ? (
          <div style={{textAlign: 'center'}}>
            <div style={mobStyle}>
              <h1>Welcome to the Registration-Logger!</h1>
              <h3 style={{color: 'grey'}}>Please check out the Event Feed and Calendar for news and information regarding available events</h3>
            </div>
            <div style={{videoStyle}}>
                <iframe width='100%' height='265px' src="https://www.youtube.com/embed/AOxHRDdhbpk" allowFullScreen></iframe>
            </div>
          </div>
          ) : (
          <div style={{textAlign: 'center'}}>
            <div style={widthStyle}>
              <h1>Welcome to the Registration-Logger!</h1>
              <h3 style={{color: 'grey'}}>Please check out the Event Feed and Calendar for news and information regarding available events</h3>
            </div>
            <div style={{videoStyle}}>
                <iframe width='560px' height='315px' src="https://www.youtube.com/embed/AOxHRDdhbpk" allowFullScreen></iframe>
            </div>
          </div>
          )
          }
        </Media>
      );
    else
      return(
        <Media query="(max-width: 600px)">
          {matches => matches ? (
          <div style={{textAlign: 'center'}}>
            <div style={mobStyle}>
              <h1>Welcome to the Registration-Logger!</h1>
              <Button color='black' size='large' onClick={this.googleLogon} as={Link} to={this.getAddr()}>Login with Google to Continue</Button>
            </div>
            <div style={{videoStyle}}>
                <iframe width='100%' height='265px' src="https://www.youtube.com/embed/AOxHRDdhbpk" allowFullScreen></iframe>
            </div>
          </div>
          ) : (
          <div style={{textAlign: 'center'}}>
            <div style={widthStyle}>
              <h1>Welcome to the Registration-Logger!</h1>
              <Button color='black' size='large' onClick={this.googleLogon} as={Link} to={this.getAddr()}>Login with Google to Continue</Button>
              
            </div>
            <div style={{videoStyle}}>
                <iframe width='560px' height='315px' src="https://www.youtube.com/embed/AOxHRDdhbpk" allowFullScreen></iframe>
            </div>
          </div>
        
          )
          }
        </Media>
      );
  }
}

LandingPage.propTypes = {
  user: PropTypes.any
};
