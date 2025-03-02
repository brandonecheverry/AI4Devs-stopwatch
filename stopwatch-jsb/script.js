// script.js

console.log("Script loaded successfully!");

// --------------- VIEW ELEMENTS ---------------
const modeSelection = document.getElementById("mode-selection");
const stopwatchView = document.getElementById("stopwatch-view");
const countdownView = document.getElementById("countdown-view");

// --------------- MODE SELECTION BUTTONS ---------------
const stopwatchButton = document.getElementById("stopwatch-button");
const countdownButton = document.getElementById("countdown-button");

// --------------- BACK BUTTONS ---------------
const backToMainFromStopwatch = document.getElementById(
  "back-to-main-from-stopwatch"
);
const backToMainFromCountdown = document.getElementById(
  "back-to-main-from-countdown"
);

// --------------- STOPWATCH ELEMENTS & VARIABLES ---------------
const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchStartPauseButton = document.getElementById(
  "stopwatch-start-pause"
);
const stopwatchClearButton = document.getElementById("stopwatch-clear");

let stopwatchInterval = null;
let stopwatchStartTime = null;
let stopwatchElapsedTime = 0; // in ms

// --------------- COUNTDOWN ELEMENTS & VARIABLES ---------------
const countdownInputDisplay = document.getElementById(
  "countdown-input-display"
);
const countdownNumpad = document.getElementById("countdown-numpad");
const countdownSetButton = document.getElementById("countdown-set");
const countdownClearButton = document.getElementById("countdown-clear");

// We'll store up to 6 digits in the order: [S1, S2, M1, M2, H1, H2]
let countdownDigits = [];

// --------------- STOPWATCH FUNCTIONS ---------------

// Format milliseconds into hh:mm:ss.mmm
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return `${pad(hours)}:${pad(minutes)}:${pad(
    seconds
  )}.<span class="milliseconds">${padMilliseconds(milliseconds)}</span>`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}
function padMilliseconds(num) {
  return num.toString().padStart(3, "0");
}

// Update the stopwatch display
function updateStopwatch() {
  const currentTime = Date.now();
  const elapsed = currentTime - stopwatchStartTime + stopwatchElapsedTime;
  stopwatchDisplay.innerHTML = formatTime(elapsed);
}

// --------------- STOPWATCH EVENT LISTENERS ---------------
stopwatchStartPauseButton.addEventListener("click", () => {
  if (!stopwatchInterval) {
    // Start or resume the stopwatch
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 50);
    stopwatchStartPauseButton.textContent = "Pause";
  } else {
    // Pause
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchElapsedTime += Date.now() - stopwatchStartTime;
    stopwatchStartPauseButton.textContent = "Continue";
  }
});

stopwatchClearButton.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchStartTime = null;
  stopwatchElapsedTime = 0;
  stopwatchDisplay.innerHTML = '00:00:00.<span class="milliseconds">000</span>';
  stopwatchStartPauseButton.textContent = "Start";
});

// --------------- COUNTDOWN NUMERIC PAD FUNCTIONS ---------------

// Given up to 6 digits [S1, S2, M1, M2, H1, H2], return {hours, minutes, seconds}
function getTimeFromDigits(digits) {
  // If array is shorter than 6, missing digits are 0
  const s1 = digits[0] || 0; // ones of seconds
  const s2 = digits[1] || 0; // tens of seconds
  const m1 = digits[2] || 0; // ones of minutes
  const m2 = digits[3] || 0; // tens of minutes
  const h1 = digits[4] || 0; // ones of hours
  const h2 = digits[5] || 0; // tens of hours

  const hours = h2 * 10 + h1;
  const minutes = m2 * 10 + m1;
  const seconds = s2 * 10 + s1;
  return { hours, minutes, seconds };
}

// Format hh:mm:ss from numeric values
function formatHHMMSS(h, m, s) {
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// Update the display showing the user’s input
function updateCountdownDisplay() {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  countdownInputDisplay.textContent = formatHHMMSS(hours, minutes, seconds);
}

// --------------- COUNTDOWN EVENT LISTENERS ---------------

// Handle clicks on the numeric pad
countdownNumpad.addEventListener("click", (e) => {
  // If the clicked element has class "numpad-digit"
  if (e.target.classList.contains("numpad-digit")) {
    const digit = e.target.dataset.digit;
    // Only accept new digit if we have < 6 digits
    if (countdownDigits.length < 6) {
      countdownDigits.push(Number(digit));
      updateCountdownDisplay();
    }
  }
});

// Clear button resets the input
countdownClearButton.addEventListener("click", () => {
  countdownDigits = [];
  updateCountdownDisplay(); // will show 00:00:00
});

// Set button: for now, just log the chosen time
countdownSetButton.addEventListener("click", () => {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  console.log(`Time set to: ${hours}h ${minutes}m ${seconds}s`);
  // In Task 5, we'll switch to the "countdown active" view and start the countdown
});

// --------------- NAVIGATION LOGIC ---------------
stopwatchButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
});

countdownButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  stopwatchView.classList.add("hidden");
  countdownView.classList.remove("hidden");
});

// Back from stopwatch
backToMainFromStopwatch.addEventListener("click", () => {
  // Reset stopwatch
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchStartTime = null;
  stopwatchElapsedTime = 0;
  stopwatchDisplay.innerHTML = '00:00:00.<span class="milliseconds">000</span>';
  stopwatchStartPauseButton.textContent = "Start";

  stopwatchView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});

// Back from countdown
backToMainFromCountdown.addEventListener("click", () => {
  // Reset numeric pad
  countdownDigits = [];
  updateCountdownDisplay();

  countdownView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});
