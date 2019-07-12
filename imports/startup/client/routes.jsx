import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer';
import NewsfeedPageContainer from '../../ui/containers/NewsfeedPageContainer';
import CalPageContainer from '../../ui/containers/CalPageContainer';
import SettingsPageContainer from '../../ui/containers/SettingsPageContainer';
import RegisterPageContainer from '../../ui/containers/RegisterPageContainer';
import LandingLoginContainer from '../../ui/containers/LandingLoginContainer';
import NotesPageContainer from '../../ui/containers/NotesPageContainer';
import AboutPageContainer from '../../ui/containers/AboutPageContainer';

export const renderRoutes = () => (
    <Router history={ browserHistory }>
    	<Redirect from="/" to="/home"/>
        <Route exact path="/" component={ AppContainer }>
        	<Route path="home" component={ LandingLoginContainer } />
	        <Route path="calendar" component={ CalPageContainer } />
            <Route path="eventfeed" component={ NewsfeedPageContainer } />
            <Route path="settings" component={ SettingsPageContainer } />
            <Route path="register" component={ RegisterPageContainer } />
            <Route path="notes" component={ NotesPageContainer } />
            <Route path="about" component={ AboutPageContainer } />
        </Route>

    </Router>
);
