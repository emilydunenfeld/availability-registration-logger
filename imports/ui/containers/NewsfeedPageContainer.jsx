import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewsfeedPage from '../pages/NewsfeedPage';

const Events = new Mongo.Collection('events');

/**
 * Creates the Container for the Event Feed.
 * 
 * @returns {bool} showing whether the events collection is ready or not
 * @returns {array} of events from the mongo collection
 */

export default withTracker(() => {
    const eventsHandle = Meteor.subscribe('events');
    return {
        loading: !eventsHandle.ready(),
        events: Events.find({}).fetch()
    };
})(NewsfeedPage);
