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

// --------------- COUNTDOWN SETUP (NUMERIC PAD) ELEMENTS & VARIABLES ---------------
const countdownInputDisplay = document.getElementById(
  "countdown-input-display"
);
const countdownNumpad = document.getElementById("countdown-numpad");
const countdownSetButton = document.getElementById("countdown-set");
const countdownClearButton = document.getElementById("countdown-clear");

// We'll store up to 6 digits in the order they were entered
let countdownDigits = [];

// --------------- COUNTDOWN ACTIVE MODE VARIABLES ---------------
let isCountdownMode = false;
let countdownRemainingTime = 0; // remaining time in ms
let initialCountdownTime = 0; // originally set time in ms
let countdownStartTime = null; // when countdown last started

// --------------- TIME FORMATTING FUNCTIONS ---------------
function pad(num) {
  return num.toString().padStart(2, "0");
}

function padMilliseconds(num) {
  return num.toString().padStart(3, "0");
}

// Format milliseconds into hh:mm:ss.mmm (returns a string with a span for ms)
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

// --------------- STOPWATCH UPDATE (Counting Up) ---------------
function updateStopwatch() {
  const currentTime = Date.now();
  const elapsed = currentTime - stopwatchStartTime + stopwatchElapsedTime;
  stopwatchDisplay.innerHTML = formatTime(elapsed);
}

// --------------- COUNTDOWN UPDATE (Counting Down) ---------------
function updateCountdown() {
  const elapsed = Date.now() - countdownStartTime;
  let newRemaining = countdownRemainingTime - elapsed;
  if (newRemaining <= 0) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    newRemaining = 0;
    stopwatchStartPauseButton.textContent = "Start";
    // Optionally, you could disable the start button or add an alert here.
  }
  stopwatchDisplay.innerHTML = formatTime(newRemaining);
}

// --------------- STOPWATCH / COUNTDOWN START-PAUSE BUTTON HANDLER ---------------
stopwatchStartPauseButton.addEventListener("click", () => {
  if (isCountdownMode) {
    // Countdown mode logic:
    if (!stopwatchInterval) {
      // Start or resume countdown
      countdownStartTime = Date.now();
      stopwatchInterval = setInterval(updateCountdown, 50);
      stopwatchStartPauseButton.textContent = "Pause";
    } else {
      // Pause countdown: update remaining time and clear interval
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      const elapsed = Date.now() - countdownStartTime;
      countdownRemainingTime = countdownRemainingTime - elapsed;
      stopwatchStartPauseButton.textContent = "Continue";
    }
  } else {
    // Regular stopwatch mode logic:
    if (!stopwatchInterval) {
      stopwatchStartTime = Date.now();
      stopwatchInterval = setInterval(updateStopwatch, 50);
      stopwatchStartPauseButton.textContent = "Pause";
    } else {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      stopwatchElapsedTime += Date.now() - stopwatchStartTime;
      stopwatchStartPauseButton.textContent = "Continue";
    }
  }
});

// --------------- STOPWATCH / COUNTDOWN CLEAR BUTTON HANDLER ---------------
stopwatchClearButton.addEventListener("click", () => {
  if (isCountdownMode) {
    // Reset countdown to the originally set time
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    countdownRemainingTime = initialCountdownTime;
    stopwatchDisplay.innerHTML = formatTime(countdownRemainingTime);
    stopwatchStartPauseButton.textContent = "Start";
  } else {
    // Reset regular stopwatch
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchStartTime = null;
    stopwatchElapsedTime = 0;
    stopwatchDisplay.innerHTML =
      '00:00:00.<span class="milliseconds">000</span>';
    stopwatchStartPauseButton.textContent = "Start";
  }
});

// --------------- COUNTDOWN NUMERIC PAD FUNCTIONS ---------------
// Interpreting digits: reverse order so that first digit becomes the rightmost
function getTimeFromDigits(digits) {
  const rev = digits.slice().reverse();
  const s1 = rev[0] || 0; // seconds ones
  const s2 = rev[1] || 0; // seconds tens
  const m1 = rev[2] || 0; // minutes ones
  const m2 = rev[3] || 0; // minutes tens
  const h1 = rev[4] || 0; // hours ones
  const h2 = rev[5] || 0; // hours tens

  const hours = h2 * 10 + h1;
  const minutes = m2 * 10 + m1;
  const seconds = s2 * 10 + s1;
  return { hours, minutes, seconds };
}

function formatHHMMSS(h, m, s) {
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function updateCountdownDisplay() {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  countdownInputDisplay.textContent = formatHHMMSS(hours, minutes, seconds);
}

// --------------- COUNTDOWN NUMERIC PAD EVENT LISTENER ---------------
countdownNumpad.addEventListener("click", (e) => {
  if (e.target.classList.contains("numpad-digit")) {
    const digit = e.target.dataset.digit;
    if (countdownDigits.length < 6) {
      countdownDigits.push(Number(digit));
      updateCountdownDisplay();
    }
  }
});

// --------------- COUNTDOWN SETUP CLEAR BUTTON ---------------
countdownClearButton.addEventListener("click", () => {
  countdownDigits = [];
  updateCountdownDisplay(); // Will show 00:00:00
});

// --------------- COUNTDOWN SETUP SET BUTTON ---------------
countdownSetButton.addEventListener("click", () => {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  // Calculate total milliseconds
  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
  if (totalMs <= 0) {
    alert("Please set a time greater than zero.");
    return;
  }
  // Prepare countdown mode variables
  isCountdownMode = true;
  countdownRemainingTime = totalMs;
  initialCountdownTime = totalMs;
  console.log(`Countdown set to: ${hours}h ${minutes}m ${seconds}s`);
  // Switch to the stopwatch view to serve as the countdown active interface
  countdownDigits = []; // reset numeric pad digits
  updateCountdownDisplay(); // (so that if user goes back, it resets)
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
  // Set the display to the countdown time and reset the button text
  stopwatchDisplay.innerHTML = formatTime(countdownRemainingTime);
  stopwatchStartPauseButton.textContent = "Start";
});

// --------------- NAVIGATION LOGIC ---------------
stopwatchButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
  // Ensure we are in regular stopwatch mode when coming from main
  isCountdownMode = false;
});

countdownButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  stopwatchView.classList.add("hidden");
  countdownView.classList.remove("hidden");
});

// Back from stopwatch view to main
backToMainFromStopwatch.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  if (isCountdownMode) {
    // Reset countdown-specific variables
    isCountdownMode = false;
    countdownRemainingTime = 0;
    initialCountdownTime = 0;
    countdownStartTime = null;
  } else {
    stopwatchElapsedTime = 0;
  }
  stopwatchStartTime = null;
  stopwatchDisplay.innerHTML = '00:00:00.<span class="milliseconds">000</span>';
  stopwatchStartPauseButton.textContent = "Start";
  stopwatchView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});

// Back from countdown setup view to main
backToMainFromCountdown.addEventListener("click", () => {
  countdownDigits = [];
  updateCountdownDisplay();
  countdownView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});
