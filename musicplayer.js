// musicplayer.js

// Add const to handle HTML Elements:
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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

// Update Progress Bar & Time - e = Event 'timeupdate'
function updateProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        const { duration, currentTime} = e.srcElement;
        //console.log(duration, currentTime);

        // Update Progress Bar width
        const progressPercent = (currentTime / duration) * 100;
        //console.log(progressPercent);
        
        // update HTML Div element <div> Progress bar display
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display for duration in just minutes
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes: ', durationMinutes);
        
        // Calculate display for duration remainder in seconds
        let durationSeconds = Math.floor(duration %60 );
        if (durationSeconds < 10)  {
            durationSeconds = `0${durationSeconds}`;
        };
        // console.log('seconds: ', durationSeconds);
    
        // delay switching the duration  HTML Span element <span> display to avoid NaNa (Not a Number) being displayed
        if (durationSeconds) {
            // update the duration HTML Span element <span> display
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        };
        
        // Calculate display for current time in just minutes
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log('minutes: ', currentMinutes);
        
        // Calculate display for current time remainder in seconds
        let currentSeconds = Math.floor(currentTime %60 );
        if (currentSeconds < 10)  {
            currentSeconds = `0${currentSeconds}`;
        };
        // console.log('seconds: ', currentSeconds);
        // update the current-time HTML Span element <span> display
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    };
}

// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    //console.log('width: ', width);
    // position of click on the Progress Bar
    const clickX = e.offsetX;
    //console.log('clickX', clickX);

    // derive the percentage complete
    const { duration } = music;
    // console.log(clickX / width);
    // derive point in time in the song
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);