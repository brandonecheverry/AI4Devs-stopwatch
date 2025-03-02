// script.js

console.log("Script loaded successfully!");

// View Elements
const modeSelection = document.getElementById("mode-selection");
const stopwatchView = document.getElementById("stopwatch-view");
const countdownView = document.getElementById("countdown-view");

// Mode selection buttons
const stopwatchButton = document.getElementById("stopwatch-button");
const countdownButton = document.getElementById("countdown-button");

// Back buttons
const backToMainFromStopwatch = document.getElementById(
  "back-to-main-from-stopwatch"
);
const backToMainFromCountdown = document.getElementById(
  "back-to-main-from-countdown"
);

// Stopwatch view elements
const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchStartPauseButton = document.getElementById(
  "stopwatch-start-pause"
);
const stopwatchClearButton = document.getElementById("stopwatch-clear");

// Stopwatch variables
let stopwatchInterval = null;
let stopwatchStartTime = null;
let stopwatchElapsedTime = 0; // in milliseconds

// Format milliseconds into hh:mm:ss
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

// Update the stopwatch display
function updateStopwatch() {
  const currentTime = Date.now();
  const elapsed = currentTime - stopwatchStartTime + stopwatchElapsedTime;
  stopwatchDisplay.textContent = formatTime(elapsed);
}

// Event handler for start/pause/continue button
stopwatchStartPauseButton.addEventListener("click", () => {
  if (!stopwatchInterval) {
    // Start or continue the stopwatch
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    stopwatchStartPauseButton.textContent = "Pause";
  } else {
    // Pause the stopwatch
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchElapsedTime += Date.now() - stopwatchStartTime;
    stopwatchStartPauseButton.textContent = "Continue";
  }
});

// Event handler for clear button
stopwatchClearButton.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchStartTime = null;
  stopwatchElapsedTime = 0;
  stopwatchDisplay.textContent = "00:00:00";
  stopwatchStartPauseButton.textContent = "Start";
});

// Navigation logic for showing views

// Show stopwatch view
stopwatchButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
});

// Show countdown view (placeholder for Task 4)
countdownButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  stopwatchView.classList.add("hidden");
  countdownView.classList.remove("hidden");
});

// Back from stopwatch view to main mode selection
backToMainFromStopwatch.addEventListener("click", () => {
  // Reset stopwatch when leaving view
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchStartTime = null;
  stopwatchElapsedTime = 0;
  stopwatchDisplay.textContent = "00:00:00";
  stopwatchStartPauseButton.textContent = "Start";
  stopwatchView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});

// Back from countdown view to main mode selection
backToMainFromCountdown.addEventListener("click", () => {
  countdownView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});
