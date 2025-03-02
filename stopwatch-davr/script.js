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
  // Stop any running intervals or alarms
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
  // Calculate total elapsed ms
  const now = Date.now();
  if (stopwatchRunning) {
    // Current elapsed = old offset + (now - startTime)
    const diff = now - stopwatchStartTime;
    stopwatchElapsed += diff;
    stopwatchStartTime = now; // reset start time
  }

  let totalMs = stopwatchElapsed;
  // hours
  let hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;
  // minutes
  let minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;
  // seconds
  let seconds = Math.floor(totalMs / 1000);
  let msPart  = totalMs % 1000;

  // Format
  let hStr = String(hours).padStart(2, '0');
  let mStr = String(minutes).padStart(2, '0');
  let sStr = String(seconds).padStart(2, '0');
  let msStr = String(msPart).padStart(3, '0');

  // Update DOM
  stopwatchDisplay.textContent = `${hStr}:${mStr}:${sStr}`;
  stopwatchMs.textContent      = `.${msStr}`;
}

// Repeatedly called ~60 times/sec
function stopwatchTick() {
  if (stopwatchRunning) {
    updateStopwatchDisplay();
  }
}

// Start / Pause / Continue button
btnSWStartPause.addEventListener('click', () => {
  if (!stopwatchRunning && stopwatchElapsed === 0) {
    // Currently not running, time = 0 => "Start"
    startStopwatch();
  } else if (stopwatchRunning) {
    // "Pause"
    pauseStopwatch();
  } else {
    // "Continue"
    continueStopwatch();
  }
});

// Clear button
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
  // First, update display once more
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
  stopwatchRunning  = false;
  stopwatchElapsed  = 0;
  stopwatchStartTime= 0;
  btnSWStartPause.textContent = 'Start';
  btnSWStartPause.classList.remove('bg-red-500', 'bg-blue-500');
  btnSWStartPause.classList.add('bg-green-500');
  updateStopwatchDisplay(); // show 00:00:00.000
}

// Kick off an interval to update the stopwatch ~60 fps
setInterval(stopwatchTick, 16);

/***********************************************
 * Timer
 ***********************************************/
const timerSetupDisplay   = document.getElementById('timer-setup-display');
const timerRunDisplay     = document.getElementById('timer-run-display');

const digitButtons        = document.querySelectorAll('.timer-digit-btn');
const btnTimerSetupClear  = document.getElementById('timer-setup-clear');
const btnTimerSetupSet    = document.getElementById('timer-setup-set');

const btnTimerStartStop   = document.getElementById('timer-start-stop-btn');
const btnTimerClear       = document.getElementById('timer-clear-btn');

// Internal timer states
let timerInputString = '';    // up to 6 digits
let timerSetMs       = 0;     // user-set total in ms
let timerRemainingMs = 0;     // current countdown in ms
let timerRunning     = false; // are we counting down?

let timerInterval    = null;  // setInterval handle

// Digit button handler
digitButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const digit = btn.getAttribute('data-digit');
    if (timerInputString.length < 6) {
      timerInputString += digit;
      updateTimerSetupDisplay();
    }
  });
});

// CLR button
btnTimerSetupClear.addEventListener('click', () => {
  timerInputString = '';
  updateTimerSetupDisplay();
});

// Set button
btnTimerSetupSet.addEventListener('click', () => {
  // Convert input to ms
  const msVal = parseTimerInput(timerInputString);
  if (msVal <= 0) {
    // No effect if total time is 0
    return;
  }
  // We have a valid time
  timerSetMs = msVal;
  timerRemainingMs = msVal;
  // Go to "run" screen
  showScreen(screenTimerRun);
  updateTimerRunDisplay(timerRemainingMs);
  // Initialize the button states
  btnTimerStartStop.textContent = 'Start';
  btnTimerStartStop.classList.remove('bg-red-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-green-500');
  timerRunning = false;
});

// Start/Stop/Continue for timer
btnTimerStartStop.addEventListener('click', () => {
  if (!timerRunning && timerRemainingMs === timerSetMs) {
    // Start
    startTimer();
  } else if (timerRunning) {
    // Stop (pause)
    stopTimer();
  } else {
    // Continue
    continueTimer();
  }
});

// Clear => revert to set time, stop alarm
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

// Parse the raw 0-6 digits into hours, minutes, seconds, then convert to ms
function parseTimerInput(str) {
  // For example: '1234' => '12:34' => 12m34s => 754,000ms
  // We'll interpret from right to left: last 2 digits => seconds, next 2 => minutes, remainder => hours
  // Then handle overflow (e.g. 1:90 => 2:30).
  // If > 6 digits typed, ignore extras (already enforced in code).
  // If user typed '999999' => 99:99:99 => 100:40:39 in HH:MM:SS
  let raw = str.padStart(6, '0'); // ensure 6 chars if shorter
  // But if the user typed fewer than 6, the left side is '0's. That’s okay.

  // Break into [HH, MM, SS] from the right
  let hours   = parseInt(raw.slice(0, 2), 10);  // first 2
  let minutes = parseInt(raw.slice(2, 4), 10);  // next 2
  let seconds = parseInt(raw.slice(4, 6), 10);  // last 2

  // Now handle overflow
  // E.g. if seconds >= 60, convert to minutes
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
  // Hours can be anything up to 99, plus overflow
  // If user typed 99:99:99 => hours=99, minutes=99, seconds=99 => hours=100, minutes=40, seconds=39

  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
}

// Show the timer setup display as HH:MM:SS
function updateTimerSetupDisplay() {
  let msVal = parseTimerInput(timerInputString);
  timerSetupDisplay.textContent = formatHHMMSS(msVal);
}

// Format ms into HH:MM:SS
function formatHHMMSS(ms) {
  if (ms <= 0) return '00:00:00';

  let totalSec = Math.floor(ms / 1000);
  let s = totalSec % 60;
  let m = Math.floor(totalSec / 60) % 60;
  let h = Math.floor(totalSec / 3600);

  let hStr = String(h).padStart(2, '0');
  let mStr = String(m).padStart(2, '0');
  let sStr = String(s).padStart(2, '0');
  return `${hStr}:${mStr}:${sStr}`;
}

// Timer run display
function updateTimerRunDisplay(ms) {
  timerRunDisplay.textContent = formatHHMMSS(ms);
}

// Start the countdown
function startTimer() {
  timerRunning = true;
  btnTimerStartStop.textContent = 'Stop';
  btnTimerStartStop.classList.remove('bg-green-500', 'bg-blue-500');
  btnTimerStartStop.classList.add('bg-red-500');

  timerInterval = setInterval(() => {
    if (timerRemainingMs <= 0) {
      // Timer done
      clearInterval(timerInterval);
      timerInterval = null;
      timerRemainingMs = 0;
      updateTimerRunDisplay(0);
      playAlarm();
      return;
    }
    timerRemainingMs -= 1000 / 10; // decrement in smaller steps for smoother transitions
    if (timerRemainingMs < 0) timerRemainingMs = 0;
    updateTimerRunDisplay(timerRemainingMs);
  }, 100); // update 10 times a second
}

// Stop (pause) the countdown
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

// Continue the countdown
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
    timerRemainingMs -= 1000 / 10;
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

// Play alarm for 15 seconds, or until user presses any button
function playAlarm() {
  stopAlarm(); // in case it's already playing
  alarmAudio.currentTime = 0;
  alarmAudio.play().catch(() => {
    // If the browser disallows autoplay, user must interact
  });
  alarmTimeout = setTimeout(() => {
    stopAlarm();
  }, 15000);
}

// Stop alarm
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

// Stop alarm on any button press (besides normal logic)
document.body.addEventListener('click', (e) => {
  // If user clicks a button, stop the alarm (only if it’s playing).
  // We don’t want to do it if the user is pressing "Set" with an empty time, etc.
  // But the requirement says "pressing any button" so let's keep it simple.
  if (!alarmAudio.paused) {
    stopAlarm();
  }
}, true);
