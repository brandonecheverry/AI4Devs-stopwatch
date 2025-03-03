document.addEventListener('DOMContentLoaded', function() {
    // Screen elements
    const homeScreen = document.getElementById('home-screen');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownConfigScreen = document.getElementById('countdown-config-screen');
    const countdownTimerScreen = document.getElementById('countdown-timer-screen');
    
    // Navigation buttons
    const stopwatchOption = document.getElementById('stopwatch-option');
    const countdownOption = document.getElementById('countdown-option');
    const stopwatchBackBtn = document.getElementById('stopwatch-back-btn');
    const countdownConfigBackBtn = document.getElementById('countdown-config-back-btn');
    const countdownBackBtn = document.getElementById('countdown-back-btn');
    const setBtn = document.getElementById('set-btn');
    const reconfigureBtn = document.getElementById('reconfigure-btn');
    
    // Stopwatch elements
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const stopwatchStartBtn = document.getElementById('stopwatch-start-btn');
    const stopwatchClearBtn = document.getElementById('stopwatch-clear-btn');
    
    // Countdown config elements
    const hourDisplay = document.getElementById('hour-display');
    const minuteDisplay = document.getElementById('minute-display');
    const secondDisplay = document.getElementById('second-display');
    const configClearBtn = document.getElementById('config-clear-btn');
    const numBtns = document.querySelectorAll('.num-btn[data-val]');
    
    // Countdown timer elements
    const countdownTimerDisplay = document.getElementById('countdown-timer-display');
    const countdownStartBtn = document.getElementById('countdown-start-btn');
    const countdownClearBtn = document.getElementById('countdown-clear-btn');
    
    // Stopwatch variables
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;
    let stopwatchStartTime;
    let stopwatchPausedTime = 0;
    
    // Countdown config variables
    let activeTimeSection = null;
    let configuredHours = '00';
    let configuredMinutes = '00';
    let configuredSeconds = '00';
    let configuredTime = 0; // in milliseconds
    
    // Countdown timer variables
    let countdownInterval;
    let countdownRunning = false;
    let countdownEndTime;
    let countdownTimeRemaining = 0;
    let countdownPaused = false;
    
    // Function to show a screen and hide others
    function showScreen(screen) {
        homeScreen.classList.remove('active');
        stopwatchScreen.classList.remove('active');
        countdownConfigScreen.classList.remove('active');
        countdownTimerScreen.classList.remove('active');
        
        screen.classList.add('active');
    }
    
    // Function to format time as HH:MM:SS.MMM
    function formatTime(timeInMs) {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((timeInMs % 1000));
        
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0');
        
        return {
            main: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
            ms: formattedMilliseconds
        };
    }
    
    // Function to update stopwatch display
    function updateStopwatchDisplay() {
        const currentTime = stopwatchRunning ? Date.now() - stopwatchStartTime + stopwatchPausedTime : stopwatchPausedTime;
        const formatted = formatTime(currentTime);
        
        stopwatchDisplay.innerHTML = formatted.main + '<span class="milliseconds">' + formatted.ms + '</span>';
    }
    
    // Function to start the stopwatch
    function startStopwatch() {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            stopwatchStartTime = Date.now();
            
            stopwatchInterval = setInterval(updateStopwatchDisplay, 10); // Update every 10ms for smooth display
            
            stopwatchStartBtn.textContent = 'Pause';
            stopwatchStartBtn.classList.remove('blue-btn');
            stopwatchStartBtn.classList.add('green-btn');
        }
    }
    
    // Function to pause the stopwatch
    function pauseStopwatch() {
        if (stopwatchRunning) {
            stopwatchRunning = false;
            clearInterval(stopwatchInterval);
            
            // Calculate elapsed time and add to paused time
            stopwatchPausedTime += Date.now() - stopwatchStartTime;
            
            stopwatchStartBtn.textContent = 'Continue';
            stopwatchStartBtn.classList.remove('green-btn');
            stopwatchStartBtn.classList.add('blue-btn');
        }
    }
    
    // Function to continue the stopwatch
    function continueStopwatch() {
        startStopwatch();
    }
    
    // Function to clear the stopwatch
    function clearStopwatch() {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);
        stopwatchPausedTime = 0;
        
        stopwatchStartBtn.textContent = 'Start';
        stopwatchStartBtn.classList.remove('blue-btn');
        stopwatchStartBtn.classList.add('green-btn');
        
        updateStopwatchDisplay();
    }
    
    // Function to update countdown timer display
    function updateCountdownDisplay(timeInMs) {
        if (timeInMs < 0) timeInMs = 0;
        
        const formatted = formatTime(timeInMs);
        countdownTimerDisplay.innerHTML = formatted.main + '<span class="milliseconds">' + formatted.ms + '</span>';
        
        // If countdown reached zero, stop it
        if (timeInMs <= 0 && countdownRunning) {
            stopCountdown();
            // Optional: add a sound or visual alert when countdown ends
        }
    }
    
    // Function to start the countdown
    function startCountdown() {
        if (!countdownRunning) {
            countdownRunning = true;
            
            if (!countdownPaused) {
                // Starting fresh
                countdownTimeRemaining = configuredTime;
            }
            
            // Calculate end time
            countdownEndTime = Date.now() + countdownTimeRemaining;
            
            countdownInterval = setInterval(function() {
                // Calculate remaining time
                countdownTimeRemaining = countdownEndTime - Date.now();
                updateCountdownDisplay(countdownTimeRemaining);
            }, 10);
            
            countdownStartBtn.textContent = 'Pause';
            countdownStartBtn.classList.remove('blue-btn');
            countdownStartBtn.classList.add('green-btn');
            countdownPaused = false;
        }
    }
    
    // Function to pause the countdown
    function pauseCountdown() {
        if (countdownRunning) {
            countdownRunning = false;
            clearInterval(countdownInterval);
            
            // Store the remaining time
            countdownTimeRemaining = countdownEndTime - Date.now();
            if (countdownTimeRemaining < 0) countdownTimeRemaining = 0;
            
            countdownStartBtn.textContent = 'Continue';
            countdownStartBtn.classList.remove('green-btn');
            countdownStartBtn.classList.add('blue-btn');
            countdownPaused = true;
        }
    }
    
    // Function to continue the countdown
    function continueCountdown() {
        startCountdown();
    }
    
    // Function to stop the countdown
    function stopCountdown() {
        countdownRunning = false;
        clearInterval(countdownInterval);
        countdownPaused = false;
        
        countdownStartBtn.textContent = 'Start';
        countdownStartBtn.classList.remove('blue-btn');
        countdownStartBtn.classList.add('green-btn');
    }
    
    // Function to clear/reset the countdown
    function clearCountdown() {
        stopCountdown();
        countdownTimeRemaining = configuredTime;
        updateCountdownDisplay(countdownTimeRemaining);
    }
    
    // Function to set active time section
    function setActiveTimeSection(section) {
        // Remove active class from all sections
        hourDisplay.classList.remove('active');
        minuteDisplay.classList.remove('active');
        secondDisplay.classList.remove('active');
        
        // Set active section
        if (section) {
            section.classList.add('active');
            activeTimeSection = section;
        } else {
            activeTimeSection = null;
        }
        
        // Enable/disable numpad buttons based on active section
        numBtns.forEach(btn => {
            const val = parseInt(btn.getAttribute('data-val'));
            if (activeTimeSection === minuteDisplay || activeTimeSection === secondDisplay) {
                // For minutes and seconds, first digit can only be 0-5
                btn.style.opacity = (val > 5) ? '0.5' : '1';
                btn.style.pointerEvents = (val > 5) ? 'none' : 'auto';
            } else {
                // For hours, all digits are valid
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Function to handle numpad input
    function handleNumpadInput(val) {
        if (!activeTimeSection) return;
        
        let currentVal = activeTimeSection.textContent;
        
        // Shift left and add new digit
        let newVal = currentVal.slice(1) + val;
        
        // Update the active section
        activeTimeSection.textContent = newVal;
        
        // Update configured time values
        if (activeTimeSection === hourDisplay) {
            configuredHours = newVal;
        } else if (activeTimeSection === minuteDisplay) {
            configuredMinutes = newVal;
        } else if (activeTimeSection === secondDisplay) {
            configuredSeconds = newVal;
        }
        
        // Calculate total milliseconds
        configuredTime = (parseInt(configuredHours) * 3600 + 
                         parseInt(configuredMinutes) * 60 + 
                         parseInt(configuredSeconds)) * 1000;
    }
    
    // Function to clear countdown config
    function clearCountdownConfig() {
        configuredHours = '00';
        configuredMinutes = '00';
        configuredSeconds = '00';
        configuredTime = 0;
        
        hourDisplay.textContent = '00';
        minuteDisplay.textContent = '00';
        secondDisplay.textContent = '00';
        
        setActiveTimeSection(null);
    }
    
    // Function to handle key press events
    function handleKeyPress(e) {
        if (!countdownConfigScreen.classList.contains('active')) return;
        
        const key = e.key;
        
        // Handle Tab key for cycling between time units
        if (key === 'Tab') {
            e.preventDefault(); // Prevent default tab behavior
            
            // Determine which section to activate next
            if (activeTimeSection === secondDisplay) {
                setActiveTimeSection(minuteDisplay);
            } else if (activeTimeSection === minuteDisplay) {
                setActiveTimeSection(hourDisplay);
            } else {
                setActiveTimeSection(secondDisplay);
            }
            
            return;
        }
        
        // For digit input, need an active section
        if (!activeTimeSection) return;
        
        // Check if key is a digit
        if (/^\d$/.test(key)) {
            const digit = parseInt(key);
            
            // Check constraints for minutes and seconds
            if ((activeTimeSection === minuteDisplay || activeTimeSection === secondDisplay) && 
                activeTimeSection.textContent[0] === '0' && digit > 5) {
                return; // Ignore input if first digit is 0 and second digit would be > 5
            }
            
            handleNumpadInput(key);
        }
    }
    
    // Stopwatch event listeners
    stopwatchStartBtn.addEventListener('click', function() {
        if (this.textContent === 'Start') {
            startStopwatch();
        } else if (this.textContent === 'Pause') {
            pauseStopwatch();
        } else if (this.textContent === 'Continue') {
            continueStopwatch();
        }
    });
    
    stopwatchClearBtn.addEventListener('click', clearStopwatch);
    
    // Countdown config event listeners
    hourDisplay.addEventListener('click', function() {
        setActiveTimeSection(this);
    });
    
    minuteDisplay.addEventListener('click', function() {
        setActiveTimeSection(this);
    });
    
    secondDisplay.addEventListener('click', function() {
        setActiveTimeSection(this);
    });
    
    numBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const val = this.getAttribute('data-val');
            handleNumpadInput(val);
        });
    });
    
    configClearBtn.addEventListener('click', clearCountdownConfig);
    
    // Countdown timer event listeners
    countdownStartBtn.addEventListener('click', function() {
        if (this.textContent === 'Start') {
            startCountdown();
        } else if (this.textContent === 'Pause') {
            pauseCountdown();
        } else if (this.textContent === 'Continue') {
            continueCountdown();
        }
    });
    
    countdownClearBtn.addEventListener('click', clearCountdown);
    
    reconfigureBtn.addEventListener('click', function() {
        stopCountdown();
        showScreen(countdownConfigScreen);
        // Pre-select seconds by default when reconfiguring
        setActiveTimeSection(secondDisplay);
    });
    
    // Navigation event listeners
    stopwatchOption.addEventListener('click', function() {
        showScreen(stopwatchScreen);
    });
    
    countdownOption.addEventListener('click', function() {
        showScreen(countdownConfigScreen);
        // Pre-select seconds by default when entering countdown configuration
        setActiveTimeSection(secondDisplay);
    });
    
    stopwatchBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    countdownConfigBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    countdownBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    // Listen for keyboard input
    document.addEventListener('keydown', handleKeyPress);
    
    // Initialize displays
    updateStopwatchDisplay();
    clearCountdownConfig();
    
    // Initialize countdown timer display when set button is clicked
    setBtn.addEventListener('click', function() {
        // Update the displayed time on the countdown timer screen
        updateCountdownDisplay(configuredTime);
        
        // Reset button state
        countdownStartBtn.textContent = 'Start';
        countdownStartBtn.classList.remove('blue-btn');
        countdownStartBtn.classList.add('green-btn');
        
        // Show the countdown timer screen
        showScreen(countdownTimerScreen);
    });
});