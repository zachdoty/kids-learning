import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from './cards.js';

Meteor.methods({
    'cards.insert'(question, answer) {
        check(question, String);
        check(answer, String);
        return Cards.insert({
            question,
            answer,
            createdAt: new Date(),
        });
    },
});