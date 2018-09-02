

import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/api/cards/cards.js';
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
    'click #btn-next'(event, template) {
        
    },

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
        let questions = template.questions.get();
        console.log(questions)
    },
});