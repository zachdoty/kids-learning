import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/api/cards/cards.js';
import './cards.html';

Template.App_card.onCreated(function () {
    this.getCardId = () => FlowRouter.getParam("cardId");
    this.cardId = new ReactiveVar(FlowRouter.getParam("cardId"));
    this.qIndex = new ReactiveVar(0);
    this.isChecking = new ReactiveVar(false);
    this.question = new ReactiveVar(null);
    this.autorun(() => {
        this.subscribe('cards.info', this.getCardId());
        if(this.subscriptionsReady()) {
            let card = Cards.findOne({});
            this.question.set(card.questions[this.qIndex.get()]);
        }
    });
});

Template.App_card.helpers({
    card() {
        return Cards.findOne({});
    },
    question() {
        return Template.instance().question.get();
    },
    shuffle(_options) {
        return _options;
    },
    qIndex() {
        return Template.instance().qIndex.get() + 1;
    }
});


Template.App_card.events({
    'click #btn-check, click #btn-check-icon'(event, template) {
        if(!template.isChecking.get()) {
            template.isChecking.set(true);
            let answer = $(`input[type='radio'][name='options']:checked`).val();
            let qId = $(event.target).data('qid');
            let card = Cards.findOne({});
            let question = card.questions[Template.instance().qIndex.get()];
            Meteor.call('cards.check_answer', template.cardId.get(), question._id, answer, (_err, _res) => {
                if(!_err) {
                    if(_res) {
                        showAlertSuccess('Correct!');
                        let qIndex = template.qIndex.get() + 1;
                        if(qIndex < card.questions.length) {
                            template.qIndex.set(qIndex);
                        } else {
                            FlowRouter.go('/');
                        }
                    } else {
                        showAlertInfo('Wrong!');
                    }
                } else {
                    showAlertError('Error while trying to check the anser, please try again.')
                }
                template.isChecking.set(false);
            })
        }
    },
})
