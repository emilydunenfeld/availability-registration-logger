import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button, 
    Header, 
    Icon, 
    Modal, 
    Input,
    Message,
    Transition } from 'semantic-ui-react';

/**
 * Creates the Attendance Code Modal.
 * 
 * @returns a Modal for Attendance Code submission
 */

export default class AttendanceCodeModal extends Component {
    state = {
        modalOpen: false,
        value: "",
        loading: false,
        messageHidden: true
    };

    constructor(props) {
        super(props);
    }

    showWarning = () => {
        this.setState({ messageHidden: false });
        setTimeout(() => this.setState({ messageHidden: true }), 5000);
    }

    handleChange = (ev) => this.setState({ value: ev.target.value });
    handleOpen = () => this.setState({ modalOpen: true });
    handleEnter = () => {
        Meteor.call('Attendance.methods.insert',
            { eventId: this.props.event._id, attendanceCode: this.state.value },
            (err, res) => {
                this.setState({ loading: true });
                if (res) {
                    this.setState({ modalOpen: false });
                }
                else if (res == false) {
                    console.warn("Attedance called, couldn't insert");
                    this.showWarning();
                }
                else if (err) {
                    console.warn("Error in attendance insert");
                    this.showWarning();
                }
            });
    }
    handleCancel = () => this.setState({ modalOpen: false });

    render() {
        return (

            <Modal
                trigger={<Button onClick={this.handleOpen}>Attend Event</Button>}
                open={this.state.modalOpen}
                onClose={this.handleCancel}
                basic
                size='large'
                style={{ position: 'fixed', textAlign: 'center'}}
            >
                <Header content='Attendance Code'/>
                <Modal.Content>
                    <h3>Enter code for event "{this.props.event.summary}"</h3>
                    <Input
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder='Enter Code Here...'
                        maxLength='4'
                    />

                </Modal.Content>
                <Modal.Actions style={{textAlign: 'center'}}>
                    <Button color='grey' onClick={this.handleCancel} inverted>
                        Cancel
                    </Button>
                    <Button color='green' onClick={this.handleEnter} inverted>
                        Enter
                    </Button>
                </Modal.Actions>
                <Transition visible={!this.state.messageHidden} animation='scale' duration={500}>
                    <Message warning>
                        <Message.Header>Attendance Code Not Recognized</Message.Header>
                        <p>Please confirm that the attendance code is correct.</p>
                    </Message>
                </Transition>
            </Modal>

        )
    }
}

AttendanceCodeModal.props = {
    event: PropTypes.object,
};
