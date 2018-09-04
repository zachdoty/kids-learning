import { Meteor } from 'meteor/meteor';
import { Cards } from '../cards.js';

Meteor.publish('cards.all', function () {
    if (Meteor.userId()) {
        // Roles.addUsersToRoles(Meteor.userId(), ['admin']);
        return Cards.find({isLive: true}, { fields: {
            'isLive': 0,
            'questions.options.isCorrect': 0
        }});
    } else {
        return [];
    }
});

Meteor.publish('cards.info', function (_id) {
    if (Meteor.userId()) {
        return Cards.find({isLive: true, '_id': _id}, { fields: {
            'isLive': 0,
            'questions.options.isCorrect': 0
        }});
    } else {
        return [];
    }
});