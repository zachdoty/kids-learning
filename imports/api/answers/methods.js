import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Answers } from './answers.js';
import { Cards } from '../cards/cards.js';

Meteor.methods({
    'card.answers.insert'(_cardId, _questionId, _answerId) {
        if(Meteor.userId()) {
            let card = Cards.findOne({'_id': _cardId});
            let result = {
                correct: false,
                text: null
            };
            if(card) {
                let question = card.questions.find(_el => {
                    return _el._id == _questionId;
                });
                if(question) {
                    let correctOption = question.options.find(_el => {
                        return _el.isCorrect;
                    });
                    if(correctOption) {
                        result.correct = correctOption._id == _answerId;
                        result.text = correctOption.text;
                    }
                }
                let data = {
                    cardId: _cardId,
                    userId: Meteor.userId(),
                    questionId: _questionId,
                    answerId: _answerId,
                    answerObj: {
                        type: result.correct ? 'good' : 'bad',
                        time: new Date()
                    }
                }
                Answers.insert(data);
            }
            return result;
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
})