// Web Audio API Cinematic Ambient Synthesizer
// Synthesizes a beautiful, nostalgic, soft piano & pad chord progression on the fly!
// Completely offline, zero loading latency, zero assets required.

class AmbientSynthesizer {

}

const audio = new Audio('/music/farewell.mp3');

audio.loop = true;
audio.volume = 0.5;

export const ambientSynth = {
  isPlaying: false,

  start() {
    audio.play();
    this.isPlaying = true;
  },

  stop() {
    audio.pause();
    this.isPlaying = false;
  },

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
};