const audio = document.getElementById("meditation-audio");
const video = document.getElementById("bg-video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const outline = document.querySelector(".progress");
const circleLength = outline.getTotalLength();

let fakeDuration = 600; // 10 min default
let isPlaying = false;
let timer;
let elapsed = 0;

outline.style.strokeDasharray = circleLength;
outline.style.strokeDashoffset = circleLength;

// Time Selection
document.getElementById("smaller-mins").addEventListener("click", () => {
  fakeDuration = 120;
  resetProgress();
});
document.getElementById("medium-mins").addEventListener("click", () => {
  fakeDuration = 300;
  resetProgress();
});
document.getElementById("long-mins").addEventListener("click", () => {
  fakeDuration = 600;
  resetProgress();
});

// Play/Pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMeditation() : startMeditation();
});

function switchSound(type) {
  audio.src = type === "rain" ? "Sounds/rain.mp3" : "Sounds/beach.mp3";
  video.src = type === "rain" ? "Videos/rain.mp4" : "Videos/beach.mp4";
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
    let remaining = fakeDuration - elapsed;
    updateDisplay(remaining);

    let progress = circleLength - (elapsed / fakeDuration) * circleLength;
    outline.style.strokeDashoffset = progress;

    if (remaining <= 0) {
      pauseMeditation();
      resetProgress();
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

function resetProgress() {
  pauseMeditation();
  elapsed = 0;
  updateDisplay(fakeDuration);
  outline.style.strokeDashoffset = circleLength;
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}
