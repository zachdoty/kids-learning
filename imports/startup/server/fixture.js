// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Cards } from '../../api/cards/cards.js';

Meteor.startup(() => {

  if (Cards.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        questions: [
            {
                type: 'options',
                text: 'Question A',
                options: [
                    {
                        text: 'option 1',
                        isCorrect: true
                    },
                    {
                        text: 'option 2'
                    },
                    {
                        text: 'option 3'
                    },
                ]
            },
            {
                type: 'options',
                text: 'Question B',
                options: [
                    {
                        text: 'option 1',
                        isCorrect: true
                    },
                    {
                        text: 'option 2'
                    },
                    {
                        text: 'option 3'
                    },
                ]
            }
        ]
      },
      {
        title: 'Follow the Guide',
        questions: [
            {
                type: 'options',
                text: 'Question A',
                options: [
                    {
                        text: 'option 1'
                    },
                    {
                        text: 'option 2',
                        isCorrect: true
                    },
                    {
                        text: 'option 3'
                    },
                ]
            }
        ]
      },
      {
        title: 'Read the Docs',
        questions: [
            {
                type: 'options',
                text: 'Question A',
                options: [
                    {
                        text: 'option 1'
                    },
                    {
                        text: 'option 2',
                        isCorrect: true
                    },
                    {
                        text: 'option 3'
                    },
                ]
            }
        ]
      },
      {
        title: 'Discussions',
        questions: [
            {
                type: 'options',
                text: 'Question A',
                options: [
                    {
                        text: 'option 1'
                    },
                    {
                        text: 'option 2'
                    },
                    {
                        text: 'option 3',
                        isCorrect: true
                    },
                ]
            }
        ]
      },
    ];
    data.forEach(card => Cards.insert(card));
  }
});
