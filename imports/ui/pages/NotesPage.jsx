import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Media from 'react-media';
import { Button, Modal } from 'semantic-ui-react';
import Email from 'meteor/email';

/**
 * Creates the Notes page.
 * 
 * @returns render of the Notes Page
 */

export default class NotesPage extends Component {

	state = {
		textValue: "",
		successModal: false
	};

	constructor(props) {
		super(props);
	}
	sendEmail = () => {
		const params = {
			notesText: this.state.textValue
		};
		Meteor.call("User-data.methods.sendEmail", params);
		this.handleSuccess();
	}
	handleSuccess = () => {
	    this.setState({ successModal: true });
	    setTimeout(() => this.setState({ successModal: false }), 3000);
 	}

	updateInput = (ev) => {
        this.setState({ textValue: ev.target.value });
    }

	render() {
		var widthStyle = {   
	      	width: '80%',
	      	margin: 'auto',
	      	paddingTop: '100px'
	    };
	    var headerStyle = {
	    	textAlign: 'center',
	    	paddingBottom: '20px',
	    	width: '80%',
	      	margin: 'auto',
	      	paddingTop: '80px'
	    };
	    var boxStyle = {
	    	width: '60%',
	    	height: '450px',
	    	textAlignVertical: 'top',
	     	maxWidth: '800px',
	    	resize: 'none'
	    };
	    var mobBoxStyle = {
	    	width: '60%',
	    	height: '400px',
	    	textAlignVertical: 'top',
	    	resize: 'none',
	    	maxWidth: '500px'
	    }
	    var buttonStyle = {
	    	width: '60%',
	    	margin: 'auto',
	    	paddingTop: '20px',
	    	paddingBottom: '20px'

	    }
		if(Meteor.user())
			return(
				<Media query="(max-width: 600px)">
				{matches => matches ? (

					<div>
						<h1 style={headerStyle}>Feel free to take notes for your event below!</h1>
						<form style={{textAlign: 'center'}}>
							<textarea style={mobBoxStyle} placeholder="Enter Notes Here.." value={this.state.textValue} onChange={this.updateInput}/>
							<div style={buttonStyle}>
								<Button type='button' color='red' onClick={this.sendEmail} style={{float: 'right'}}>Email Notes to Me</Button>
							</div>
						</form>
						<Modal open={this.state.successModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
			              <Modal.Content>
			                <h3>Your notes have been sent!</h3>
			              </Modal.Content>
			            </Modal>

					</div>
				) : (
					<div>
						<h1 style={headerStyle}>Feel free to take notes for your event below!</h1>
						<form style={{textAlign: 'center'}}>
							<textarea style={boxStyle} placeholder="Enter Notes Here.." value={this.state.textValue} onChange={this.updateInput}/>
							<div style={buttonStyle}>
								<Button type='button' color='red' onClick={this.sendEmail} style={{float: 'right'}}>Email Notes to Me</Button>
							</div>
						</form>
						<Modal open={this.state.successModal} basic size='large' style={{ position: 'fixed', textAlign:'center'}}>
			              <Modal.Content>
			                <h3>Your notes have been sent!</h3>
			              </Modal.Content>
			            </Modal>

					</div>
				)
				}
				</Media>
			);
		else
			return (<div/>);
	}
}
NotesPage.propTypes = {
	user: PropTypes.any
}