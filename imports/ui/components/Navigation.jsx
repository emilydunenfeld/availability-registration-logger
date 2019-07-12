import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Menu, Icon, Button, Divider } from 'semantic-ui-react';
import { IndexLink, Link } from 'react-router';

/**
 * Creates the Container for the Navigation element.
 * 
 * @returns a user for the Navigation element
 * @returns a {bool} for whether the user is an admin
*/

export class Navigation extends Component {
  state = { visible: false }

  constructor(props) {
    super(props);
  }

  openGit = () => window.open('https://github.com/SCCapstone/availability-registration-logger', '_blank')

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
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

  googleLogout() {
    Meteor.logout((err) => {
      if (err) {
        console.warn("Google Logout error: ", err);
      }
    });
  }

  getAddr = () => {
    if (window.location.href === 'http://localhost:3000/' ||
        window.location.href === 'https://localhost:3000/' ||
        window.location.href === 'http://registration-logger.appspot.com/' ||
        window.location.href === 'https://registration-logger.appspot.com/'
       ) {

       return '/eventfeed';
    } else {
      return ('/' + window.location.href.split('/')[3]);
    }
  }

  getName() {
    if (this.props.user.services && this.props.user.services.google) {
      return this.props.user.services.google.name
        || this.props.user.services.google.email.split('@')[0];
    }
    else {
      return this.props.user.name;
    }
  }

  getLoginLogout() {
    if (this.props.user) {

      if (this.props.userIsAdmin) {
        return (
          <div>
          <Menu.Menu text="true" position="right">
            <Menu.Item header>ADMIN</Menu.Item>
            <Menu.Item header>{this.getName()}</Menu.Item>
          </Menu.Menu>
          <Menu.Item as={Link} name='logout' onClick={this.googleLogout} />
          <Menu.Item as={Link} to='/settings' name='settings' active={this.state.activeItem === 'settings'} onClick={this.handleItemClick}>
          	<Icon name="cogs" />
          	Settings
          </Menu.Item>
          </div>
        );
      }

      return (
        <div>
        <Menu.Menu text="true" position="right">
          <Menu.Item header>{this.getName()}</Menu.Item>
        </Menu.Menu>
        <Menu.Item as={Link} name='logout' onClick={this.googleLogout} />
        </div>
      );
    }
    else {
      return (
        <Menu.Menu position="right">
          <Menu.Item onClick={this.googleLogon} as={Link} to={this.getAddr()}>
            <Icon name="user" />
            Login
          </Menu.Item>
        </Menu.Menu>
      );
    }
  }

  render() {
    const { activeItem } = this.state
    
    if (this.props.user) {
      var widthStyle = {   
        width: '100%',
        margin: '0 auto'
      };
      return (
        <div>
            {this.getLoginLogout()}

            <Divider horizontal></Divider>

            <Menu.Item as={Link} to='/eventfeed' name='event feed' active={activeItem === 'eventfeed'} onClick={this.handleItemClick}>
            	<Icon name="newspaper"/>
            	Event Feed
            </Menu.Item>
            <Menu.Item as={Link} to='/calendar' name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick}>
            	<Icon name="calendar"/>
            	Calendar
            </Menu.Item>
            <Menu.Item as={Link} to='/notes' name='notes' active={activeItem === 'notes'} onClick={this.handleItemClick}>
              <Icon name="list ul"/>
              Take Notes
            </Menu.Item> 
            <Menu.Item name='github' active={activeItem === 'github'} onClick={this.openGit}>
              <Icon name="github"/>
              GitHub
            </Menu.Item>            
            <Menu.Item as={Link} to='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
              <Icon name="info circle"/>
              About
            </Menu.Item>
        </div>
      )
    }
    else
      return null;
  }
}

Navigation.propTypes = {
  user: PropTypes.any,
  userIsAdmin: PropTypes.bool
};
