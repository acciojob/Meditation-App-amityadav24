const app = document.getElementById("app");
const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 minutes
let currentTime = 0;
let timer;
let isPlaying = false;

// Time select buttons
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    duration = parseInt(button.getAttribute("data-time"));
    updateTimeDisplay(duration);
    reset();
  });
});

// Sound/video switch buttons
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const soundSrc = button.getAttribute("data-sound");
    const videoSrc = button.getAttribute("data-video");

    audio.src = soundSrc;
    video.src = videoSrc;

    reset();
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Play/Pause button
playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    startTimer();
    playButton.textContent = "Pause";
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    playButton.textContent = "Play";
  }
  isPlaying = !isPlaying;
});

function updateTimeDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  currentTime = 0;
  timer = setInterval(() => {
    currentTime++;
    updateTimeDisplay(duration - currentTime);
    if (currentTime >= duration) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      isPlaying = false;
      playButton.textContent = "Play";
    }
  }, 1000);
}

function reset() {
  clearInterval(timer);
  isPlaying = false;
  playButton.textContent = "Play";
  updateTimeDisplay(duration);
  audio.pause();
  video.pause();
  audio.currentTime = 0;
}
