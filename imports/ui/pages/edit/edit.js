import './edit.html';
import {
    Cards
} from '/imports/api/cards/cards.js';


Template.App_edit_card.onCreated(function() {
    this.isLoading = new ReactiveVar(true);
    this.questions = new ReactiveVar(null);
    this.autorun(() => {
        this.getCardId = () => FlowRouter.getParam("cardId");
        this.subscribe('cards.info-admin', this.getCardId());
        if (this.subscriptionsReady()) {
            let card = Cards.findOne({});
            this.questions.set(card.questions);
            this.isLoading.set(false);
        }
    });
})

Template.App_edit_card.events({
    'click #add-question'(event, template) {
        let questions = template.questions.get();
        questions.push({
            text: "",
            options: []
        });
        template.questions.set(questions);
    },

    'click .add-option'(event, template) {
        let qIndex = $(event.target).data('index');
        let questions = template.questions.get();
        questions[qIndex].options.push({
            text: "",
            isCorrect: false
        });
        template.questions.set(questions);
    },

    'click #btn-save-changes'(event, template) {
        // let audio = Session.get('audio_data');
        let card = {};
        card.title = $('#title').val();
        // card.audio = {data: audio[`title-audio`]}
        let questions = template.questions.get();
        for(let i = 0; i < questions.length; i++) {
            // questions[i].audio = {data: audio[`question-audio${i}`]}
            let answer = $(`input[type='radio'][name='options-${i}']:checked`).val();
            questions[i].options[answer].isCorrect = true;
            // for(let j = 0; j < questions[i].options.length; j++) {
            //     questions[i].options[j].audio = {data: audio[`option-audio${i}${j}`]};
            // }
        }
        card.questions = questions;
        Meteor.call('cards.update', FlowRouter.getParam("cardId"), card, (err, res) => {
            if(!err) {
                showAlertSuccess('Card successfully updated.');
                template.isLoading.set(true);
            } else {
                showAlertError('Error while updating card, please check details and try again.');
            }
        })
    },

    'change .question-text'(event, template) {
        let qIndex = $(event.target).data('index');
        let value = event.target.value;
        let questions = template.questions.get();
        questions[qIndex].text = value;
        template.questions.set(questions);
    },

    'change .option-text'(event, template) {
        let qIndex = $(event.target).data('qindex');
        let index = $(event.target).data('index');
        let value = event.target.value;
        let questions = template.questions.get();
        questions[qIndex].options[index].text = value;
        template.questions.set(questions);
    },
})

Template.App_edit_card.helpers({
    card() {
        return Cards.findOne({});
    },
    questions() {
        return Template.instance().questions.get();
    },
    isLoading() {
        return Template.instance().isLoading.get();
    }
})