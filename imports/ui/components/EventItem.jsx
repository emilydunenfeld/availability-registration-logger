import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Item, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import Media from 'react-media';

import AttendanceCodeModal from './AttendanceCodeModal';

/**
 * Creates an Event Item.
 * 
 * @returns an Event Item
 */

export class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    openInTab = () => window.open(this.props.event.htmlLink, '_blank')

    exportThisEvent = () => {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            const ev = {
                eventId: this.props.event._id
            };

            Meteor.call('Attendance.methods.exportToGoogleSheet', ev);
            window.open("https://docs.google.com/spreadsheets/d/1b57ojZdDdYmrqkRrqAS60aXByJuferL_rnGhUNj0tCo/edit?usp=sharing", '_blank');
        }
    }

    attendThisEvent = () => {
        const ev = {
            eventId: this.props.event._id
        };

        Meteor.call('Attendance.methods.insert', ev);
    }

    generateCode = () => {
        const params = {
            eventId: this.props.event._id
        };

        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            Meteor.call('AttendanceCodes.methods.generateByEventId', params);
        } else {
            console.warn("User is not an admin, cannot generate code");
        }
    }

    getItemButton() {
        const end = this.props.event.end;
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return (
                <Button onClick={this.exportThisEvent}>Export Attendance</Button>
            );
        } else {
            if (this.props.event.isUserAttended) {
                return (
                    <Button disabled={true} color='green'>
                        <Icon name='check' />
                        Attended
                    </Button>
                );
            } else {
                let mmtEnd;
                if(end.dateTime){
                    mmtEnd=moment(end.dateTime);
                    mmtEnd.add(1, 'days');
                } else if (end.date){
                    mmtEnd=moment(end.date);
                    mmtEnd.add(1, 'days');
                }
                if (moment().diff(mmtEnd, 'seconds', true) < 0){
                    return <AttendanceCodeModal event={this.props.event}/>;
                
                } else {
                    return <Button disabled={true} color='grey'>This event is no longer available</Button>;
                }
            }
        }
    }

    getItemLabel() {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            if (!this.props.attendanceCode) {
                return <Button onClick={this.generateCode} primary>Generate Code</Button>
            } else {
                return <Button disabled={true} primary>{this.props.attendanceCode.toUpperCase()}</Button>
            }
        } else {
            return;
        }
    }

    getEventTimes() {
        const start = this.props.event.start;
        const end = this.props.event.end;

        let mmtStart, mmtEnd;
        if (start.dateTime && end.dateTime) {
            mmtStart = moment(start.dateTime);
            mmtEnd = moment(end.dateTime);

            let stStart = mmtStart.format('ddd M/D/YY h:mm a');
            let stEnd;
            if (mmtStart.month() === mmtEnd.month() && mmtStart.date() === mmtEnd.date()) {
                stEnd = mmtEnd.format('h:mm a');
            } else {
                stEnd = mmtEnd.format('ddd M/D/YY h:mm a');
            }

            return (
                <Item.Meta>
                { stStart } - { stEnd } 
                </Item.Meta>
            );
        } else if (start.date && end.date) {
            mmtStart = moment(start.date);
            mmtEnd = moment(end.date);

            let stStart = mmtStart.format('ddd M/D/YY');
            let stEnd;
            if (mmtStart.month() !== mmtEnd.month() || mmtEnd.date() - mmtStart.date() > 1) {
                // adjust for 1 day offset in google's end date
                mmtEnd = mmtEnd.subtract(1, 'days');
                stEnd = ' - ' + mmtEnd.format('ddd M/D/YY');
            } 

            return (
                <Item.Meta>
                { stStart }{ stEnd } 
                </Item.Meta>
            );
        } else {

        }  
    }

    render() {
        // cut off description that is too long
        let description = this.props.event.description || "";
        description = description.length > 150
            ? description.substr(0, description.indexOf(" ", 150)) + " . . ."
            : description;

        return (
            <Media query="(max-width: 600px)">
            {matches => matches ? (
            <Item style={{paddingLeft: '20px'}}>
                <Item.Content>
                    <Item.Header as='a' onClick={this.openInTab}>{this.props.event.summary}</Item.Header>

                    { this.getEventTimes() }
                    { this.props.event.location ? <Item.Meta>{this.props.event.location}</Item.Meta> : null }
                    
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <Icon name='users' /> {this.props.event.calendarName} <br/>
                        { this.getItemButton() }
                        { this.getItemLabel() }
                    </Item.Extra>
                </Item.Content>
            </Item>
            ) : (
            <Item style={{paddingLeft: '20px'}}>
                <Item.Content>
                    <Item.Header as='a' onClick={this.openInTab}>{this.props.event.summary}</Item.Header>

                    { this.getEventTimes() }
                    { this.props.event.location ? <Item.Meta>{this.props.event.location}</Item.Meta> : null }
                    
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <Icon name='users' /> {this.props.event.calendarName}
                        <div style={{float: "right", paddingRight: '20px'}}>
                        { this.getItemButton() }
                        { this.getItemLabel() }
                        </div>
                    </Item.Extra>
                </Item.Content>
            </Item>
            )
            }
            </Media>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
    attendanceCode: PropTypes.string,
}
