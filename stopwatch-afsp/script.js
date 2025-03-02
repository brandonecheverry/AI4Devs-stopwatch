document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const millisDisplay = timerDisplay.querySelector('.milliseconds');
    const startPauseBtn = document.getElementById('startPause');
    const clearBtn = document.getElementById('clear');
    const modeToggle = document.getElementById('modeToggle');
    const countdownInput = document.getElementById('countdownInput');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');

    let interval;
    let isRunning = false;
    let isCountdown = false;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let startTime;
    let pausedTime = 0;
    let totalTime = 0;

    // Initialize timer display
    updateDisplay();

    // Toggle between stopwatch and countdown
    modeToggle.addEventListener('change', () => {
        isCountdown = modeToggle.checked;

        if (isRunning) {
            pauseTimer();
        }

        resetTimer();

        countdownInput.style.display = isCountdown ? 'flex' : 'none';

        if (isCountdown) {
            hours = parseInt(hoursInput.value) || 0;
            minutes = parseInt(minutesInput.value) || 0;
            seconds = parseInt(secondsInput.value) || 0;
        } else {
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        milliseconds = 0;
        updateDisplay();
    });

    // Update countdown values when inputs change
    hoursInput.addEventListener('change', updateCountdownValues);
    minutesInput.addEventListener('change', updateCountdownValues);
    secondsInput.addEventListener('change', updateCountdownValues);

    function updateCountdownValues() {
        if (isCountdown && !isRunning) {
            hours = parseInt(hoursInput.value) || 0;
            minutes = parseInt(minutesInput.value) || 0;
            seconds = parseInt(secondsInput.value) || 0;
            milliseconds = 0;
            updateDisplay();
        }
    }

    // Start or Pause timer
    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    // Clear timer
    clearBtn.addEventListener('click', () => {
        resetTimer();
    });

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startPauseBtn.textContent = 'Pause';

        if (isCountdown) {
            totalTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
            if (totalTime <= 0) return;

            if (pausedTime > 0) {
                startTime = Date.now() - (totalTime - pausedTime);
            } else {
                startTime = Date.now();
            }

            interval = setInterval(updateCountdown, 10);
        } else {
            startTime = Date.now() - pausedTime;
            interval = setInterval(updateStopwatch, 10);
        }
    }

    function pauseTimer() {
        if (!isRunning) return;

        clearInterval(interval);
        isRunning = false;
        startPauseBtn.textContent = 'Start';

        if (isCountdown) {
            pausedTime = totalTime - (Date.now() - startTime);
        } else {
            pausedTime = Date.now() - startTime;
        }
    }

    function resetTimer() {
        pauseTimer();
        pausedTime = 0;

        if (isCountdown) {
            hours = parseInt(hoursInput.value) || 0;
            minutes = parseInt(minutesInput.value) || 0;
            seconds = parseInt(secondsInput.value) || 0;
        } else {
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        milliseconds = 0;
        updateDisplay();
    }

    function updateStopwatch() {
        const currentTime = Date.now() - startTime;
        milliseconds = Math.floor((currentTime % 1000) / 10);
        seconds = Math.floor((currentTime / 1000) % 60);
        minutes = Math.floor((currentTime / 60000) % 60);
        hours = Math.floor(currentTime / 3600000);

        updateDisplay();
    }

    function updateCountdown() {
        const elapsed = Date.now() - startTime;
        const remaining = totalTime - elapsed;

        if (remaining <= 0) {
            clearInterval(interval);
            isRunning = false;
            startPauseBtn.textContent = 'Start';
            hours = 0;
            minutes = 0;
            seconds = 0;
            milliseconds = 0;
            pausedTime = 0;
            updateDisplay();
            return;
        }

        milliseconds = Math.floor((remaining % 1000) / 10);
        seconds = Math.floor((remaining / 1000) % 60);
        minutes = Math.floor((remaining / 60000) % 60);
        hours = Math.floor(remaining / 3600000);

        updateDisplay();
    }

    function updateDisplay() {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0');

        timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}<span class="milliseconds">${formattedMilliseconds}</span>`;
    }
});
