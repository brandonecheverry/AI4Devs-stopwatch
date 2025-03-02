/***********************************************
 * SPA Navigation
 ***********************************************/
const screenMenu         = document.getElementById('screen-menu');
const screenStopwatch    = document.getElementById('screen-stopwatch');
const screenTimerSetup   = document.getElementById('screen-timer-setup');
const screenTimerRun     = document.getElementById('screen-timer-run');

const btnStopwatch       = document.getElementById('btn-stopwatch');
const btnTimer           = document.getElementById('btn-timer');
const btnBack            = document.getElementById('btn-back');

// Show a particular screen and hide the others
function showScreen(screen) {
  // Hide all
  screenMenu.classList.add('hidden');
  screenStopwatch.classList.add('hidden');
  screenTimerSetup.classList.add('hidden');
  screenTimerRun.classList.add('hidden');

  // Show the requested one
  screen.classList.remove('hidden');
}

// Menu buttons
btnStopwatch.addEventListener('click', () => {
  resetStopwatch();
  showScreen(screenStopwatch);
});
btnTimer.addEventListener('click', () => {
  resetTimer();
  showScreen(screenTimerSetup);
});

// Back button always returns to menu (and resets everything)
btnBack.addEventListener('click', () => {
  stopAlarm();
  resetStopwatch();
  resetTimer();
  showScreen(screenMenu);
});

// By default, show menu
showScreen(screenMenu);

/***********************************************
 * Stopwatch
 ***********************************************/
let stopwatchInterval   = null;
let stopwatchRunning    = false;
let stopwatchStartTime  = 0;      // Timestamp when we last started
let stopwatchElapsed    = 0;      // Elapsed time in ms

const stopwatchDisplay  = document.getElementById('stopwatch-display');
const stopwatchMs       = document.getElementById('stopwatch-ms');
const btnSWStartPause   = document.getElementById('stopwatch-start-pause-btn');
const btnSWClear        = document.getElementById('stopwatch-clear-btn');

function updateStopwatchDisplay() {
  const now = Date.now();
  if (stopwatchRunning) {
    const diff = now - stopwatchStartTime;
    stopwatchElapsed += diff;
    stopwatchStartTime = now;
  }

  let totalMs = stopwatchElapsed;
  let hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;
  let minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;
  let seconds = Math.floor(totalMs / 1000);
  let msPart  = totalMs % 1000;

  let hStr = String(hours).padStart(2, '0');
  let mStr = String(minutes).padStart(2, '0');
  let sStr = String(seconds).padStart(2, '0');
  let msStr = String(msPart).padStart(3, '0');

  stopwatchDisplay.textContent = `${hStr}:${mStr}:${sStr}`;
  stopwatchMs.textContent      = `.${msStr}`;
}

function stopwatchTick() {
  if (stopwatchRunning) {
    updateStopwatchDisplay();
  }
}

btnSWStartPause.addEventListener('click', () => {
  if (!stopwatchRunning && stopwatchElapsed === 0) {
    startStopwatch();
  } else if (stopwatchRunning) {
    pauseStopwatch();
  } else {
    continueStopwatch();
  }
});

btnSWClear.addEventListener('click', () => {
  resetStopwatch();
});

function startStopwatch() {
  stopwatchRunning   = true;
  stopwatchStartTime = Date.now();
  btnSWStartPause.textContent = 'Pause';
  btnSWStartPause.classList.remove('bg-green-500', 'bg-blue-500');
  btnSWStartPause.classList.add('bg-red-500');
}

function pauseStopwatch() {
  updateStopwatchDisplay();
  stopwatchRunning = false;
  btnSWStartPause.textContent = 'Continue';
  btnSWStartPause.classList.remove('bg-red-500', 'bg-green-500');
  btnSWStartPause.classList.add('bg-blue-500');
}

function continueStopwatch() {
  stopwatchRunning   = true;
  stopwatchStartTime = Date.now();
  btnSWStartPause.textContent = 'Pause';
  btnSWStartPause.classList.remove('bg-blue-500', 'bg-green-500');
  btnSWStartPause.classList.add('bg-red-500');
}

function resetStopwatch() {
  stopwatchRunning   = false;
  stopwatchElapsed   = 0;
  stopwatchStartTime = 0;
  btnSWStartPause.textContent = 'Start';
  btnSWStartPause.classList.remove('bg-red-500', 'bg-blue-500');
  btnSWStartPause.classList.add('bg-green-500');
  updateStopwatchDisplay();
}

setInterval(stopwatchTick, 16);

/***********************************************
 * Timer
 ***********************************************/
const timerSetupDisplay   = document.getElementById('timer-setup-display');
const timerRunDisplay     = document.getElementById('timer-run-display');
const timerRunMs          = document.getElementById('timer-run-ms');

const digitButtons        = document.querySelectorAll('.timer-digit-btn');
const btnTimerSetupClear  = document.getElementById('timer-setup-clear');
const btnTimerSetupSet    = document.getElementById('timer-setup-set');

const btnTimerStartStop   = document.getElementById('timer-start-stop-btn');
const btnTimerClear       = document.getElementById('timer-clear-btn');

// The raw user input string (up to 6 digits) for timer setup
let timerInputString = '';
let timerSetMs       = 0;     // normalized total in ms after pressing Set
let timerRemainingMs = 0;     
let timerRunning     = false;
let timerInterval    = null;

// Update timer setup display WITHOUT normalizing the input.
// Just pad to 6 digits and insert colons.
function updateTimerSetupDisplay() {
  let padded = timerInputString.padStart(6, '0');
  timerSetupDisplay.textContent = padded.slice(0,2) + ":" + padded.slice(2,4) + ":" + padded.slice(4,6);
}

digitButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (timerInputString.length < 6) {
      timerInputString += btn.getAttribute('data-digit');
      updateTimerSetupDisplay();
    }
  });
});

btnTimerSetupClear.addEventListener('click', () => {
  timerInputString = '';
  updateTimerSetupDisplay();
});

// parseTimerInput now normalizes the input (overflow conversion)
function parseTimerInput(str) {
  let raw = str.padStart(6, '0');
  let hours   = parseInt(raw.slice(0, 2), 10);
  let minutes = parseInt(raw.slice(2, 4), 10);
  let seconds = parseInt(raw.slice(4, 6), 10);
  if (seconds >= 60) {
    let extraMin = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes += extraMin;
  }
  if (minutes >= 60) {
    let extraHr = Math.floor(minutes / 60);
    minutes = minutes % 60;
    hours += extraHr;
  }
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
}

btnTimerSetupSet.addEventListener('click', () => {
  const msVal = parseTimerInput(timerInputString);
  if (msVal <= 0) return; // ignore if time is zero
  timerSetMs = msVal;
  timerRemainingMs = msVal;
  showScreen(screenTimerRun);
  updateTimerRunDisplay(timerRemainingMs);
  btnTimerStartStop.textContent = 'Start';
  btnTimerStartStop.classList.remove('bg-red-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-green-500');
  timerRunning = false;
});

// Timer run screen update (show HH:MM:SS and milliseconds)
function updateTimerRunDisplay(ms) {
  let totalMs = Math.floor(ms);
  let hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;
  let minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;
  let seconds = Math.floor(totalMs / 1000);
  let msPart = totalMs % 1000;
  
  let hStr = String(hours).padStart(2, '0');
  let mStr = String(minutes).padStart(2, '0');
  let sStr = String(seconds).padStart(2, '0');
  let msStr = String(msPart).padStart(3, '0');
  
  timerRunDisplay.textContent = `${hStr}:${mStr}:${sStr}`;
  timerRunMs.textContent = `.${msStr}`;
}

btnTimerStartStop.addEventListener('click', () => {
  if (!timerRunning && timerRemainingMs === timerSetMs) {
    startTimer();
  } else if (timerRunning) {
    stopTimer();
  } else {
    continueTimer();
  }
});

btnTimerClear.addEventListener('click', () => {
  stopAlarm();
  timerRunning = false;
  timerRemainingMs = timerSetMs;
  updateTimerRunDisplay(timerRemainingMs);
  btnTimerStartStop.textContent = 'Start';
  btnTimerStartStop.classList.remove('bg-red-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-green-500');
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

function startTimer() {
  timerRunning = true;
  btnTimerStartStop.textContent = 'Stop';
  btnTimerStartStop.classList.remove('bg-green-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-red-500');

  timerInterval = setInterval(() => {
    if (timerRemainingMs <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRemainingMs = 0;
      updateTimerRunDisplay(0);
      playAlarm();
      return;
    }
    timerRemainingMs -= 1000/10;
    if (timerRemainingMs < 0) timerRemainingMs = 0;
    updateTimerRunDisplay(timerRemainingMs);
  }, 100);
}

function stopTimer() {
  timerRunning = false;
  btnTimerStartStop.textContent = 'Continue';
  btnTimerStartStop.classList.remove('bg-red-500', 'bg-green-500');
  btnTimerStartStop.classList.add('bg-blue-500');
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function continueTimer() {
  timerRunning = true;
  btnTimerStartStop.textContent = 'Stop';
  btnTimerStartStop.classList.remove('bg-blue-500', 'bg-green-500');
  btnTimerStartStop.classList.add('bg-red-500');

  timerInterval = setInterval(() => {
    if (timerRemainingMs <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRemainingMs = 0;
      updateTimerRunDisplay(0);
      playAlarm();
      return;
    }
    timerRemainingMs -= 1000/10;
    if (timerRemainingMs < 0) timerRemainingMs = 0;
    updateTimerRunDisplay(timerRemainingMs);
  }, 100);
}

function resetTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval    = null;
  timerInputString = '';
  timerSetMs       = 0;
  timerRemainingMs = 0;
  timerRunning     = false;
  updateTimerSetupDisplay();
  updateTimerRunDisplay(0);
  btnTimerStartStop.textContent = 'Start';
  btnTimerStartStop.classList.remove('bg-red-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-green-500');
}

/***********************************************
 * Alarm
 ***********************************************/
const alarmAudio = document.getElementById('alarm-audio');
let alarmTimeout = null;

function playAlarm() {
  stopAlarm();
  alarmAudio.currentTime = 0;
  alarmAudio.play().catch(() => {});
  alarmTimeout = setTimeout(() => {
    stopAlarm();
  }, 15000);
}

function stopAlarm() {
  if (!alarmAudio.paused) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alarmTimeout = null;
  }
}

document.body.addEventListener('click', (e) => {
  if (!alarmAudio.paused) {
    stopAlarm();
  }
}, true);
