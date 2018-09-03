import './recorder.html';
import { Session } from 'meteor/session';

let addToSession = (_session, _key, _value) => {
    let obj = _session.get('audio_data');
    if(!obj)
        obj = {};
    obj[_key] = _value;
    _session.set('audio_data', obj);
}

Template.App_recorder.onCreated(function() {
    this.audioRecorder = new AudioRecorder();
    this.url = new ReactiveVar(null);
    this.isRecording = new ReactiveVar(false);
    this.isPlaying = new ReactiveVar(false);
    this.name = new ReactiveVar(`${this.data.name}-audio`);
    if(typeof this.data.qIndex !== 'undefined') {
        this.name.set(`${this.name.get()}${this.data.qIndex}`);
    }
    if(typeof this.data.index !== 'undefined') {
        this.name.set(`${this.name.get()}${this.data.index}`);
    }
    addToSession(Session, this.name, null);
})

Template.App_recorder.helpers({
    isRecording() {
        return Template.instance().isRecording.get();
    },
    isPlaying() {
        return Template.instance().isPlaying.get();
    },
    url() {
        return Template.instance().url.get();
    },
    name() {
        return Template.instance().name.get();
    }
})

Template.App_recorder.events({
    'click #btn-start' (event, template) {
        template.audioRecorder.startRecording();
        template.isRecording.set(true);
        template.url.set(null);
    },
    'click #btn-play' (event, template) {
        let player = document.getElementById(`${template.name.get()}`);
        player.currentTime = 0;
        player.play();
        template.isPlaying.set(true);
        player.addEventListener("ended", () => {
            template.isPlaying.set(false);
       });
    },
    'click #btn-stop-play' (event, template) {
        document.getElementById(`${template.name.get()}`).pause();
        template.isPlaying.set(false);
    },
    'click #btn-stop' (event, template) {
        template.audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile',  (_err, _res) => {
            let b = new Blob([_res], {type: "audio/wav"});
            let URLObject = window.URL;
            let url = URLObject.createObjectURL(b);
            template.url.set(url);
            template.isRecording.set(false);
            addToSession(Session, template.name.get(), _res.join(","));
        });
    },
})

