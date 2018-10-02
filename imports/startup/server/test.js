import {
    Meteor
} from 'meteor/meteor';
import {
    Cards
} from '../../api/cards/cards.js';
import {
    Answers
} from '../../api/answers/answers.js';
const recordar = require('recordar');


let card = Cards.findOne({});
let cardId = card._id;
let userId = 'xkJpFSM9gfyDHffAA';

let questionsID = card.questions.map(q => q._id);

let scores = [];

for(let i=0; i<questionsID.length; i++) {
    let answers = Answers.find(
        {
            cardId: cardId, 
            userId: userId, 
            questionId: questionsID[i]
        }, 
        {
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

