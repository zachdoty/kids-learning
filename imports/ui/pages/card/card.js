import {
    Meteor
} from 'meteor/meteor';
import {
    Cards
} from '/imports/api/cards/cards.js';
import './cards.html';

Template.App_card.onCreated(function () {
    this.qIndex = new ReactiveVar(0);
    this.isChecking = new ReactiveVar(false);
    this.isLoading = new ReactiveVar(true);
    this.question = new ReactiveVar(null);
    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCardId = () => FlowRouter.getParam("cardId");
        this.questionId = FlowRouter.getParam("qId");
        this.cardId = new ReactiveVar(FlowRouter.getParam("cardId"));
        this.nexQuestionId = new ReactiveVar(null);
    
        this.subscribe('cards.info', this.getCardId());
        if (this.subscriptionsReady()) {
            let card = Cards.findOne({});
            if (this.questionId) {
                this.question.set(card.questions.find(_q => {
                    return _q._id == this.questionId;
                }));
                let currentQuestionIndex = card.questions.findIndex(_q => {
                    return _q._id == this.questionId;
                });
                this.qIndex.set(currentQuestionIndex);
                if ((currentQuestionIndex + 1) <= (card.questions.length - 1))
                    this.nexQuestionId.set(card.questions[currentQuestionIndex + 1]._id);
            } else {
                this.question.set(card.questions[0]);
                if (1 <= (card.questions.length - 1))
                    this.nexQuestionId.set(card.questions[1]._id);
            }
            this.isLoading.set(false);
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
    },
    isLoading() {
        return Template.instance().isLoading.get();
    }
});


Template.App_card.events({
    'click #btn-check, click #btn-check-icon'(event, template) {
        if (!template.isChecking.get()) {
            template.isChecking.set(true);
            let answer = $(`input[type='radio'][name='options']:checked`).val();
            Meteor.call('cards.check_answer', template.cardId.get(), template.question.get()._id, answer, (_err, _res) => {
                if (!_err) {
                    if (_res) {
                        showAlertSuccess('Correct!');
                        template.isLoading.set(true);
                        if (template.nexQuestionId.get()) {
                            FlowRouter.go(`/card/${template.cardId.get()}/${template.nexQuestionId.get()}`);
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