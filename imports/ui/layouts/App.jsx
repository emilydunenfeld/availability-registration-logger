import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Sidebar, Button, Menu, Icon } from 'semantic-ui-react';
import Media from 'react-media';
import { Meteor } from 'meteor/meteor';

import NavigationContainer from '../containers/NavigationContainer';
import LandingLoginContainer from '../containers/LandingLoginContainer';

/**
 * Creates the layout of the entire App.
 * 
 * @returns render of the layout of the App
*/

export default class App extends React.Component {
  state = {
    visible: false
  };

  constructor(props) {
    super(props);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    if (Meteor.user()) {
      return (
        <div>
          <Media query="(max-width: 600px)">
            {matches => matches ? (
              <div style={{height: '100%'}}>
                <Menu fixed="top" style={{height: "40px"}}>
                  <Button icon onClick={this.toggleVisibility} style={{"backgroundColor": "transparent"}}>
                    <Icon name='sidebar' />
                  </Button>
                </Menu>
                <Sidebar as={Menu} fixed="left" animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted className="login-sidebar">
                  <NavigationContainer />
                </Sidebar>
                <Sidebar.Pusher>      
                  { this.props.children }
                </Sidebar.Pusher>           
             </div>
             ) : (
             <div>
               <Sidebar as={Menu} animation='overlay' width='thin' visible icon='labeled' vertical inverted style={{paddingTop: '20px'}}>
                 <NavigationContainer />
                  </Sidebar>
                  <Sidebar.Pusher>
                    <Segment basic>
                      { this.props.children }
                    </Segment>
                  </Sidebar.Pusher>
                </div>
            )
            }
          </Media>        
        </div>
      );
    } else {
      return (
        <LandingLoginContainer />
      );
    }
  }
}

App.propTypes = { }
