import { Mongo } from 'meteor/mongo';
import { Schemas } from '../schemas.js';

const answers = new Mongo.Collection('answers');

answers.attachSchema(Schemas.Answers);

answers.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});


export const Answers = answers;