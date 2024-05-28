let tracks = [];
let currentTrackIndex = 0;
const audioElement = document.getElementById('audio');
const trackTitleElement = document.getElementById('track-title');
const addTrackForm = document.getElementById('add-track-form');
const trackList = document.getElementById('track-list');

async function fetchTracks() {
    const response = await fetch('/tracks');
    tracks = await response.json();
    loadTrack(currentTrackIndex);
    displayTrackList();
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

function displayTrackList() {
    trackList.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerText = track.title;
        li.onclick = () => loadTrack(index);
        trackList.appendChild(li);
    });
}

addTrackForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('track-title-input').value;
    const src = document.getElementById('track-src-input').value;
    try {
        const response = await fetch('/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, src })
        });
        if (response.ok) {
            const newTrack = await response.json();
            tracks.push(newTrack);
            loadTrack(tracks.length - 1);
            displayTrackList();
        }
    } catch (error) {
        console.error('Error adding track:', error);
    }
});

fetchTracks();
