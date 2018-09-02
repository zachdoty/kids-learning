import { Mongo } from 'meteor/mongo';
import { Schemas } from '../schemas.js';

const cards = new Mongo.Collection('cards');

cards.attachSchema(Schemas.Card);

export const Cards = cards;