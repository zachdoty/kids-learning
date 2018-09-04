import './player.html'

let play = (_template, _player) => {
    _player.currentTime = 0;
    _player.play();
    _template.isPlaying.set(true);

    _player.addEventListener("ended", () => {
        _template.isPlaying.set(false);
    });
}

Template.App_player.onCreated(function () {
    this.url = new ReactiveVar(null);
    this.isPlaying = new ReactiveVar(false);

    if (this.data.audio.data) {
        let z = (this.data.audio.data.split(",")).map(x => Number(x));
        let b = new Blob([new Uint8Array(z)], {
            type: "audio/wav"
        });
        let URLObject = window.URL;
        let url = URLObject.createObjectURL(b);
        this.url.set(url);
        if (typeof this.data.autoplay !== 'undefined' && this.data.autoplay === true) {
            let autoPlay = () => {
                let player = document.getElementById(`${this.data.name}-audio`);
                if (player) {
                    play(this, player);
                } else {
                    setTimeout(autoPlay, 100);
                }
            }
            setTimeout(autoPlay, 100);
        }
    }
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
    'click #btn-play'(event, template) {
        let player = document.getElementById(`${template.data.name}-audio`);
        if(player) {
            play(template, player);
        }
    },
    'click #btn-stop'(event, template) {
        document.getElementById(`${template.data.name}-audio`).pause();
        template.isPlaying.set(false);
    },
})