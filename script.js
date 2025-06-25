const video = document.querySelector(".video-bg");
const audio = document.getElementById("meditation-audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let isPlaying = false;
let timer;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    playMedia();
  } else {
    pauseMedia();
  }
});

function playMedia() {
  audio.play();
  video.play();
  playBtn.textContent = "⏸";
  isPlaying = true;

  timer = setInterval(() => {
    duration--;
    updateTimeDisplay();
    if (duration <= 0) {
      pauseMedia();
      audio.currentTime = 0;
      video.currentTime = 0;
    }
  }, 1000);
}

function pauseMedia() {
  audio.pause();
  video.pause();
  playBtn.textContent = "▶";
  isPlaying = false;
  clearInterval(timer);
}

function updateTimeDisplay() {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    duration = parseInt(button.getAttribute("data-time"));
    updateTimeDisplay();
  });
});

soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const soundSrc = button.getAttribute("data-sound");
    const videoSrc = button.getAttribute("data-video");

    audio.src = soundSrc;
    video.querySelector("source").src = videoSrc;
    video.load();

    if (isPlaying) {
      audio.currentTime = 0;
      video.currentTime = 0;
      playMedia();
    }
  });
});

// Initial display
updateTimeDisplay();
