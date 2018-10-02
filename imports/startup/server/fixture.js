// Fill the DB with example data on startup

import {
    Meteor
} from 'meteor/meteor';
import {
    Cards
} from '../../api/cards/cards.js';

Meteor.startup(() => {
    if (Cards.find().count() === 0) {
        let data = [{
                title: 'Test Question',
                questions: [
                    // {
                    //     text: 'Question A',
                    //     options: [{
                    //             text: 'option 1',
                    //             isCorrect: true
                    //         },
                    //         {
                    //             text: 'option 2'
                    //         },
                    //         {
                    //             text: 'option 3'
                    //         },
                    //     ]
                    // }
                ]
            }];


        for(let i=0; i<100; i++) {
            let options = [];
            let min = 1;
            let max = 3;
            let correct = Math.floor(Math.random() * (max - min + 1)) + min;
            for(let j=1; j<4; j++) {
                let option = {
                    text: `Option ${j}`
                };
                if(j == correct)
                    option.isCorrect = true;
                options.push(option);
            }
            
            let question = {
                text: `Question ${i+1}`,
                options: options
            };
            data[0].questions.push(question);
        }

        data.forEach(card => Cards.insert(card));
    }
});