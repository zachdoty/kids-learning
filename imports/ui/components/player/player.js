import './player.html'

Template.App_player.onCreated(function() {
    this.url = new ReactiveVar(null);
    this.isPlaying = new ReactiveVar(false);

    if(this.data.audio.data) {
        let z = (this.data.audio.data.split(",")).map(x => Number(x));
        let b = new Blob([new Uint8Array(z)], {type: "audio/wav"});
        let URLObject = window.URL;
        let url = URLObject.createObjectURL(b);
        this.url.set(url);
    }
    console.log(this.data.name, this.url.get())
})

Template.App_player.helpers({
    isPlaying() {
        return Template.instance().isPlaying.get();
    },
    url() {
        return Template.instance().url.get();
    },
    name() {
        return `${Template.instance().data.name}-audio`;
    }
})

Template.App_player.events({
    'click #btn-play' (event, template) {
        let player = document.getElementById(`${template.data.name}-audio`);
        player.currentTime = 0;
        player.play();
        template.isPlaying.set(true);

        player.addEventListener("ended", () => {
            template.isPlaying.set(false);
       });
    },
    'click #btn-stop' (event, template) {
        document.getElementById(`${template.data.name}-audio`).pause();
        template.isPlaying.set(false);
    },
})

