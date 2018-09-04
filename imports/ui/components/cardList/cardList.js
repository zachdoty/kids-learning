import { Cards } from '/imports/api/cards/cards.js';
import './cardList.html';

Template.cardList.onCreated(function () {
    this.isLoading = new ReactiveVar(true);
    this.autorun(() => {
        this.subscribe('cards.all');
        if(this.subscriptionsReady()) {
            this.isLoading.set(false);
        }
    });
});

Template.cardList.helpers({
    cards() {
        return Cards.find({});
    },
    isLoading() {
        return Template.instance().isLoading.get();
    },
});