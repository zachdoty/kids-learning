import { Cards } from '/imports/api/cards/cards.js';
import './cardList.html';

Template.cardList.onCreated(function () {
    this.autorun(() => {
        this.subscribe('cards.all');
    });
});

Template.cardList.helpers({
    cards() {
        return Cards.find({});
    },
});