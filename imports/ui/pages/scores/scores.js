import './scores.html';

import {
    Meteor
} from 'meteor/meteor';
import {
    Cards
} from '/imports/api/cards/cards.js';

Template.App_scores.onCreated(function () {
    this.isLoading = new ReactiveVar(true);
    this.scores = new ReactiveVar([]);

    Meteor.call('cards.scores', FlowRouter.getParam("cardId"), (_err, _res) => {
        this.scores.set(_res);
    })

    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCardId = () => FlowRouter.getParam("cardId");
        this.subscribe('cards.info', this.getCardId());
    });
});

Template.App_scores.helpers({
    card() {
        return Cards.findOne({});
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
});