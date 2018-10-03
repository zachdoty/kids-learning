import {
    Meteor
} from 'meteor/meteor';
import {
    Cards
} from '/imports/api/cards/cards.js';
import './dashboard.html';

Template.App_dashboard.onCreated(function(){

    Meteor.subscribe('users.info');
    Meteor.subscribe('cards.all');

    this.scores = new ReactiveVar([]);
    this.cardId = new ReactiveVar(null);

})

Template.App_dashboard.events({
    'submit #query-form' (event, template) {
        let userId = event.target.user.value;
        let cardId = event.target.card.value;
        if(userId && cardId) {
            template.cardId.set(cardId);
            Meteor.call('card.user.scores', cardId, userId, (_err, _res) => {
                template.scores.set(_res);
            })
        }
    }
})

Template.App_dashboard.helpers({
    users() {
        return Meteor.users.find({});
    },
    cards() {
        return Cards.find({});
    },
    card() {
        return Cards.findOne({'_id': Template.instance().cardId.get()});
    },
    score(_qId) {
        let scores = Template.instance().scores.get();
        let res = scores.find(score => {
            return score.qId == _qId;
        })
        if(res) {
            return res.score;
        } else
            return 0;
    },
})