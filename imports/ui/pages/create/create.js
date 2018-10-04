

import { Meteor } from 'meteor/meteor';
import './create.html';
import { Session } from 'meteor/session';

Template.App_create.onCreated(function () {
    this.questions = new ReactiveVar([{
        text: "",
        type: "choices",
        answer: "",
        code: "",
        options: [{
            text: "",
            isCorrect: false
        }]
    }]);
});

Template.App_create.helpers({
    questions() {
        return  Template.instance().questions.get();
    },
});

Template.App_create.events({
    'click #add-question'(event, template) {
        let questions = template.questions.get();
        questions.push({
            text: "",
            type: "choices",
            answer: "",
            code: "",
            options: [{
                text: "",
                isCorrect: false
            }]
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

    'click #btn-save'(event, template) {
        let audio = Session.get('audio_data');
        let card = {};
        card.title = $('#title').val();
        card.audio = {data: audio[`title-audio`]}
        let questions = template.questions.get();
        for(let i = 0; i < questions.length; i++) {
            questions[i].audio = {data: audio[`question-audio${i}`]}
            let answer = $(`input[type='radio'][name='options-${i}']:checked`).val();
            if(questions[i].type == 'choices') {
                questions[i].options[answer].isCorrect = true;
                for(let j = 0; j < questions[i].options.length; j++) {
                    questions[i].options[j].audio = {data: audio[`option-audio${i}${j}`]};
                }
            }
        }
        card.questions = questions;
        Meteor.call('cards.insert', card, (err, res) => {
            if(!err) {
                showAlertSuccess('Card successfully created.');
                $('#card-form').trigger('reset');
                template.questions.set([{
                    text: "",
                    type: "choices",
                    answer: "",
                    code: "",
                    options: [{
                        text: "",
                        isCorrect: false
                    }]
                }]);
            } else {
                showAlertError('Error while saving card, please check details and try again.');
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

    'click .q-type-selector' (event, template) {
        let qIndex = $(event.target).data('index');
        let value = $(event.target).val();
        let questions = template.questions.get();
        questions[qIndex].type = value;
        if(value == 'choices')
        questions[qIndex].code = questions[qIndex].answer = '';
        else
            questions[qIndex].options = [];
        template.questions.set(questions);
    },

    'change .question-answer'(event, template) {
        let qIndex = $(event.target).data('index');
        let value = event.target.value;
        let questions = template.questions.get();
        questions[qIndex].answer = value;
        template.questions.set(questions);
    },

    'change .question-code'(event, template) {
        let qIndex = $(event.target).data('index');
        let value = event.target.value;
        let questions = template.questions.get();
        questions[qIndex].code = value;
        template.questions.set(questions);
    },
});