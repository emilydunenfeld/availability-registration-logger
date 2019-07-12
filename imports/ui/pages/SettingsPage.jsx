import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { List, Input, Select, Button } from 'semantic-ui-react';
import Media from 'react-media';

/**
 * Creates the Settings page.
 * 
 * @returns render of the Settings page
 */

export default class SettingsPage extends Component {
    state = {
        idValue: "",
        nameValue: "",
    };
    
    constructor(props) {
        super(props);
    }

    updateId = (ev, data) => { this.setState({ idValue: data.value }) };
    updateName = (ev, data) => { this.setState({ nameValue: data.value }) };

    addCalendar = () => {
        const params = {
            calendarId: this.state.idValue,
            calendarName: this.state.nameValue
        };

        if (!this.state.nameValue) {
            console.warn("No calendar name specified");
            return false;
        }

        const component = this;
        Meteor.call("Calendars.methods.insert", params, (err, res) => {
            if (err) {
                console.warn(err);
            } else {
                if (res) {
                    component.setState({ idValue: "" });
                    component.setState({ nameValue: "" });
                } else {
                    console.warn("fail add calendar");
                }
            }
        });
    };

    deleteCalendar = (cal) => {
        const params = {
            calendarId: cal.calendarId
        };

        Meteor.call("Calendars.methods.delete", params, (err, res) => {
            if (err) {
                console.warn(err);
            } else {
                if (res) {
                    console.warn("success delete calendar");
                } else {
                    console.warn("fail delete calendar");
                }
            }
        });
    };

    render() {
        var mobStyle = {
            width: '80%',
            margin: '0 auto',
            paddingTop: '100px'
        };
        var deskStyle = {
            width: '80%',
            margin: '0 auto',
            paddingLeft: '70px',
            paddingTop: '50px'
        };
        
        if(Meteor.user() && !this.props.userIsAdmin)
            return(
                <div style={mobStyle}>
                    
                    <h3>Must be an administrator to view this page</h3>
                </div>
            );

        else if(Meteor.user() && this.props.userIsAdmin)
            return (
                <Media query="(max-width: 600px)">
                {matches => matches ? (
                    <div style={mobStyle}>
                    <h3>Enter the Google Calendar ID of the calendar you wish to add</h3>
                    <Input type='text' className='calendar-input' action style={{paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px'}}>
                        <Input onChange={this.updateId} placeholder='Calendar ID...'/>
                    </Input>
                    <Input type='text' className='calendar-name-input' action style={{paddingLeft: '20px', paddingTop: '10px', paddingBottom: '20px', paddingRight: '20px'}}>
                        <Input onChange={this.updateName} placeholder='Calendar Name...'/>
                    </Input>
                    <Button type='submit' onClick={this.addCalendar}>Add</Button>

                    <List divided relaxed size='large'>
                        { this.props.calendars.map((cal) => (
                        <List.Item style={{paddingLeft: '20px', paddingTop: '10px'}}>
                            <List.Icon name='calendar outline' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>{cal.calendarId}</List.Header>
                                <List.Description as='a' style={{color: 'red'}} onClick={this.deleteCalendar.bind(this, cal)}>Delete</List.Description>
                            </List.Content>
                        </List.Item> 
                        ))}
                    </List>

                    </div>
                ) : (
                    <div style={deskStyle}>
                    <h3>Enter the Google Calendar ID of the calendar you wish to add</h3>
                    <Input type='text' className='calendar-input' action style={{paddingLeft: '20px', paddingTop: '10px'}}>
                        <Input onChange={this.updateId} placeholder='Calendar ID...'/>
                        <Input onChange={this.updateName} placeholder='Calendar Name...'/>
                        <Button type='submit' onClick={this.addCalendar}>Add</Button>
                    </Input>

                    <List divided relaxed size='large'>
                        { this.props.calendars.map((cal) => (
                        <List.Item style={{paddingLeft: '20px', paddingTop: '10px'}}>
                            <List.Icon name='calendar outline' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>{cal.calendarId}</List.Header>
                                <List.Description as='a' style={{color: 'red'}} onClick={this.deleteCalendar.bind(this, cal)}>Delete</List.Description>
                            </List.Content>
                        </List.Item> 
                        ))}
                    </List>

                    </div>
                )
                }
                </Media>
            );
        else
            return(<div/>);
    }
}

SettingsPage.propTypes = {
    loading: PropTypes.bool,
    calendars: PropTypes.array,
    userIsAdmin: PropTypes.bool
};