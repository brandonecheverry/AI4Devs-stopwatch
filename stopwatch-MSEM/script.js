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
    
    // Stopwatch variables
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;
    let stopwatchStartTime;
    let stopwatchPausedTime = 0;
    
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
    
    // Navigation event listeners
    stopwatchOption.addEventListener('click', function() {
        showScreen(stopwatchScreen);
    });
    
    countdownOption.addEventListener('click', function() {
        showScreen(countdownConfigScreen);
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
    
    setBtn.addEventListener('click', function() {
        showScreen(countdownTimerScreen);
    });
    
    reconfigureBtn.addEventListener('click', function() {
        showScreen(countdownConfigScreen);
    });
    
    // Countdown config variables
    let activeTimeSection = null;
    let configuredHours = '00';
    let configuredMinutes = '00';
    let configuredSeconds = '00';
    let configuredTime = 0; // in milliseconds
    
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
        if (!countdownConfigScreen.classList.contains('active') || !activeTimeSection) return;
        
        const key = e.key;
        
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
    
    // Listen for keyboard input
    document.addEventListener('keydown', handleKeyPress);
    
    // Initialize displays
    updateStopwatchDisplay();
    clearCountdownConfig();
    
    // Initialize countdown timer display when set button is clicked
    setBtn.addEventListener('click', function() {
        document.getElementById('countdown-timer-display').innerHTML = 
            `${configuredHours}:${configuredMinutes}:${configuredSeconds}<span class="milliseconds">000</span>`;
        showScreen(countdownTimerScreen);
    });
});