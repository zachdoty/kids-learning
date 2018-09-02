import { Meteor } from 'meteor/meteor';
import { Cards } from '../cards.js';

Meteor.publish('cards.all', function () {
    return Cards.find();
});