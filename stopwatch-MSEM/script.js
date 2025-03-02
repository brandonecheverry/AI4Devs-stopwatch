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
    
    // Initialize stopwatch display
    updateStopwatchDisplay();
});