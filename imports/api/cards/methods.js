import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import {
    Cards
} from './cards.js';
import {
    Answers
} from '../answers/answers.js';
const recordar = require('recordar');

Meteor.methods({
    'cards.delete'(_id) {
        if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            return Cards.remove(_id);
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.update'(_id, _data) {
        if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            // check(question, String);
            // check(answer, String);
            return Cards.update({
                _id: _id
            }, {
                $set: _data
            });
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.insert'(_data) {
        if (Meteor.userId()) {
            // check(question, String);
            // check(answer, String);
            return Cards.insert(_data);
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.check_answer'(_cardId, _questionId, _answerId) {
        if (Meteor.userId()) {
            let correct = false;
            let data = Cards.findOne({
                '_id': _cardId
            });
            if (data) {
                let question = data.questions.find(_el => {
                    return _el._id == _questionId;
                });
                if (question) {
                    let option = question.options.find(_el => {
                        return _el._id == _answerId;
                    });
                    if (option) {
                        correct = option.isCorrect;
                    }
                }
            }
            return correct;
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
    'cards.questionsID' (_cardId) {
        if (Meteor.userId()) {
            let card = Cards.findOne({_id: _cardId});
            let cardId = card._id;
            let userId = Meteor.userId();
            let questionsID = card.questions.map(q => q._id);

            let scores = [];

            for (let i = 0; i < questionsID.length; i++) {
                let answers = Answers.find({
                    cardId: cardId,
                    userId: userId,
                    questionId: questionsID[i]
                }, {
                    fields: {
                        answerObj: 1
                    }
                }).fetch();

                answers = answers.map(a => a.answerObj);

                recordar(answers, {})
                    .then(_score => {
                        scores.push({
                            qId: questionsID[i],
                            score: _score
                        })
                    });
            };
            scores = scores.sort((a, b) => {
                return a.score - b.score;
            });

            let renderQuestionsID = (scores.slice(0, 20)).map(s => s.qId);
            return renderQuestionsID;
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },

    'cards.scores' (_cardId) {
        if (Meteor.userId()) {
            let card = Cards.findOne({_id: _cardId});
            let cardId = card._id;
            let userId = Meteor.userId();
            let questionsID = card.questions.map(q => q._id);

            let scores = [];

            for (let i = 0; i < questionsID.length; i++) {
                let answers = Answers.find({
                    cardId: cardId,
                    userId: userId,
                    questionId: questionsID[i]
                }, {
                    fields: {
                        answerObj: 1
                    }
                }).fetch();

                answers = answers.map(a => a.answerObj);

                recordar(answers, {})
                    .then(_score => {
                        scores.push({
                            qId: questionsID[i],
                            score: _score
                        })
                    });
            };
            scores = scores.sort((a, b) => {
                return a.score - b.score;
            });

            return scores;
        } else {
            throw new Meteor.Error('Unauthorized');
        }
    },
});