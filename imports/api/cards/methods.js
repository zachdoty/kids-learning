import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from './cards.js';

Meteor.methods({
    'cards.delete'(_id) {
        if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            return Cards.remove(_id);
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.update'(_id, _data) {
        if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            // check(question, String);
            // check(answer, String);
            return Cards.update({_id: _id}, {
                $set: _data
            });
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.insert'(_data) {
        if(Meteor.userId()) {
            // check(question, String);
            // check(answer, String);
            return Cards.insert(_data);
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.check_answer'(_cardId, _questionId, _answerId) {
        if(Meteor.userId()) {
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
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
});