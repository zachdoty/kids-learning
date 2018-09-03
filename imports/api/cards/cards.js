import { Mongo } from 'meteor/mongo';
import { Schemas } from '../schemas.js';

const cards = new Mongo.Collection('cards');

cards.attachSchema(Schemas.Card);

cards.deny({
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


export const Cards = cards;