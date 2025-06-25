const app = document.querySelector(".app");
const video = document.querySelector(".vid-container video");
const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let isPlaying = false;
let timer;

audio.muted = false;

const updateTimeDisplay = () => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const playMedia = () => {
  const playPromise = audio.play();
  video.play();
  playBtn.textContent = "⏸";
  isPlaying = true;

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        timer = setInterval(() => {
          duration--;
          updateTimeDisplay();
          if (duration <= 0) {
            pauseMedia();
            audio.currentTime = 0;
            video.currentTime = 0;
          }
        }, 1000);
      })
      .catch(err => {
        console.error("Playback error:", err);
      });
  }
};

const pauseMedia = () => {
  if (!isPlaying) return;
  audio.pause();
  video.pause();
  clearInterval(timer);
  isPlaying = false;
  playBtn.textContent = "▶";
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseMedia() : playMedia();
});

timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const id = button.id;
    if (id === "smaller-mins") duration = 120;
    else if (id === "medium-mins") duration = 300;
    else if (id === "long-mins") duration = 600;
    updateTimeDisplay();
  });
});

soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const soundSrc = button.getAttribute("data-sound");
    const videoSrc = button.getAttribute("data-video");

    pauseMedia();
    audio.src = soundSrc;
    video.querySelector("source").src = videoSrc;
    video.load();
    audio.load();

    playBtn.textContent = "▶";
    duration = 600;
    updateTimeDisplay();
  });
});

updateTimeDisplay();
