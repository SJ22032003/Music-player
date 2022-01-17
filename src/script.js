const images = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.querySelector('#current-time');
const durationEL = document.querySelector('#duration');
const mute = document.querySelector('#mute');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#ford');
const loop = document.querySelector('#loop');


//Music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight,Disco Queen',
        artist:'Jacinto Design',
    },
    {
        name:'metric-1',
        displayName:'Front Row',
        artist:'Matt Metric',
    }
];
// Check if playing
let isPlaying = false;

//PLay
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
//Pause
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

//Update DOM
function loadMusic(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `../assets/music/${song.name}.mp3`;
    images.src = `../assets/img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

//Mute
function muteSong(){
        music.muted =  music.muted==false? true:false;
        if(music.muted){
            mute.classList.replace('fa-volume-up', 'fa-volume-mute');
        }else{
            mute.classList.replace('fa-volume-mute', 'fa-volume-up');
        }
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex<0){songIndex=songs.length-1;}
    loadMusic(songs[songIndex]);
    playMusic();

}
// Next Song
function nextSong() {
    songIndex++;
    if (songIndex>songs.length-1){songIndex=0;}
    loadMusic(songs[songIndex]);
    playMusic();
}
// Loop Song
function loopSong(){
    music.loop = music.loop == false? true:false;
    if(music.loop){
        loop.classList.replace('fa-random', 'fa-undo');
    }else{
        loop.classList.replace('fa-undo', 'fa-random');
    }
}
// Update Progress Bar
function updateProgressBar(event) {
    if (isPlaying) {
        //Progres Bar Math logic-----------------------
        const {duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        if(progressPercent >=100){nextSong();}
        

        //Duration of Music----------------------------
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
            //Delay switching to next song
            if(durationSeconds){
                durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
            }
        

        //Current Time---------------------------
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set Progress Bar
function setProgressBar(event) {
    const {clientWidth} = event.srcElement
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/clientWidth)*duration;
}

// on load - select first song
loadMusic(songs[songIndex]);

// Event listener
mute.addEventListener('click', () => muteSong())
prevBtn.addEventListener('click', () => prevSong());
nextBtn.addEventListener('click', () => nextSong());
loop.addEventListener('click', () => loopSong());
music.addEventListener('timeupdate', (event) => updateProgressBar(event));
progressContainer.addEventListener('click', (event) => setProgressBar(event));