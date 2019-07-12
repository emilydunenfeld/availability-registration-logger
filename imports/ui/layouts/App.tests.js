import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// https://github.com/facebook/create-react-app/issues/3206
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<App />);
});