/********************************************************
 * Global Variables & State
 ********************************************************/
let currentPageIndex = 0; // 0=Home, 1=Stopwatch, 2=CountdownSetup, 3=CountdownWorking
const pagesWrapper = document.getElementById('pagesWrapper');

// ------------------- STOPWATCH -------------------
let stopwatchInterval = null;
let stopwatchRunning = false;
let stopwatchPaused = false;
let stopwatchTime = 0; // in milliseconds

// ------------------- COUNTDOWN -------------------
let countdownInterval = null;
let countdownRunning = false;
let countdownPaused = false;
let countdownOriginalTime = 0; // in milliseconds
let countdownTime = 0; // in milliseconds

// Raw string input for the countdown setup
let countdownInputString = ""; // up to 6 digits (HHMMSS) as typed

/********************************************************
 * Navigation
 ********************************************************/
function navigateTo(pageIndex) {
  currentPageIndex = pageIndex;
  pagesWrapper.style.transform = `translateX(-${pageIndex * 942}px)`;
}

/********************************************************
 * STOPWATCH FUNCTIONS
 ********************************************************/
function startStopwatch() {
  const startBtn = document.getElementById('stopwatchStartBtn');

  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchPaused = false;
    startBtn.textContent = 'Pause';
    startBtn.classList.remove('button-blue');
    startBtn.classList.add('button-green');

    stopwatchInterval = setInterval(() => {
      stopwatchTime += 10;
      updateStopwatchDisplay();
    }, 10);
  } else {
    pauseStopwatch();
  }
}

function pauseStopwatch() {
  stopwatchRunning = false;
  stopwatchPaused = true;
  clearInterval(stopwatchInterval);

  const startBtn = document.getElementById('stopwatchStartBtn');
  startBtn.textContent = 'Continue';
  startBtn.classList.remove('button-green');
  startBtn.classList.add('button-blue');
}

function continueStopwatch() {
  stopwatchRunning = true;
  stopwatchPaused = false;

  const startBtn = document.getElementById('stopwatchStartBtn');
  startBtn.textContent = 'Pause';
  startBtn.classList.remove('button-blue');
  startBtn.classList.add('button-green');

  stopwatchInterval = setInterval(() => {
    stopwatchTime += 10;
    updateStopwatchDisplay();
  }, 10);
}

function clearStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchRunning = false;
  stopwatchPaused = false;
  stopwatchTime = 0;

  const startBtn = document.getElementById('stopwatchStartBtn');
  startBtn.textContent = 'Start';
  startBtn.classList.remove('button-blue');
  startBtn.classList.add('button-green');

  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  let totalMs = stopwatchTime;
  let hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;
  let minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;
  let seconds = Math.floor(totalMs / 1000);
  let ms = totalMs % 1000;

  document.getElementById('stopwatchDisplay').textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById('stopwatchMs').textContent = String(ms).padStart(3, '0');
}

/********************************************************
 * COUNTDOWN FUNCTIONS (Working Page)
 ********************************************************/
function startCountdown() {
  const startBtn = document.getElementById('countdownStartBtn');

  if (!countdownRunning) {
    countdownRunning = true;
    countdownPaused = false;
    startBtn.textContent = 'Pause';
    startBtn.classList.remove('button-blue');
    startBtn.classList.add('button-green');

    countdownInterval = setInterval(() => {
      countdownTime -= 10;
      if (countdownTime <= 0) {
        countdownTime = 0;
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownRunning = false;
        countdownPaused = false;
        startBtn.textContent = 'Start';
        startBtn.classList.remove('button-blue');
        startBtn.classList.add('button-green');
      }
      updateCountdownDisplay();
    }, 10);
  } else {
    pauseCountdown();
  }
}

function pauseCountdown() {
  countdownRunning = false;
  countdownPaused = true;
  clearInterval(countdownInterval);

  const startBtn = document.getElementById('countdownStartBtn');
  startBtn.textContent = 'Continue';
  startBtn.classList.remove('button-green');
  startBtn.classList.add('button-blue');
}

function continueCountdown() {
  countdownRunning = true;
  countdownPaused = false;

  const startBtn = document.getElementById('countdownStartBtn');
  startBtn.textContent = 'Pause';
  startBtn.classList.remove('button-blue');
  startBtn.classList.add('button-green');

  countdownInterval = setInterval(() => {
    countdownTime -= 10;
    if (countdownTime <= 0) {
      countdownTime = 0;
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownRunning = false;
      countdownPaused = false;
      startBtn.textContent = 'Start';
      startBtn.classList.remove('button-blue');
      startBtn.classList.add('button-green');
    }
    updateCountdownDisplay();
  }, 10);
}

function resetCountdown() {
  countdownTime = countdownOriginalTime;
  updateCountdownDisplay();
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownRunning = false;
  countdownPaused = false;

  const startBtn = document.getElementById('countdownStartBtn');
  startBtn.textContent = 'Start';
  startBtn.classList.remove('button-blue');
  startBtn.classList.add('button-green');
}

function updateCountdownDisplay() {
  let totalMs = countdownTime;
  let hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;
  let minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;
  let seconds = Math.floor(totalMs / 1000);
  let ms = totalMs % 1000;

  document.getElementById('countdownDisplay').textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById('countdownMs').textContent = String(ms).padStart(3, '0');
}

/********************************************************
 * COUNTDOWN SETUP (NUMERIC PAD)
 ********************************************************/
function appendCountdownDigit(digit) {
  if (countdownInputString.length < 6) {
    countdownInputString += digit;
  } else {
    countdownInputString = countdownInputString.substring(1) + digit;
  }
  updateCountdownSetupDisplay();
}

function updateCountdownSetupDisplay() {
  let padded = countdownInputString.padStart(6, '0');
  let hh = padded.substring(0, 2);
  let mm = padded.substring(2, 4);
  let ss = padded.substring(4, 6);

  document.getElementById('countdownSetupDisplay').textContent = `${hh}:${mm}:${ss}`;
  document.getElementById('countdownSetupMs').textContent = '000';
}

function clearCountdownInput() {
  countdownInputString = "";
  updateCountdownSetupDisplay();
}

/********************************************************
 * Applying the Entered Time when "Set" is pressed
 ********************************************************/
function applyCountdownSetup() {
  let padded = countdownInputString.padStart(6, '0');
  let rawH = parseInt(padded.substring(0, 2), 10);
  let rawM = parseInt(padded.substring(2, 4), 10);
  let rawS = parseInt(padded.substring(4, 6), 10);

  let totalSeconds = rawH * 3600 + rawM * 60 + rawS;
  countdownOriginalTime = totalSeconds * 1000;
  countdownTime = countdownOriginalTime;

  updateCountdownDisplay();
  navigateTo(3);
}

/********************************************************
 * Event Listeners
 ********************************************************/
window.addEventListener('DOMContentLoaded', () => {
  // Home Page: Attach click events for the new split-screen halves
  document.getElementById('homeStopwatch').addEventListener('click', () => {
    navigateTo(1);
  });
  document.getElementById('homeCountdown').addEventListener('click', () => {
    navigateTo(2);
  });

  // STOPWATCH PAGE
  document.getElementById('stopwatchStartBtn').addEventListener('click', () => {
    if (!stopwatchRunning && !stopwatchPaused) {
      startStopwatch();
    } else if (stopwatchRunning && !stopwatchPaused) {
      pauseStopwatch();
    } else if (!stopwatchRunning && stopwatchPaused) {
      continueStopwatch();
    }
  });
  document.getElementById('stopwatchClearBtn').addEventListener('click', clearStopwatch);

  // COUNTDOWN SETUP PAGE
  document.querySelectorAll('.numeric-pad .num-button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const digit = btn.getAttribute('data-value');
      appendCountdownDigit(digit);
    });
  });
  document.getElementById('countdownClearBtn').addEventListener('click', clearCountdownInput);
  document.getElementById('countdownSetBtn').addEventListener('click', applyCountdownSetup);

  // COUNTDOWN WORKING PAGE
  document.getElementById('countdownStartBtn').addEventListener('click', () => {
    if (!countdownRunning && !countdownPaused) {
      startCountdown();
    } else if (countdownRunning && !countdownPaused) {
      pauseCountdown();
    } else if (!countdownRunning && countdownPaused) {
      continueCountdown();
    }
  });
  document.getElementById('countdownResetBtn').addEventListener('click', resetCountdown);

  // Back buttons
  document.getElementById('backFromStopwatch').addEventListener('click', () => {
    navigateTo(0);
  });
  document.getElementById('backFromSetup').addEventListener('click', () => {
    navigateTo(0);
  });
  document.getElementById('backFromWorking').addEventListener('click', () => {
    navigateTo(0);
  });

  // Initialize displays
  updateStopwatchDisplay();
  updateCountdownSetupDisplay();
  updateCountdownDisplay();
});

