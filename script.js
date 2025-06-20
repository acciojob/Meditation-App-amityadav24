const audio = document.getElementById("meditation-audio");
const video = document.getElementById("bg-video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const smallerBtn = document.getElementById("smaller-mins");
const mediumBtn = document.getElementById("medium-mins");
const longBtn = document.getElementById("long-mins");

let fakeDuration = 600; // default 10 min
let isPlaying = false;
let timer;
let elapsed = 0;

// Set initial time display
updateDisplay(fakeDuration);

// Time selection events
smallerBtn.addEventListener("click", () => {
  fakeDuration = 120;
  reset();
});
mediumBtn.addEventListener("click", () => {
  fakeDuration = 300;
  reset();
});
longBtn.addEventListener("click", () => {
  fakeDuration = 600;
  reset();
});

// Play/Pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMeditation() : startMeditation();
});

// Switch between beach and rain
function switchSound(type) {
  if (type === "beach") {
    audio.src = "Sounds/beach.mp3";
    video.src = "Videos/beach.mp4";
  } else if (type === "rain") {
    audio.src = "Sounds/rain.mp3";
    video.src = "Videos/rain.mp4";
  }

  if (isPlaying) {
    audio.play();
    video.play();
  }
}

function startMeditation() {
  audio.play();
  video.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";

  timer = setInterval(() => {
    elapsed++;
    const remaining = fakeDuration - elapsed;
    updateDisplay(remaining);

    if (remaining <= 0) {
      reset();
    }
  }, 1000);
}

function pauseMeditation() {
  audio.pause();
  video.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
  clearInterval(timer);
}

function reset() {
  pauseMeditation();
  elapsed = 0;
  updateDisplay(fakeDuration);
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  timeDisplay.textContent = `${mins}:${secs}`;
}
