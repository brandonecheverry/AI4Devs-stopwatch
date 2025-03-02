// script.js

console.log("Script loaded successfully!");

// Get references to DOM elements
const modeSelection = document.getElementById("mode-selection");
const stopwatchView = document.getElementById("stopwatch-view");
const countdownView = document.getElementById("countdown-view");

const stopwatchButton = document.getElementById("stopwatch-button");
const countdownButton = document.getElementById("countdown-button");

const backToMainFromStopwatch = document.getElementById(
  "back-to-main-from-stopwatch"
);
const backToMainFromCountdown = document.getElementById(
  "back-to-main-from-countdown"
);

// Show stopwatch view, hide others
stopwatchButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
});

// Show countdown view, hide others
countdownButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  stopwatchView.classList.add("hidden");
  countdownView.classList.remove("hidden");
});

// Back button from stopwatch to main
backToMainFromStopwatch.addEventListener("click", () => {
  stopwatchView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});

// Back button from countdown to main
backToMainFromCountdown.addEventListener("click", () => {
  countdownView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});
