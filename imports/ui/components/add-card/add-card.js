import { Meteor } from 'meteor/meteor';
import { Cards } from '/imports/api/cards/cards.js';
import './add-card.html';

var audioRecorder = new AudioRecorder();
// audioRecorder.startRecording();
// audioRecorder.stopRecording('wav', 'wavFile');

Template.addCard.events({
    'submit .add-card'(event) {
        event.preventDefault();
        console.log(event.target.question.value);
        // const target = event.target;
        // const title = target.title;
        // const url = target.url;

        Meteor.call('cards.insert', event.target.question.value, event.target.answer.value, (error) => {
            if (error) {
                alert(error.error);
            } else {
                event.target.question.value = '';
                event.target.answer.value = '';
            }
        });
    },
});