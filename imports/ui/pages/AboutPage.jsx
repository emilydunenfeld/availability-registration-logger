import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Media from 'react-media';
import Gallery from 'react-photo-gallery';
import { Icon } from 'semantic-ui-react';

/**
 * Creates the About page.
 * 
 * @returns render of the About page
 */

export default class AboutPage extends Component {
	constructor(props) {
		super(props);
	}

	openGit = () => window.open('https://github.com/SCCapstone/availability-registration-logger', '_blank')
	
	openGitUserDrew = () => window.open('https://github.com/drewcampbell12', '_blank')
	
	openGitUserStephen = () => window.open('https://github.com/hendstephen', '_blank')
	
	openGitUserStewart = () => window.open('https://github.com/stewschrieff', '_blank')

	openGitUserEmily = () => window.open('https://github.com/emilyrose789', '_blank')

	openGitUserSydney = () => window.open('https://github.com/salarson94', '_blank')
	
	render() {
		var PHOTO_SET = [
			{
				src: "https://farm1.staticflickr.com/788/40938401654_aaaf2ac86f.jpg",
				width: 285,
				height: 500,
				alt: 'Home Page',
			},
			{
				src: "https://farm1.staticflickr.com/876/41609624492_cbcca41a61.jpg",
				width: 285,
				height: 500,
				alt: 'Navigation Bar User View',
			},
			{
				src: "https://farm1.staticflickr.com/876/41609624592_f7fd98f020.jpg",
				width: 285,
				height: 500,
				alt: "Event Feed User View",			},
			{
				src: "https://farm1.staticflickr.com/941/27780653808_64c2014244.jpg",
				width: 285,
				height: 500,
				alt: "Attend Event Code Required",
			},
			{
				src: "https://farm1.staticflickr.com/796/40938401854_5d00bbc96a.jpg",
				width: 285,
				height: 500,
				alt: "Event Feed Search By Title",
			},
			{
				src: "https://farm1.staticflickr.com/808/41609624682_6f85036e85.jpg",
				width: 285,
				height: 500,
				alt: "Capstone Calendar Agenda View",
			},
			{
				src: "https://farm1.staticflickr.com/878/40938401914_4d1f01f89b.jpg",
				width: 285,
				height: 500,
				alt: "Drew Calendar Agenda View",
			},
			{
				src: "https://farm1.staticflickr.com/793/41609624772_5f09c497e0.jpg",
				width: 285,
				height: 500,
				alt: "Take Notes",
			},
			{
				src: "https://farm1.staticflickr.com/801/27780653978_e2164478c0.jpg",
				width: 285,
				height: 500,
				alt: "Register Page",
			},
			{
				src: "https://farm1.staticflickr.com/790/27780653318_ff14be2274.jpg",
				width: 285,
				height: 500,
				alt: "Navigation Bar Admin View",
			},
			{
				src: "https://farm1.staticflickr.com/835/27780653568_8f95223ecf.jpg",
				width: 285,
				height: 500,
				alt: "Event Feed Admin View",
			},
			{
				src: "https://farm1.staticflickr.com/887/40938401734_daab2126f5.jpg",
				width: 285,
				height: 500,
				alt: "Settings Admin View",
			}
		]
		return(
			<Media query="(max-width:600px)">
			{matches => matches ? (
				<div style={{width:'80%', margin: 'auto', paddingBottom: '20px'}}>
					<div style={{paddingTop: '50px', textAlign: 'center'}}>
						<h1>About This App</h1>
					</div>
					<div style={{paddingTop: '20px', textAlign: 'left'}}>
						Availability Registration Logger is a project that aims to make use of Google APIs, Google Apps, and Google Accounts to allow organizations that regularly host events to automatically track event attendance. By adding their calendars and events to our site, they can easily have attendees login and attend the event through our web app by providing them a 4-character attendance code, and then export that event's attendance to a Google Sheet.
					</div>
					<div style={{paddingTop: '20px', textAlign: 'center'}}>
						<h1>Mobile Images</h1>
					</div>
					<div>
						<Gallery photos={PHOTO_SET}/>
					</div>
					<div style={{paddingTop: '50px', paddingBottom: '20px', textAlign: 'center'}}>
						<h1>Meet the Developers!</h1>
					</div>
					<div onClick={this.openGitUserDrew}><strong>Drew Campbell</strong>&emsp;Drew's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserStephen}><strong>Stephen Henderson</strong>&emsp;Stephen's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserStewart}><strong>Stewart Schrieffer</strong>&emsp;Stewart's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserEmily}><strong>Emily Dunenfeld</strong>&emsp;Emily's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserSydney}><strong>Sydney Larson</strong>&emsp;Sydney's GitHub<Icon name='github'/></div>
				</div>
			) : (
				<div style={{width: '60%', margin: 'auto', paddingBottom:'20px'}}>
					<div style={{paddingTop: '50px', textAlign: 'center'}}>
						<h1>About This App</h1>
					</div>
					<div style={{paddingTop: '20px', textAlign: 'left'}}>
						Availability Registration Logger is a project that aims to make use of Google APIs, Google Apps, and Google Accounts to allow people and companies that regularly host events to automatically track event attendance. By adding their calendars and events to our site, they can easily have attendees login and attend the event through our web app by providing them a 4-character attendance code, and then export that event's attendance to a Google Sheet.
					</div>
					<div style={{paddingTop: '20px', textAlign: 'center'}}>
						<h1>Mobile Images</h1>
					</div>
					<div>
						<Gallery photos={PHOTO_SET} onClickPhoto={this.openLightbox}/>
					</div>

					<div style={{paddingTop: '50px', paddingBottom: '20px', textAlign: 'center'}}>
						<h1>Meet the Developers!</h1>
					</div>
					<div onClick={this.openGitUserDrew}><strong>Drew Campbell</strong>&emsp;Drew's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserStephen}><strong>Stephen Henderson</strong>&emsp;Stephen's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserStewart}><strong>Stewart Schrieffer</strong>&emsp;Stewart's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserEmily}><strong>Emily Dunenfeld</strong>&emsp;Emily's GitHub<Icon name='github'/></div>
					<div onClick={this.openGitUserSydney}><strong>Sydney Larson</strong>&emsp;Sydney's GitHub<Icon name='github'/></div>
				</div>
			)
			}
			</Media>
		);
	}

}