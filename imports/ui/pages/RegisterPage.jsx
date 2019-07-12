import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { 
  Input,
  Menu,
  Icon, 
  Button, 
  Header, 
  Modal} from 'semantic-ui-react';
import { Link } from 'react-router';
import Media from 'react-media';

import EventItem from '../components/EventItem';

/**
 * Creates the Register page.
 * 
 * @returns render of the Register page
 */

export default class RegisterPage extends Component {
  state = {
    inputValue: "",
    successModal: false,
    failureModal: false,
    retryModal: false
  };

  constructor(props) {
    super(props);
  }

  updateInput = (ev, data) => { 
    this.setState({ inputValue: data.value }) 
  };

  //Modals render for 5000ms and then turn off
  handleSuccess = () => {
    this.setState({ successModal: true });
    setTimeout(() => this.setState({ successModal: false }), 5000);
  }
  handleFailure = () => {
    this.setState({ failureModal: true });
    setTimeout(() => this.setState({ failureModal: false }), 5000);
  }
  handleRetry = () => {
    this.setState({ retryModal: true });
    setTimeout(() => this.setState({ retryModal: false }), 4000);
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  submitAttendance = () => {
    if(this.props.user){
      Meteor.call("AttendanceCodes.methods.getEventIdByAttendanceCode", { attendanceCode: this.state.inputValue }, (err, res) => {
        if (res) {
          const params = {
            eventId: res,
            attendanceCode: this.state.inputValue
          };
          Meteor.call("Attendance.methods.insert", params, (err, res) => {
            if (res) {
              this.setState({ inputValue: "" });
              this.handleSuccess();
            } else {
              this.setState({ inputValue: "" });
              this.handleRetry();
            }
          });
        } else {
          this.setState({ inputValue: "" });
          this.handleFailure();
        }
      });
    } else {
      this.setState({ inputValue: "" });
      this.handleFailure();
    }    
  };

  render() {
    var widthStyle = {
            width: '80%',
            margin: '0 auto',
            paddingTop: '100px'
        };
    return (
      <Media query="(max-width: 600px)">
        {matches => matches ? (
          <div style={widthStyle}>
            
            <h3>Please login with Google and then enter the 4-digit attendance code for an event</h3>

            <Input type='text' className='event-code-input' action>
              <Input onChange={this.updateInput} placeholder='Enter Attendance Code'/>
              <Button type='submit' onClick={this.submitAttendance} style={{paddingLeft:'20px'}}>Submit Attendance</Button>
            </Input>
            <Modal open={this.state.successModal} basic size='large' style={{ position: 'fixed', textAlign: 'center'}}>
              <Header content='Successful Registration!'/>
              <Modal.Content>
                <h3>You are now attending this event.</h3>
              </Modal.Content>
            </Modal>
            <Modal open={this.state.failureModal} basic size='large' style={{ position: 'fixed', textAlign: 'center'}}>
              <Header content='Failed Registration!'/>
              <Modal.Content>
                <h3>Please ensure you are logged in with Google and have entered the correct attendance code and retry!</h3>
              </Modal.Content>
            </Modal>
            <Modal open={this.state.retryModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
              <Header content='Already in Attendance'/>
              <Modal.Content>
                <h3>You are already registered for this event.</h3>
              </Modal.Content>
            </Modal>
            
          </div>
        ) : (
          <div style={{paddingLeft: '200px', width: '80%'}}>
          <h1/>
          <h3>Please login with Google and then enter the 4-digit attendance code for an event</h3>

          <Input type='text' className='event-code-input' action style={{paddingLeft: '20px', paddingTop: '20px'}}>
            <Input onChange={this.updateInput} placeholder='Enter Attendance Code'/>
            <Button type='submit' onClick={this.submitAttendance}>Submit Attendance</Button>
          </Input>
          <Modal open={this.state.successModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
            <Header content='Successful Registration!'/>
            <Modal.Content>
              <h3>You are now attending this event.</h3>
            </Modal.Content>
          </Modal>
          <Modal open={this.state.failureModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
            <Header content='Failed Registration!'/>
            <Modal.Content>
              <h3>Please ensure you are logged in with Google and have entered the correct attendance code and retry!</h3>
            </Modal.Content>
          </Modal>
          <Modal open={this.state.retryModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
            <Header content='Already in Attendance'/>
            <Modal.Content>
              <h3>You are already registered for this event.</h3>
            </Modal.Content>
          </Modal>
          
        </div>
        )
        }
      </Media>
    );
  }
}

RegisterPage.propTypes = {  
  user: PropTypes.any,
  userIsAdmin: PropTypes.bool
};
