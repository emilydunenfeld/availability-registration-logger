/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Attendance } from './attendance';

// define "schema"
Factory.define('attendance', Attendance, {
    eventId: () => Random.id()
});