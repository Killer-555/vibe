let tracks = [];
let currentTrackIndex = 0;
const audioElement = document.getElementById('audio');
const trackTitleElement = document.getElementById('track-title');

async function fetchTracks() {
    const response = await fetch('https://your-app-name.herokuapp.com/tracks');
    tracks = await response.json();
    loadTrack(currentTrackIndex);
}

function loadTrack(index) {
    if (tracks.length === 0) return;
    audioElement.src = tracks[index].src;
    trackTitleElement.innerText = tracks[index].title;
    audioElement.load();
    audioElement.play();
}

function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
}

fetchTracks();