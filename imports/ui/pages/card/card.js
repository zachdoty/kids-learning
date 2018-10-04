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
    this.message = new ReactiveVar(null);
    this.question = new ReactiveVar(null);
    this.questionsID = null;
    this.questionsCount = new ReactiveVar(0);
    this.questionsLoaded = new ReactiveVar(false);

    Meteor.call('cards.questionsID', FlowRouter.getParam("cardId"), (_err, _res) => {
        this.questionsID = _res;
        this.questionsCount.set(_res.length);
        this.questionsLoaded.set(true);
    })

    this.autorun(() => {
        FlowRouter.watchPathChange();
        this.getCardId = () => FlowRouter.getParam("cardId");
        this.questionId = FlowRouter.getParam("qId");
        this.cardId = new ReactiveVar(FlowRouter.getParam("cardId"));
        this.nexQuestionId = new ReactiveVar(null);

        this.subscribe('cards.info', this.getCardId());
        if (this.subscriptionsReady()) {
            let card = Cards.findOne({});
            if(this.questionsLoaded.get()) {
                if (this.questionsID.includes(this.questionId)) {
                    this.question.set(card.questions.find(_q => {
                        return _q._id == this.questionId;
                    }));
                    let currentQuestionIndex = this.questionsID.findIndex(_q => {
                        return _q == this.questionId;
                    });
                    this.qIndex.set(currentQuestionIndex);
                    if ((currentQuestionIndex + 1) <= (this.questionsID.length - 1))
                        this.nexQuestionId.set(this.questionsID[currentQuestionIndex + 1]);
                } else {
                    this.question.set(card.questions.find(_q => {
                        return _q._id == this.questionsID[0];
                    }));
                    if (1 <= (card.questions.length - 1))
                        this.nexQuestionId.set(this.questionsID[1]);
                }
                this.isLoading.set(false);
            }
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
    questionsCount() {
        return Template.instance().questionsCount.get();
    },
    shuffle(_options) {
        return _options;
    },
    qIndex() {
        return Template.instance().qIndex.get() + 1;
    },
    isLoading() {
        return Template.instance().isLoading.get();
    },
    message() {
        return Template.instance().message.get();
    },
    codeStr(_code) {
        let input = '<input name="question-answer" class="question-answer" type="text" />';
        return Spacebars.SafeString(_code.replace("#_#", input));
    }
});

Template.App_card.events({
    'click .list-group-item.option' (event, template) {
        $(`.list-group-item.option`).removeClass('active');
        $(event.target).closest(`.list-group-item.option`).addClass('active');
        $(event.target).find(`input[type='radio'][name='options']`).prop('checked', true);
    },
    'click #btn-next' (event, template) {
        template.isLoading.set(true);
        if (template.nexQuestionId.get()) {
            FlowRouter.go(`/card/${template.cardId.get()}/${template.nexQuestionId.get()}`);
        } else {
            $('#resultModal').modal('dispose');
            $('.modal-backdrop').css('display', 'none');
            FlowRouter.go('/');
        }
    },
    'click #btn-check, click #btn-check-icon'(event, template) {
        if (!template.isChecking.get()) {
            template.isChecking.set(true);
            let answer = null;
            let activeQuestion = Template.instance().question.get();
            if(activeQuestion.type == 'choices')
                answer = $(`input[type='radio'][name='options']:checked`).val();
            else
                answer = $(`input[type='text'][name='question-answer']`).val();
            Meteor.call('card.answers.insert', template.cardId.get(), template.question.get()._id, answer, (_err, _res) => {
                if (!_err) {
                    if (_res.correct) {
                        template.message.set('Correct!');
                    } else {
                        template.message.set(`Wrong! Correct answer is: ${_res.text}`);
                    }
                } else {
                    showAlertError('Error while trying to check the answer, please try again.')
                }
                template.isChecking.set(false);
            })
        }
    },
})