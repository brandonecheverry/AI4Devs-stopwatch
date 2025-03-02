// script.js

console.log("Script loaded successfully!");

// --------------- VIEW ELEMENTS ---------------
// References to the main view containers
const modeSelection = document.getElementById("mode-selection");
const stopwatchView = document.getElementById("stopwatch-view");
const countdownView = document.getElementById("countdown-view");

// --------------- MODE SELECTION BUTTONS ---------------
// References to buttons that switch modes
const stopwatchButton = document.getElementById("stopwatch-button");
const countdownButton = document.getElementById("countdown-button");

// --------------- BACK BUTTONS ---------------
// References to Back buttons in each view
const backToMainFromStopwatch = document.getElementById(
  "back-to-main-from-stopwatch"
);
const backToMainFromCountdown = document.getElementById(
  "back-to-main-from-countdown"
);

// --------------- STOPWATCH ELEMENTS & VARIABLES ---------------
// References to stopwatch display and control buttons
const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchStartPauseButton = document.getElementById(
  "stopwatch-start-pause"
);
const stopwatchClearButton = document.getElementById("stopwatch-clear");

// Variables to track stopwatch state
let stopwatchInterval = null;
let stopwatchStartTime = null;
let stopwatchElapsedTime = 0; // in milliseconds

// --------------- COUNTDOWN SETUP (NUMERIC PAD) ELEMENTS & VARIABLES ---------------
// References for countdown numeric pad input and control buttons
const countdownInputDisplay = document.getElementById(
  "countdown-input-display"
);
const countdownNumpad = document.getElementById("countdown-numpad");
const countdownSetButton = document.getElementById("countdown-set");
const countdownClearButton = document.getElementById("countdown-clear");

// Array to store up to 6 digits entered by the user
let countdownDigits = [];

// --------------- COUNTDOWN ACTIVE MODE VARIABLES ---------------
// Variables to handle the active countdown timer state
let isCountdownMode = false;
let countdownRemainingTime = 0; // remaining time in milliseconds
let initialCountdownTime = 0; // originally set countdown time in milliseconds
let countdownStartTime = null; // timestamp when countdown last started

// --------------- TIME FORMATTING FUNCTIONS ---------------
// Pads a number with leading zeros to ensure 2 digits
function pad(num) {
  return num.toString().padStart(2, "0");
}

// Pads milliseconds with leading zeros to ensure 3 digits
function padMilliseconds(num) {
  return num.toString().padStart(3, "0");
}

// Formats a time (in ms) into hh:mm:ss.mmm format with inline milliseconds span
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
// Updates the stopwatch display while counting up
function updateStopwatch() {
  const currentTime = Date.now();
  const elapsed = currentTime - stopwatchStartTime + stopwatchElapsedTime;
  stopwatchDisplay.innerHTML = formatTime(elapsed);
}

// --------------- COUNTDOWN UPDATE (Counting Down) ---------------
// Updates the countdown display while counting down
function updateCountdown() {
  const elapsed = Date.now() - countdownStartTime;
  let newRemaining = countdownRemainingTime - elapsed;
  if (newRemaining <= 0) {
    // When countdown finishes, clear the interval and set time to zero
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    newRemaining = 0;
    stopwatchStartPauseButton.textContent = "Start";
  }
  stopwatchDisplay.innerHTML = formatTime(newRemaining);
}

// --------------- STOPWATCH / COUNTDOWN START-PAUSE HANDLER ---------------
// Handles Start, Pause, and Continue actions for both stopwatch and countdown modes
stopwatchStartPauseButton.addEventListener("click", () => {
  if (isCountdownMode) {
    // Countdown mode logic
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
      countdownRemainingTime -= elapsed;
      stopwatchStartPauseButton.textContent = "Continue";
    }
  } else {
    // Regular stopwatch mode logic
    if (!stopwatchInterval) {
      // Start or resume stopwatch
      stopwatchStartTime = Date.now();
      stopwatchInterval = setInterval(updateStopwatch, 50);
      stopwatchStartPauseButton.textContent = "Pause";
    } else {
      // Pause stopwatch: update elapsed time and clear interval
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      stopwatchElapsedTime += Date.now() - stopwatchStartTime;
      stopwatchStartPauseButton.textContent = "Continue";
    }
  }
});

// --------------- STOPWATCH / COUNTDOWN CLEAR HANDLER ---------------
// Resets the timer based on the current mode (stopwatch or countdown)
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
// Converts the digits array (entered in order) to a time object, reversing the array so the first entered digit becomes the rightmost
function getTimeFromDigits(digits) {
  const rev = digits.slice().reverse();
  const s1 = rev[0] || 0; // ones place for seconds
  const s2 = rev[1] || 0; // tens place for seconds
  const m1 = rev[2] || 0; // ones place for minutes
  const m2 = rev[3] || 0; // tens place for minutes
  const h1 = rev[4] || 0; // ones place for hours
  const h2 = rev[5] || 0; // tens place for hours
  const hours = h2 * 10 + h1;
  const minutes = m2 * 10 + m1;
  const seconds = s2 * 10 + s1;
  return { hours, minutes, seconds };
}

// Formats hours, minutes, and seconds into hh:mm:ss format
function formatHHMMSS(h, m, s) {
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// Updates the numeric pad input display with the current time input
function updateCountdownDisplay() {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  countdownInputDisplay.textContent = formatHHMMSS(hours, minutes, seconds);
}

// --------------- COUNTDOWN NUMERIC PAD EVENT LISTENER ---------------
// Listens for clicks on the numeric pad digits and updates the countdown input
countdownNumpad.addEventListener("click", (e) => {
  if (e.target.classList.contains("numpad-digit")) {
    const digit = e.target.dataset.digit;
    // Only allow up to 6 digits
    if (countdownDigits.length < 6) {
      countdownDigits.push(Number(digit));
      updateCountdownDisplay();
    }
  }
});

// --------------- COUNTDOWN SETUP CLEAR BUTTON ---------------
// Clears the numeric pad input and resets the display to 00:00:00
countdownClearButton.addEventListener("click", () => {
  countdownDigits = [];
  updateCountdownDisplay();
});

// --------------- COUNTDOWN SETUP SET BUTTON ---------------
// When the user presses "Set", convert the digits to total milliseconds and initialize countdown mode
countdownSetButton.addEventListener("click", () => {
  const { hours, minutes, seconds } = getTimeFromDigits(countdownDigits);
  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
  if (totalMs <= 0) {
    alert("Please set a time greater than zero.");
    return;
  }
  // Initialize countdown mode variables
  isCountdownMode = true;
  countdownRemainingTime = totalMs;
  initialCountdownTime = totalMs;
  countdownDigits = []; // Reset the numeric pad input
  updateCountdownDisplay();
  // Switch to the active countdown view (using the stopwatch view)
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
  stopwatchDisplay.innerHTML = formatTime(countdownRemainingTime);
  stopwatchStartPauseButton.textContent = "Start";
});

// --------------- NAVIGATION LOGIC ---------------
// Navigation: switching between main mode selection, stopwatch, and countdown views

// From mode selection to Stopwatch view
stopwatchButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  countdownView.classList.add("hidden");
  stopwatchView.classList.remove("hidden");
  // Ensure we start in regular stopwatch mode
  isCountdownMode = false;
});

// From mode selection to Countdown setup view
countdownButton.addEventListener("click", () => {
  modeSelection.classList.add("hidden");
  stopwatchView.classList.add("hidden");
  countdownView.classList.remove("hidden");
});

// Back button in Stopwatch view
backToMainFromStopwatch.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  if (isCountdownMode) {
    // In active countdown mode, return to the countdown setup view
    isCountdownMode = false;
    countdownRemainingTime = 0;
    initialCountdownTime = 0;
    countdownStartTime = null;
    stopwatchDisplay.innerHTML =
      '00:00:00.<span class="milliseconds">000</span>';
    stopwatchStartPauseButton.textContent = "Start";
    stopwatchView.classList.add("hidden");
    countdownView.classList.remove("hidden");
  } else {
    // In regular stopwatch mode, reset and return to main mode selection
    stopwatchStartTime = null;
    stopwatchElapsedTime = 0;
    stopwatchDisplay.innerHTML =
      '00:00:00.<span class="milliseconds">000</span>';
    stopwatchStartPauseButton.textContent = "Start";
    stopwatchView.classList.add("hidden");
    modeSelection.classList.remove("hidden");
  }
});

// Back button in Countdown setup view
backToMainFromCountdown.addEventListener("click", () => {
  countdownDigits = [];
  updateCountdownDisplay();
  countdownView.classList.add("hidden");
  modeSelection.classList.remove("hidden");
});
