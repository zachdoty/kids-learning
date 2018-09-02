import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/api/cards/cards.js';
import './cardList.html';

Template.cardList.onCreated(function () {
    Meteor.subscribe('cards.all');
});

Template.cardList.helpers({
    cards() {
        return Cards.find({});
    },
    length(_arr) {
        return _arr.length;
    },
});