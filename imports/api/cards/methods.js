import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from './cards.js';

Meteor.methods({
    'cards.insert'(_data) {
        // check(question, String);
        // check(answer, String);
        return Cards.insert(_data);
    },
    'cards.check_answer'(_cardId, _questionId, _answerId) {
        let correct = false;
        let data = Cards.findOne({'_id': _cardId});
        if(data) {
            let question = data.questions.find(_el => {
                return _el._id == _questionId;
            });
            if(question) {
                let option = question.options.find(_el => {
                    return _el._id == _answerId;
                });
                if(option) {
                    correct = option.isCorrect;
                }
            }
        }
        return correct;
    },
});