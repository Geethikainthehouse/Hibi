let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;
let cycleCount = 0;
let isWorkPhase = true;

const timerDisplay = document.getElementById("timer");
const phaseTitle = document.getElementById("phaseTitle");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

// Button Events
startButton.addEventListener("click", () => {
  if (!isRunning) startTimer();
});

pauseButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  cycleCount = 0;
  isWorkPhase = true;
  phaseTitle.textContent = "Work";
  updateTimerDisplay();
});

// Core Timer Function
function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        handlePhaseEnd();
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `${format(minutes)}:${format(seconds)}`;
}

function format(n) {
  return n < 10 ? `0${n}` : n;
}

function handlePhaseEnd() {
  clearInterval(timer);
  isRunning = false;
  playSound();

  if (isWorkPhase) {
    cycleCount++;
    if (cycleCount % 4 === 0) {
      minutes = 15;
      phaseTitle.textContent = "Long Break";
    } else {
      minutes = 5;
      phaseTitle.textContent = "Break";
    }
  } else {
    minutes = 25;
    phaseTitle.textContent = "Work";
  }

  seconds = 0;
  isWorkPhase = !isWorkPhase;
  updateTimerDisplay();
  startTimer(); // Automatically continue
}

// Plays a 3-second sound
function playSound() {
  const audio = new Audio('assets/css/break-end.mp3'); // Your audio file here
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 3000); // 3 seconds
}

// Toggle background gallery
function toggleBgMenu() {
  const menu = document.getElementById('bg-menu');
  menu.style.display = menu.style.display === 'grid' ? 'none' : 'grid';
}

// Change background from gallery
function changeBackground(imagePath) {
  const isDataUrl = imagePath.startsWith("data:");
  const fullPath = isDataUrl ? imagePath : `assets/css/${imagePath}`;

  document.body.style.background = `url('${fullPath}') no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';
  toggleBgMenu(); // hide the menu after selecting
}

// Handle custom image upload
function handleCustomImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;
    changeBackground(imageUrl); // Use the data URL as background
  };
  reader.readAsDataURL(file);
}

// Attach upload listener
document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("upload-bg");
  if (uploadInput) {
    uploadInput.addEventListener("change", handleCustomBgUpload);
  }
});

