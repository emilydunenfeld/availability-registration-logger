import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Item, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import Media from 'react-media';

import EventItemContainer from '../containers/EventItemContainer';

/**
 * Creates the Event Feed page.
 * 
 * @returns render of the Event Feed page
 */

export default class NewsfeedPage extends Component {
    state = {
        hidePast: false,
        showOnlyAttended: false,
        searchTitle: "",
    };

    constructor(props) {
        super(props);
    }

    onHidePastToggle = (ev, data) => this.setState({ hidePast: data.checked })
    onFilterAttendanceToggle = (ev, data) => this.setState({ showOnlyAttended: data.checked })    	
    
    updateInput = (ev, data) => {
        this.setState({ searchTitle: data.value })
    }

    renderEvents() {
        if (!Meteor.user())
            return;

        if (this.props.loading) {
            return (
                <div className="mainBody">
                    <span>Loading...</span>
                </div>
            );
        }

        //-- sort events --// 
        this.props.events.sort((a, b) => {
            const dtA = a.start;
            const dtB = b.start;

            let mmtA, mmtB;
            if (dtA.date) {
                mmtA = moment(dtA.date);
            } else {
                mmtA = moment(dtA.dateTime);
            }

            if (dtB.date) {
                mmtB = moment(dtB.date);
            } else {
                mmtB = moment(dtB.dateTime);
            }

            if (mmtA.isSame(mmtB)) {
                return 0;
            } else if (mmtA.isBefore(mmtB)) {
                return -1;
            } else {
                return 1;
            }
        }).reverse();

        //-- filter events --//
        let eventsFiltered = this.props.events;
        if (this.state.hidePast) {
           eventsFiltered = eventsFiltered.filter((ev) => {
                const start = ev.start;

                let mmtStart;
                if (start.date) {
                    mmtStart = moment(start.date);
                } else {
                    mmtStart = moment(start.dateTime);
                }

                return moment().isBefore(mmtStart);
                // this prevents bug where events aren't marked as past even though the time is past the event start time
                //return moment().startOf('day').isBefore(mmtStart);
           });
        }

        if (this.state.showPast) {
           eventsFiltered = eventsFiltered.filter((ev) => {
                const start = ev.start;

                let mmtStart;
                if (start.date) {
                    mmtStart = moment(start.date);
                } else {
                    mmtStart = moment(start.dateTime);
                }

                return moment().startOf('day').isAfter(mmtStart);
           });
        }

        if (this.state.showOnlyAttended) {
            eventsFiltered = eventsFiltered.filter((ev) => ev.isUserAttended);
        }

        if (this.state.searchTitle != "") {
            eventsFiltered = eventsFiltered.filter((ev) => ev.summary.toLowerCase().includes(this.state.searchTitle.toLowerCase()));
        }
        var widthStyle = {
            width: '80%',
            margin: '0 auto'
        };

        return (
            <div style={widthStyle}>
            <Media query="(max-width: 600px)">
                {matches => matches ? (
                    <div>
                     <Input type='text' className='search-title-input' action style={{paddingLeft: '20px', paddingTop: '50px', width: '100%'}}>
                        <Input onChange={this.updateInput} placeholder='Search by Title'/>
                     </Input>
                     <br/>
                     <Checkbox toggle
                        onChange={this.onHidePastToggle}
                        label="Hide past events"
                        style={{paddingLeft: '20px', paddingTop: '10px'}}
                     />
                     <br/>
                     { !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                     <Checkbox toggle
                        onChange={this.onFilterAttendanceToggle}
                        label="Show only attended events"
                        style={{paddingLeft: '20px', paddingTop: '10px'}}
                     />) : null }
                    <Item.Group divided relaxed>
                        { eventsFiltered.map((ev) => {
                            return (
                                <EventItemContainer event={ev} />
                            );
                        }) }
                        <br />
                    </Item.Group>
                    </div>
                ) : (
                    <div style={{paddingLeft: '100px'}}>
                     <Input type='text' className='search-title-input' action style={{paddingLeft: '20px', paddingTop: '10px'}}>
                        <Input onChange={this.updateInput} placeholder='Search by Title' style={{ width: '400px'}}/>
                     </Input>
                     
                     <div style={{ float: 'right'}}>
                     <Checkbox toggle
                        onChange={this.onHidePastToggle}
                        label="Hide past events"
                        style={{paddingLeft: '20px', paddingTop: '10px'}}
                     />
                     <br/>
                     { !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                     <Checkbox toggle
                        onChange={this.onFilterAttendanceToggle}
                        label="Show only attended events"
                        style={{paddingLeft: '20px', paddingTop: '10px'}}
                     />) : null }
                     </div>
                    <Item.Group divided relaxed>
                        { eventsFiltered.map((ev) => {
                            return (
                                <EventItemContainer event={ev} />
                            );
                        }) }
                        <br />
                    </Item.Group>
                    </div>
                )
                }
            </Media>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderEvents() }
            </div>
        );
    }
}

NewsfeedPage.propTypes = {
    loading: PropTypes.bool,
    events: PropTypes.array,
};
