// musicplayer.js

// Add const to handle HTML Elements:
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// boolean to indicate if audio is in play mode
let isPlaying = false;

// function playSong():
function playSong() {
    isPlaying = true;
    // toggle incon to indicate mode
    playBtn.classList.replace('fa-play', 'fa-pause');
    // change the hover title on the icon from Play to Pause
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

// function pauseSong():
function pauseSong() {
    isPlaying = false;
    // toggle incon to indicate mode
    playBtn.classList.replace('fa-pause', 'fa-play');
    // change the hover title on the icon from Pause to Play
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));