

import { Meteor } from 'meteor/meteor';
import './create.html';

Template.App_create.onCreated(function () {
    this.questions = new ReactiveVar([{
        text: "",
        options: []
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

    'click #btn-save'(event, template) {
        let card = {};
        card.title = $('#title').val();
        let questions = template.questions.get();
        for(let i = 0; i < questions.length; i++) {
            let answer = $(`input[type='radio'][name='options-${i}']:checked`).val();
            questions[i].options[answer].isCorrect = true;
        }
        card.questions = questions;
        Meteor.call('cards.insert', card, (err, res) => {
            if(!err) {
                showAlertSuccess('Card successfully created.');
                $('#card-form').trigger('reset');
                template.questions.set([{
                    text: "",
                    options: []
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
});