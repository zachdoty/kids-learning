import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/api/cards/cards.js';
import './cards.html';

Template.card.onCreated(function () {
    Meteor.subscribe('cards.all');
});

Template.card.helpers({
    cards() {
        return Cards.find({});
    },
});