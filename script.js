const sound = document.getElementById("sound");
const video = document.getElementById("bgVideo");
const play = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundPicker = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 minutes
let currentSound = "./Sounds/beach.mp3";
let currentVideo = "./Sounds/beach.mp4";
let isPlaying = false;
let timer;

// Set initial display
timeDisplay.textContent = formatTime(duration);

// Time selection buttons
timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "smaller-mins") duration = 120;
    else if (btn.id === "medium-mins") duration = 300;
    else if (btn.id === "long-mins") duration = 600;

    resetTimer();
  });
});

// Play/Pause toggle
play.addEventListener("click", async () => {
  if (!isPlaying) {
    isPlaying = true;
    play.textContent = "Pause";
    try {
      await sound.play();
      video.play();
    } catch (err) {
      console.error("Audio play failed:", err);
    }
    startTimer();
  } else {
    isPlaying = false;
    play.textContent = "Play";
    sound.pause();
    video.pause();
    clearInterval(timer);
  }
});

// Sound switch
soundPicker.forEach((btn) => {
  btn.addEventListener("click", () => {
    const soundName = btn.getAttribute("data-sound");
    const videoName = btn.getAttribute("data-video");

    currentSound = `./Sounds/${soundName}.mp3`;
    currentVideo = `./Sounds/${videoName}.mp4`;

    sound.src = currentSound;
    video.src = currentVideo;

    if (isPlaying) {
      sound.play();
      video.play();
    }
  });
});

// Format time as mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Reset display
function resetTimer() {
  clearInterval(timer);
  isPlaying = false;
  play.textContent = "Play";
  sound.pause();
  sound.currentTime = 0;
  video.pause();
  timeDisplay.textContent = formatTime(duration);
}

// Timer logic
function startTimer() {
  let remaining = duration;
  timeDisplay.textContent = formatTime(remaining);

  timer = setInterval(() => {
    remaining--;
    timeDisplay.textContent = formatTime(remaining);

    if (remaining <= 0) {
      clearInterval(timer);
      sound.pause();
      video.pause();
      play.textContent = "Play";
      isPlaying = false;
    }
  }, 1000);
}
