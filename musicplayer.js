// musicplayer.js

// Add const to handle HTML Elements:
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Darkest Void/Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Mertric/Jacinto Design'
    }
];

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

// Function loadSong() to update DOM with songs
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Function prevSong()
function prevSong() {
    // increment Current Song index
    songIndex--;
    // guard condition
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();    
}

// Function nextSong()
function nextSong() {
    // increment Current Song index
    songIndex++;
    // guard condition
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();    
}

// On Load - Select First Song from array
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
