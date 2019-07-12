import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Item, Dropdown } from 'semantic-ui-react';
import Media from 'react-media';

/**
 * Creates the Calendar page.
 * 
 * @returns render of the Calendar page
 */

export default class CalPage extends Component {
    state = {
        inputValue: "capstone.reg.log",
        embedUrl: "https://calendar.google.com/calendar/embed?src=",
        embedUrl2: "@gmail.com&ctz=America%2FNew_York",
        agendaUrl: "https://calendar.google.com/calendar/embed?mode=AGENDA&src="
    }

    constructor(props) {
        super(props);
    }

    updateInput = (ev, data) => { 
        this.setState({ inputValue: data.value })
    }; 

    render() {
        if (!Meteor.user())
            return(<div/>);
        var widthStyle = {
            width: '80%',
            margin: '0 auto',
            paddingTop: '50px',
            paddingBottom: '10px'
        };
        // This style is used for mobile users
        var mobStyle = {
        	border: 0,
        	width: 300,
        	height: 600,
        	frameborder: 0,
        	scrolling: "no",
            paddingLeft: '50px'
        };
        // this style is used for desktop users
        var calStyle = {
            border: 0,
            width:800,
            height:600,
            frameborder: 0,
            scrolling: "no",
            marginLeft: '100px'
        };
    	var URL = this.state.embedUrl + this.state.inputValue + this.state.embedUrl2; 
        var mobURL = this.state.agendaUrl + this.state.inputValue + this.state.embedUrl2;

        // create a local array that contains the calendars attached to theprops
        var arr = [];
        for (var i = 0; i < this.props.calendarsRep.length; i++) {
            var text = {
                key: this.props.calendarsRep[i]._id, value:this.props.calendarsRep[i].calendarId.split('@')[0], text:this.props.calendarsRep[i].calendarName
            };
            arr.push(text);
        }

        // We set the default value of the dropdown to the first entry in the calendarsRep array.
        // This is generally the Capstone Calendar
        //var firstElement = this.props.calendarsRep[0].calendarId.split('@')[0];
        
        return (
            <div>
            	<Media query="(max-width: 600px)">
            		{matches => matches ? (
            			<div>
            				<div style = {widthStyle}>
            					<Dropdown placeholder='Select a Calendar..' selection options={arr} onChange={this.updateInput}/>
            				</div>
            				<iframe src={mobURL} style={mobStyle}/>

            			</div>
            		) : (
            			<div style={{paddingLeft: '100px'}}>
	    					<div style={widthStyle}>
	            				<Dropdown placeholder='Select a Calendar..' selection options={arr}  onChange={this.updateInput}/>
	        				</div>
	        				<iframe src={URL} style={calStyle}/>
        				</div>
            		)
            		}
        		</Media>
                
            </div>
        )
    }
}

CalPage.propTypes = {
    loading: PropTypes.bool,
    calendarsRep: PropTypes.array
};
