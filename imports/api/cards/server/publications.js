import { Meteor } from 'meteor/meteor';
import { Cards } from '../cards.js';

Meteor.publish('cards.all', function () {
    return Cards.find({isLive: true}, { fields: {
        'isLive': 0,
        'questions.options.isCorrect': 0
    }});
});

Meteor.publish('cards.info', function (_id) {
    return Cards.find({isLive: true, '_id': _id}, { fields: {
        'isLive': 0,
        'questions.options.isCorrect': 0
    }});
});