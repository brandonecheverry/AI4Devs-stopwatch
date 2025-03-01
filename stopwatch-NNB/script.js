// Timer class for handling both stopwatch and countdown functionality
class Timer {
    constructor(type) {
        this.type = type; // 'stopwatch' or 'countdown'
        this.initialTimer = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
        this.currentTimer = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
        this.tempInitialTimer = [];
        this.intervalId = null;
        this.running = false;
        this.alarmTimeout = null;
    }

    // Start the timer
    start() {
        if (this.running) return;
        
        const startTime = Date.now();
        const initialMilliseconds = this.timeToMilliseconds(this.currentTimer);
        
        this.intervalId = setInterval(() => {
            const elapsedMilliseconds = Date.now() - startTime;
            
            // Calculate new time based on timer type
            let newTimeMs;
            if (this.type === 'stopwatch') {
                newTimeMs = initialMilliseconds + elapsedMilliseconds;
            } else { // countdown
                newTimeMs = initialMilliseconds - elapsedMilliseconds;
                
                // Stop if countdown reaches zero or goes negative
                if (newTimeMs <= 0) {
                    newTimeMs = 0;
                    this.pause();
                    this.playAlarm();
                }
            }
            
            this.currentTimer = this.millisecondsToTime(newTimeMs);
            this.updateDisplay();
        }, 10); // Update approximately every 10ms for smoother display
        
        this.running = true;
    }

    // Pause the timer
    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.running = false;
        }
    }

    // Continue the timer
    continue() {
        this.start();
    }

    // Clear the timer, reset to initial value
    clear() {
        this.pause();
        this.currentTimer = { ...this.initialTimer };
        this.updateDisplay();
        
        // Clear alarm if it's playing
        if (this.alarmTimeout) {
            clearTimeout(this.alarmTimeout);
            this.alarmTimeout = null;
            document.querySelector('.timer-display').classList.remove('alarm');
        }
    }

    // Set initial timer (for countdown)
    setInitialTimer() {
        // Parse the temp timer array into a proper time object
        let hours = 0, minutes = 0, seconds = 0;
        
        // Process based on how many digits were entered
        if (this.tempInitialTimer.length <= 2) {
            // Only seconds
            seconds = parseInt(this.tempInitialTimer.join(''));
        } else if (this.tempInitialTimer.length <= 4) {
            // Minutes and seconds
            minutes = parseInt(this.tempInitialTimer.slice(0, -2).join(''));
            seconds = parseInt(this.tempInitialTimer.slice(-2).join(''));
        } else {
            // Hours, minutes, and seconds
            hours = parseInt(this.tempInitialTimer.slice(0, -4).join(''));
            minutes = parseInt(this.tempInitialTimer.slice(-4, -2).join(''));
            seconds = parseInt(this.tempInitialTimer.slice(-2).join(''));
        }
        
        this.initialTimer = { hours, minutes, seconds, milliseconds: 0 };
        this.currentTimer = { ...this.initialTimer };
        this.updateDisplay();
    }

    // Add a digit to temp initial timer
    addDigit(digit) {
        if (this.tempInitialTimer.length < 6) { // Limit to 6 digits (HH:MM:SS)
            this.tempInitialTimer.push(digit);
            this.updateTempDisplay();
        }
    }

    // Clear temp initial timer
    clearTempTimer() {
        this.tempInitialTimer = [];
        this.updateTempDisplay();
    }

    // Update the display based on tempInitialTimer array
    updateTempDisplay() {
        let displayHours = '00';
        let displayMinutes = '00';
        let displaySeconds = '00';
        
        if (this.tempInitialTimer.length <= 2) {
            // Only seconds
            displaySeconds = this.tempInitialTimer.join('').padStart(2, '0');
        } else if (this.tempInitialTimer.length <= 4) {
            // Minutes and seconds
            displayMinutes = this.tempInitialTimer.slice(0, -2).join('').padStart(2, '0');
            displaySeconds = this.tempInitialTimer.slice(-2).join('').padStart(2, '0');
        } else {
            // Hours, minutes, and seconds
            displayHours = this.tempInitialTimer.slice(0, -4).join('').padStart(2, '0');
            displayMinutes = this.tempInitialTimer.slice(-4, -2).join('').padStart(2, '0');
            displaySeconds = this.tempInitialTimer.slice(-2).join('').padStart(2, '0');
        }
        
        const prefix = this.type === 'stopwatch' ? 'stopwatch' : 'countdown';
        document.getElementById(`${prefix}-hours`).textContent = displayHours;
        document.getElementById(`${prefix}-minutes`).textContent = displayMinutes;
        document.getElementById(`${prefix}-seconds`).textContent = displaySeconds;
        document.getElementById(`${prefix}-milliseconds`).textContent = '000';
    }

    // Update the display with current timer value
    updateDisplay() {
        const prefix = this.type === 'stopwatch' ? 'stopwatch' : 'countdown';
        document.getElementById(`${prefix}-hours`).textContent = this.padNumber(this.currentTimer.hours, 2);
        document.getElementById(`${prefix}-minutes`).textContent = this.padNumber(this.currentTimer.minutes, 2);
        document.getElementById(`${prefix}-seconds`).textContent = this.padNumber(this.currentTimer.seconds, 2);
        document.getElementById(`${prefix}-milliseconds`).textContent = this.padNumber(this.currentTimer.milliseconds, 3);
    }

    // Play alarm sound for countdown timer
    playAlarm() {
        const alarmSound = document.getElementById('alarm-sound');
        const timerDisplay = document.querySelector('.timer-display');
        
        // Play sound
        alarmSound.play();
        
        // Add alarm animation class
        timerDisplay.classList.add('alarm');
        
        // Set timeout to stop alarm after 5 seconds
        this.alarmTimeout = setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            timerDisplay.classList.remove('alarm');
            this.alarmTimeout = null;
        }, 5000);
    }

    // Convert time object to milliseconds
    timeToMilliseconds(time) {
        return (
            time.hours * 60 * 60 * 1000 +
            time.minutes * 60 * 1000 +
            time.seconds * 1000 +
            time.milliseconds
        );
    }

    // Convert milliseconds to time object
    millisecondsToTime(ms) {
        if (ms < 0) ms = 0;
        
        const hours = Math.floor(ms / (60 * 60 * 1000));
        ms %= 60 * 60 * 1000;
        
        const minutes = Math.floor(ms / (60 * 1000));
        ms %= 60 * 1000;
        
        const seconds = Math.floor(ms / 1000);
        ms %= 1000;
        
        const milliseconds = Math.floor(ms);
        
        return { hours, minutes, seconds, milliseconds };
    }

    // Pad a number with leading zeros
    padNumber(num, length) {
        return num.toString().padStart(length, '0');
    }
}

// Initialize timers
const stopwatch = new Timer('stopwatch');
const countdown = new Timer('countdown');

// DOM elements - Selection screen
const selectionScreen = document.getElementById('selection-screen');
const showStopwatchBtn = document.getElementById('show-stopwatch');
const showCountdownBtn = document.getElementById('show-countdown');

// DOM elements - Stopwatch screen
const stopwatchScreen = document.getElementById('stopwatch-screen');
const backFromStopwatchBtn = document.getElementById('back-from-stopwatch');
const stopwatchStartPauseBtn = document.getElementById('stopwatch-start-pause');
const stopwatchClearBtn = document.getElementById('stopwatch-clear');

// DOM elements - Countdown screen
const countdownScreen = document.getElementById('countdown-screen');
const backFromCountdownBtn = document.getElementById('back-from-countdown');
const countdownStartPauseBtn = document.getElementById('countdown-start-pause');
const countdownClearBtn = document.getElementById('countdown-clear');
const setupControls = document.getElementById('setup-controls');
const countdownControls = document.getElementById('countdown-controls');
const numberButtons = document.querySelectorAll('.number-btn');
const clearSetupBtn = document.getElementById('clear-setup');
const confirmSetupBtn = document.getElementById('confirm-setup');

// Event listeners - Selection screen
showStopwatchBtn.addEventListener('click', () => {
    selectionScreen.classList.remove('active');
    stopwatchScreen.classList.add('active');
});

showCountdownBtn.addEventListener('click', () => {
    selectionScreen.classList.remove('active');
    countdownScreen.classList.add('active');
});

// Event listeners - Stopwatch screen
backFromStopwatchBtn.addEventListener('click', () => {
    stopwatchScreen.classList.remove('active');
    selectionScreen.classList.add('active');
});

stopwatchStartPauseBtn.addEventListener('click', () => {
    if (!stopwatch.running) {
        stopwatch.start();
        stopwatchStartPauseBtn.textContent = 'Pause';
        stopwatchStartPauseBtn.classList.remove('start', 'continue');
        stopwatchStartPauseBtn.classList.add('pause');
        stopwatchClearBtn.classList.remove('hidden');
    } else {
        stopwatch.pause();
        stopwatchStartPauseBtn.textContent = 'Continue';
        stopwatchStartPauseBtn.classList.remove('pause');
        stopwatchStartPauseBtn.classList.add('continue');
    }
});

stopwatchClearBtn.addEventListener('click', () => {
    stopwatch.clear();
    stopwatchStartPauseBtn.textContent = 'Start';
    stopwatchStartPauseBtn.classList.remove('pause', 'continue');
    stopwatchStartPauseBtn.classList.add('start');
    stopwatchClearBtn.classList.add('hidden');
});

// Event listeners - Countdown screen
backFromCountdownBtn.addEventListener('click', () => {
    countdownScreen.classList.remove('active');
    selectionScreen.classList.add('active');
});

// Number buttons for setting countdown timer
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = parseInt(button.dataset.value);
        countdown.addDigit(digit);
        
        // Disable number buttons if max digits reached
        if (countdown.tempInitialTimer.length >= 6) {
            numberButtons.forEach(btn => btn.disabled = true);
        }
    });
});

// Clear setup button
clearSetupBtn.addEventListener('click', () => {
    countdown.clearTempTimer();
    // Re-enable number buttons
    numberButtons.forEach(btn => btn.disabled = false);
});

// Confirm setup button
confirmSetupBtn.addEventListener('click', () => {
    if (countdown.tempInitialTimer.length > 0) {
        countdown.setInitialTimer();
        countdown.tempInitialTimer = [];
        
        // Hide setup controls and show timer controls
        setupControls.classList.add('hidden');
        countdownControls.classList.remove('hidden');
        
        // Re-enable number buttons for next time
        numberButtons.forEach(btn => btn.disabled = false);
    }
});

// Countdown start/pause button
countdownStartPauseBtn.addEventListener('click', () => {
    if (!countdown.running) {
        countdown.start();
        countdownStartPauseBtn.textContent = 'Pause';
        countdownStartPauseBtn.classList.remove('start', 'continue');
        countdownStartPauseBtn.classList.add('pause');
        countdownClearBtn.classList.remove('hidden');
    } else {
        countdown.pause();
        countdownStartPauseBtn.textContent = 'Continue';
        countdownStartPauseBtn.classList.remove('pause');
        countdownStartPauseBtn.classList.add('continue');
    }
});

// Countdown clear button
countdownClearBtn.addEventListener('click', () => {
    countdown.clear();
    
    // Reset button states
    countdownStartPauseBtn.textContent = 'Start';
    countdownStartPauseBtn.classList.remove('pause', 'continue');
    countdownStartPauseBtn.classList.add('start');
    countdownClearBtn.classList.add('hidden');
    
    // Go back to setup mode if clicked twice
    if (document.activeElement === countdownClearBtn) {
        setupControls.classList.remove('hidden');
        countdownControls.classList.add('hidden');
    }
});

// Initialize displays
stopwatch.updateDisplay();
countdown.updateDisplay();