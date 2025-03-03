document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const initialScreen = document.getElementById('initial-screen');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownScreen = document.getElementById('countdown-screen');
    
    const stopwatchArrow = document.getElementById('stopwatch-arrow');
    const countdownArrow = document.getElementById('countdown-arrow');
    
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const countdownDisplay = document.getElementById('countdown-display');
    
    const startButton = document.getElementById('start-button');
    const clearButton = document.getElementById('clear-button');
    const setButton = document.getElementById('set-button');
    const countdownClearButton = document.getElementById('countdown-clear-button');
    
    const stopwatchBackButton = document.getElementById('stopwatch-back');
    const countdownBackButton = document.getElementById('countdown-back');
    
    const numpadButtons = document.querySelectorAll('.numpad-button');
    
    // Variables
    let timerInterval;
    let isRunning = false;
    let startTime;
    let elapsedTimeBeforePause = 0; // Store elapsed time when paused
    let currentMode = 'stopwatch'; // 'stopwatch' or 'countdown'
    let countdownTime = 0; // in milliseconds
    let remainingTimeBeforePause = 0; // Store remaining time when paused
    let enteredTime = '';
    
    // Navigation functions
    function showScreen(screen) {
        initialScreen.classList.add('hidden');
        stopwatchScreen.classList.add('hidden');
        countdownScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }
    
    // Timer Format functions
    function formatTime(milliseconds) {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            ms: ms.toString().padStart(3, '0')
        };
    }
    
    function updateDisplay(element, timeObj) {
        element.innerHTML = `${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
        element.nextElementSibling.innerHTML = timeObj.ms;
    }
    
    // Timer Control functions
    function startTimer() {
        if (isRunning) return;
        
        clearInterval(timerInterval);
        
        // If in countdown mode and timer is at zero, don't start
        if (currentMode === 'countdown' && countdownTime <= 0 && remainingTimeBeforePause <= 0) {
            // Ensure the display stays at zero
            updateDisplay(stopwatchDisplay, formatTime(0));
            return;
        }
        
        isRunning = true;
        startButton.textContent = 'Pause';
        startButton.classList.remove('blue-button');
        startButton.classList.add('green-button');
        
        if (currentMode === 'stopwatch') {
            // Account for previously elapsed time when resuming
            startTime = Date.now() - elapsedTimeBeforePause;
            timerInterval = setInterval(updateStopwatch, 10);
        } else {
            // Countdown mode - only start if we have time to count down
            
            // If resuming from pause, use the remaining time
            if (remainingTimeBeforePause > 0) {
                countdownTime = remainingTimeBeforePause;
                remainingTimeBeforePause = 0;
            }
            
            startTime = Date.now();
            timerInterval = setInterval(updateCountdown, 10);
        }
    }
    
    function stopTimer() {
        if (!isRunning) return;
        
        clearInterval(timerInterval);
        isRunning = false;
        
        // Change to "Continue" in blue when paused
        startButton.textContent = 'Continue';
        startButton.classList.remove('green-button');
        startButton.classList.add('blue-button');
        
        // Store current elapsed time when pausing in stopwatch mode
        if (currentMode === 'stopwatch') {
            elapsedTimeBeforePause = Date.now() - startTime;
        } else {
            // Store remaining time when pausing in countdown mode
            remainingTimeBeforePause = Math.max(0, countdownTime - (Date.now() - startTime));
        }
    }
    
    function resetTimer() {
        stopTimer();
        
        // Always reset stored times
        elapsedTimeBeforePause = 0;
        remainingTimeBeforePause = 0;
        
        if (currentMode === 'stopwatch') {
            updateDisplay(stopwatchDisplay, formatTime(0));
        } else {
            countdownTime = parseTimeDisplay(countdownDisplay.textContent) * 1000;
            updateDisplay(countdownDisplay, formatTime(countdownTime));
        }
    }
    
    function updateStopwatch() {
        const elapsedTime = Date.now() - startTime;
        const timeObj = formatTime(elapsedTime);
        updateDisplay(stopwatchDisplay, timeObj);
    }
    
    function updateCountdown() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, countdownTime - elapsedTime);
        
        const timeObj = formatTime(remainingTime);
        updateDisplay(stopwatchDisplay, timeObj);
        
        if (remainingTime <= 0) {
            stopTimer();
            alert("Countdown complete!");
        }
    }
    
    // Parse time from display (HH:MM:SS)
    function parseTimeDisplay(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    // Process numpad input
    function processNumpadInput(value) {
        if (enteredTime.length < 6) { // Limit to 6 digits (HHMMSS)
            enteredTime += value;
            updateCountdownDisplayFromInput();
        }
    }
    
    function updateCountdownDisplayFromInput() {
        // Pad with leading zeros to get 6 digits
        const paddedInput = enteredTime.padStart(6, '0');
        
        // Extract hours, minutes, and seconds
        const hours = paddedInput.substring(0, 2);
        const minutes = paddedInput.substring(2, 4);
        const seconds = paddedInput.substring(4, 6);
        
        countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        countdownTime = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    }
    
    // Event Listeners
    stopwatchArrow.addEventListener('click', function() {
        currentMode = 'stopwatch';
        elapsedTimeBeforePause = 0; // Reset stored time when switching screens
        resetTimer();
        
        // Ensure the button is set to "Start" and green when navigating to the screen
        startButton.textContent = 'Start';
        startButton.classList.remove('blue-button');
        startButton.classList.add('green-button');
        
        showScreen(stopwatchScreen);
    });
    
    countdownArrow.addEventListener('click', function() {
        currentMode = 'countdown';
        enteredTime = '';
        countdownDisplay.textContent = '00:00:00';
        countdownDisplay.nextElementSibling.innerHTML = '000';
        showScreen(countdownScreen);
    });
    
    startButton.addEventListener('click', function() {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });
    
    clearButton.addEventListener('click', function() {
        // Always reset the timer completely when Clear is clicked
        stopTimer();
        
        // Reset to "Start" button (green) when cleared
        startButton.textContent = 'Start';
        startButton.classList.remove('blue-button');
        startButton.classList.add('green-button');
        
        elapsedTimeBeforePause = 0;
        remainingTimeBeforePause = 0;
        countdownTime = 0; // Reset countdown time so it won't restart after clearing
        updateDisplay(stopwatchDisplay, formatTime(0));
    });
    
    setButton.addEventListener('click', function() {
        if (countdownTime > 0) {
            currentMode = 'countdown';
            updateDisplay(stopwatchDisplay, formatTime(countdownTime));
            showScreen(stopwatchScreen);
        }
    });
    
    countdownClearButton.addEventListener('click', function() {
        enteredTime = '';
        countdownDisplay.textContent = '00:00:00';
        countdownDisplay.nextElementSibling.innerHTML = '000';
        countdownTime = 0;
    });
    
    numpadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            processNumpadInput(value);
        });
    });
    
    stopwatchBackButton.addEventListener('click', function() {
        stopTimer();
        showScreen(initialScreen);
    });
    
    countdownBackButton.addEventListener('click', function() {
        showScreen(initialScreen);
    });
    
    // Initialize display and button states
    resetTimer();
    
    // Make sure start button has the green class initially
    startButton.classList.add('green-button');
});