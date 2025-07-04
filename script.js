const videoElement = document.getElementById('meditation-video');
const audioElement = document.getElementById('meditation-audio');
const timeDisplay = document.querySelector('.time-display');
const playPauseBtn = document.getElementById('play-pause-btn');
const switchSoundBtn = document.getElementById('switch-sound');

let meditationTime = 600; // Default to 10 minutes in seconds
let isPlaying = false;
let currentSound = 'beach'; // Default sound

// Function to update the time display
function updateTimeDisplay() {
    const minutes = Math.floor(meditationTime / 60);
    const seconds = meditationTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to handle play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioElement.pause();
        videoElement.pause();
    } else {
        audioElement.play();
        videoElement.play();
        startTimer();
    }
    isPlaying = !isPlaying;
});

// Function to switch sounds
switchSoundBtn.addEventListener('click', () => {
    if (currentSound === 'beach') {
        currentSound = 'rain';
        audioElement.src = 'Sounds/rain.mp3';
        videoElement.src = 'video/rain.mp4';
    } else {
        currentSound = 'beach';
        audioElement.src = 'Sounds/beach.mp3';
        videoElement.src = 'video/beach.mp4';
    }
    if (isPlaying) {
        audioElement.play();
        videoElement.play();
    }
});

// Function to set meditation time
document.getElementById('smaller-mins').addEventListener('click', () => {
    meditationTime = 120; // 2 minutes
    updateTimeDisplay();
});

document.getElementById('medium-mins').addEventListener('click', () => {
    meditationTime = 300; // 5 minutes
    updateTimeDisplay();
});

document.getElementById('long-mins').addEventListener('click', () => {
    meditationTime = 600; // 10 minutes
    updateTimeDisplay();
});

// Timer function
function startTimer() {
    const timerInterval = setInterval(() => {
        if (meditationTime <= 0) {
            clearInterval(timerInterval);
            audioElement.pause();
            videoElement.pause();
            isPlaying = false;
            return;
        }
        meditationTime--;
        updateTimeDisplay();
    }, 1000);
}

// Initialize time display
updateTimeDisplay();
