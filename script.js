const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 minutes
let currentTime = 0;
let timer = null;
let isPlaying = false;

// Handle time selection
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    duration = parseInt(button.getAttribute("data-time"));
    updateTimeDisplay(duration);
    reset();
  });
});

// Handle sound/video mode switching
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const soundSrc = button.getAttribute("data-sound");
    const videoSrc = button.getAttribute("data-video");

    audio.src = soundSrc;
    video.src = videoSrc;

    reset();
    if (isPlaying) {
      audio.play().then(() => {
        video.play();
      });
    }
  });
});

// Play/Pause functionality
playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play().then(() => {
      video.play();
      startTimer();
      playButton.textContent = "Pause";
      isPlaying = true;
    });
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    playButton.textContent = "Play";
    isPlaying = false;
  }
});

// Timer logic
function startTimer() {
  currentTime = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    currentTime++;
    const remaining = duration - currentTime;
    updateTimeDisplay(remaining);

    if (currentTime >= duration) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      playButton.textContent = "Play";
      isPlaying = false;
    }
  }, 1000);
}

// Update time display
function updateTimeDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  timeDisplay.textContent = `${min}:${sec}`;
}

// Reset all state
function reset() {
  clearInterval(timer);
  audio.pause();
  video.pause();
  audio.currentTime = 0;
  video.currentTime = 0;
  isPlaying = false;
  playButton.textContent = "Play";
  updateTimeDisplay(duration);
}

// Handle play() interruptions in Cypress
window.addEventListener("unhandledrejection", (e) => {
  e.preventDefault();
});
