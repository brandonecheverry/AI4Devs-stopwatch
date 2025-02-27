// DOM Elements
const pages = {
    main: document.getElementById('main-menu'),
    stopwatch: document.getElementById('stopwatch-page'),
    countdown: document.getElementById('countdown-page')
};

// Stopwatch elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchMs = document.getElementById('stopwatch-ms');
const startStopBtn = document.getElementById('start-stop');
const stopwatchClearBtn = document.getElementById('stopwatch-clear');
const lapSplitBtn = document.getElementById('lap-split');
const lapsList = document.getElementById('laps-list');
const clearLapsBtn = document.getElementById('clear-laps');

// Countdown elements
const countdownDisplay = document.getElementById('countdown-display');
const countdownMs = document.getElementById('countdown-ms');
const countdownStartStopBtn = document.getElementById('countdown-start-stop');
const countdownClearBtn = document.getElementById('countdown-clear');
const setCountdownBtn = document.getElementById('set-countdown');
const numpadBtns = document.querySelectorAll('.numpad-btn');
const favoritesList = document.getElementById('favorites-list');
const saveFavoriteBtn = document.getElementById('save-favorite');

// Navigation buttons
const gotoStopwatchBtn = document.getElementById('goto-stopwatch');
const gotoCountdownBtn = document.getElementById('goto-countdown');
const stopwatchBackBtn = document.getElementById('stopwatch-back');
const countdownBackBtn = document.getElementById('countdown-back');

// Theme toggle
const toggleModeBtn = document.getElementById('toggle-mode');

// Audio
const buzzerSound = document.getElementById('buzzer-sound');

// App State
const state = {
    stopwatch: {
        running: false,
        startTime: 0,
        elapsedTime: 0,
        interval: null,
        laps: []
    },
    countdown: {
        running: false,
        endTime: 0,
        remainingTime: 0,
        interval: null,
        inputBuffer: '',
        favorites: []
    },
    darkMode: false
};

// Load saved data from localStorage
function loadSavedData() {
    // Load theme preference
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'dark') {
        state.darkMode = true;
        document.body.classList.add('dark-mode');
        toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    }

    // Load stopwatch elapsed time
    const savedStopwatchTime = localStorage.getItem('stopwatchTime');
    if (savedStopwatchTime) {
        state.stopwatch.elapsedTime = parseInt(savedStopwatchTime, 10);
        updateStopwatchDisplay();
    }

    // Load stopwatch laps
    const savedLaps = localStorage.getItem('stopwatchLaps');
    if (savedLaps) {
        state.stopwatch.laps = JSON.parse(savedLaps);
        renderLaps();
    }

    // Load countdown time
    const savedCountdownTime = localStorage.getItem('countdownTime');
    if (savedCountdownTime) {
        state.countdown.remainingTime = parseInt(savedCountdownTime, 10);
        updateCountdownDisplay();
    }

    // Load countdown favorites
    const savedFavorites = localStorage.getItem('countdownFavorites');
    if (savedFavorites) {
        state.countdown.favorites = JSON.parse(savedFavorites);
        renderFavorites();
    }
}

// Navigation Functions
function showPage(pageId) {
    // Pause any running timers when navigating away
    if (pageId !== 'stopwatch-page' && state.stopwatch.running) {
        toggleStopwatch();
    }
    if (pageId !== 'countdown-page' && state.countdown.running) {
        toggleCountdown();
    }

    // Hide all pages
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });

    // Show the requested page
    document.getElementById(pageId).classList.add('active');
}

// Format time functions
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return {
        timeString: `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`,
        msString: padZero(milliseconds, 3).substring(0, 2)
    };
}

function padZero(num, length = 2) {
    return String(num).padStart(length, '0');
}

// Stopwatch functions
function updateStopwatchDisplay() {
    const formatted = formatTime(state.stopwatch.elapsedTime);
    stopwatchDisplay.textContent = formatted.timeString;
    stopwatchMs.textContent = formatted.msString;
}

function toggleStopwatch() {
    if (state.stopwatch.running) {
        // Stop the stopwatch
        clearInterval(state.stopwatch.interval);
        state.stopwatch.running = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('clear-btn');
        startStopBtn.classList.add('start-btn');
        lapSplitBtn.textContent = 'Lap';
    } else {
        // Start the stopwatch
        state.stopwatch.startTime = Date.now() - state.stopwatch.elapsedTime;
        state.stopwatch.running = true;
        state.stopwatch.interval = setInterval(updateStopwatch, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.remove('start-btn');
        startStopBtn.classList.add('clear-btn');
        lapSplitBtn.textContent = 'Split';
    }
}

function updateStopwatch() {
    state.stopwatch.elapsedTime = Date.now() - state.stopwatch.startTime;
    updateStopwatchDisplay();
    
    // Save to localStorage
    localStorage.setItem('stopwatchTime', state.stopwatch.elapsedTime.toString());
}

function resetStopwatch() {
    clearInterval(state.stopwatch.interval);
    state.stopwatch.running = false;
    state.stopwatch.elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('clear-btn');
    startStopBtn.classList.add('start-btn');
    lapSplitBtn.textContent = 'Lap';
    updateStopwatchDisplay();
    
    // Save to localStorage
    localStorage.setItem('stopwatchTime', '0');
}

function addLap() {
    if (state.stopwatch.elapsedTime === 0) return;
    
    const lapTime = state.stopwatch.elapsedTime;
    const prevLapTime = state.stopwatch.laps.length > 0 ? state.stopwatch.laps[0].totalTime : 0;
    const splitTime = lapTime - prevLapTime;
    
    state.stopwatch.laps.unshift({
        number: state.stopwatch.laps.length + 1,
        splitTime: splitTime,
        totalTime: lapTime
    });
    
    renderLaps();
    
    // Save to localStorage
    localStorage.setItem('stopwatchLaps', JSON.stringify(state.stopwatch.laps));
}

function clearLaps() {
    state.stopwatch.laps = [];
    renderLaps();
    
    // Save to localStorage
    localStorage.setItem('stopwatchLaps', JSON.stringify(state.stopwatch.laps));
}

function renderLaps() {
    lapsList.innerHTML = '';
    
    state.stopwatch.laps.forEach(lap => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        const lapNumber = document.createElement('span');
        lapNumber.textContent = `Lap ${lap.number}`;
        
        const lapTimes = document.createElement('div');
        
        const splitFormatted = formatTime(lap.splitTime);
        const totalFormatted = formatTime(lap.totalTime);
        
        lapTimes.textContent = `${totalFormatted.timeString} (${splitFormatted.timeString})`;
        
        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTimes);
        
        lapsList.appendChild(lapItem);
    });
}

// Countdown functions
function updateCountdownDisplay() {
    const formatted = formatTime(state.countdown.remainingTime);
    countdownDisplay.textContent = formatted.timeString;
    countdownMs.textContent = formatted.msString;
}

function toggleCountdown() {
    if (state.countdown.remainingTime <= 0 && !state.countdown.running) {
        return; // Don't start if no time set
    }
    
    if (state.countdown.running) {
        // Stop the countdown
        clearInterval(state.countdown.interval);
        state.countdown.running = false;
        countdownStartStopBtn.textContent = 'Start';
        countdownStartStopBtn.classList.remove('clear-btn');
        countdownStartStopBtn.classList.add('start-btn');
    } else {
        // Start the countdown
        state.countdown.endTime = Date.now() + state.countdown.remainingTime;
        state.countdown.running = true;
        state.countdown.interval = setInterval(updateCountdown, 10);
        countdownStartStopBtn.textContent = 'Pause';
        countdownStartStopBtn.classList.remove('start-btn');
        countdownStartStopBtn.classList.add('clear-btn');
    }
}

function updateCountdown() {
    state.countdown.remainingTime = Math.max(0, state.countdown.endTime - Date.now());
    updateCountdownDisplay();
    
    // Save to localStorage
    localStorage.setItem('countdownTime', state.countdown.remainingTime.toString());
    
    // Check if countdown finished
    if (state.countdown.remainingTime <= 0) {
        clearInterval(state.countdown.interval);
        state.countdown.running = false;
        countdownStartStopBtn.textContent = 'Start';
        countdownStartStopBtn.classList.remove('clear-btn');
        countdownStartStopBtn.classList.add('start-btn');
        
        // Play buzzer sound
        buzzerSound.play();
        
        // Visual notification
        document.body.classList.add('alert');
        setTimeout(() => {
            document.body.classList.remove('alert');
        }, 2000);
    }
}

function resetCountdown() {
    clearInterval(state.countdown.interval);
    state.countdown.running = false;
    state.countdown.remainingTime = 0;
    state.countdown.inputBuffer = '';
    countdownStartStopBtn.textContent = 'Start';
    countdownStartStopBtn.classList.remove('clear-btn');
    countdownStartStopBtn.classList.add('start-btn');
    updateCountdownDisplay();
    
    // Save to localStorage
    localStorage.setItem('countdownTime', '0');
}

function handleNumpadInput(num) {
    if (state.countdown.running) return;
    
    // Shift existing digits left and add new digit to the end
    state.countdown.inputBuffer = (state.countdown.inputBuffer + num).slice(-6);
    
    // Convert buffer to time
    const seconds = parseInt(state.countdown.inputBuffer.slice(-2) || '0', 10);
    const minutes = parseInt(state.countdown.inputBuffer.slice(-4, -2) || '0', 10);
    const hours = parseInt(state.countdown.inputBuffer.slice(-6, -4) || '0', 10);
    
    state.countdown.remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    updateCountdownDisplay();
    
    // Save to localStorage
    localStorage.setItem('countdownTime', state.countdown.remainingTime.toString());
}

function setCountdown() {
    if (state.countdown.remainingTime > 0) {
        // You can add additional actions here if needed
        countdownStartStopBtn.focus();
    }
}

function saveFavorite() {
    if (state.countdown.remainingTime <= 0) return;
    
    // Avoid duplicates
    const exists = state.countdown.favorites.some(fav => fav.time === state.countdown.remainingTime);
    if (exists) return;
    
    state.countdown.favorites.push({
        id: Date.now(),
        time: state.countdown.remainingTime,
        label: promptForLabel()
    });
    
    renderFavorites();
    
    // Save to localStorage
    localStorage.setItem('countdownFavorites', JSON.stringify(state.countdown.favorites));
}

function promptForLabel() {
    const formatted = formatTime(state.countdown.remainingTime);
    return prompt('Name this timer', formatted.timeString) || formatted.timeString;
}

function loadFavorite(time) {
    state.countdown.remainingTime = time;
    updateCountdownDisplay();
    
    // Save to localStorage
    localStorage.setItem('countdownTime', state.countdown.remainingTime.toString());
}

function deleteFavorite(id) {
    state.countdown.favorites = state.countdown.favorites.filter(fav => fav.id !== id);
    renderFavorites();
    
    // Save to localStorage
    localStorage.setItem('countdownFavorites', JSON.stringify(state.countdown.favorites));
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    
    state.countdown.favorites.forEach(fav => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        
        const nameEl = document.createElement('span');
        nameEl.textContent = fav.label;
        
        const actionsEl = document.createElement('div');
        
        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load';
        loadBtn.className = 'small-btn';
        loadBtn.addEventListener('click', () => loadFavorite(fav.time));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'small-btn';
        deleteBtn.addEventListener('click', () => deleteFavorite(fav.id));
        
        actionsEl.appendChild(loadBtn);
        actionsEl.appendChild(deleteBtn);
        
        favoriteItem.appendChild(nameEl);
        favoriteItem.appendChild(actionsEl);
        
        favoritesList.appendChild(favoriteItem);
    });
}

// Theme Toggle
function toggleTheme() {
    state.darkMode = !state.darkMode;
    
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
        toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
        localStorage.setItem('themeMode', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        toggleModeBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
        localStorage.setItem('themeMode', 'light');
    }
}

// Event Listeners
// Navigation
gotoStopwatchBtn.addEventListener('click', () => showPage('stopwatch-page'));
gotoCountdownBtn.addEventListener('click', () => showPage('countdown-page'));
stopwatchBackBtn.addEventListener('click', () => showPage('main-menu'));
countdownBackBtn.addEventListener('click', () => showPage('main-menu'));

// Stopwatch controls
startStopBtn.addEventListener('click', toggleStopwatch);
stopwatchClearBtn.addEventListener('click', resetStopwatch);
lapSplitBtn.addEventListener('click', addLap);
clearLapsBtn.addEventListener('click', clearLaps);

// Countdown controls
countdownStartStopBtn.addEventListener('click', toggleCountdown);
countdownClearBtn.addEventListener('click', resetCountdown);
setCountdownBtn.addEventListener('click', setCountdown);
saveFavoriteBtn.addEventListener('click', saveFavorite);

// Numpad input
numpadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        handleNumpadInput(btn.dataset.num);
    });
});

// Theme toggle
toggleModeBtn.addEventListener('click', toggleTheme);

// Add alert styles for countdown finish
const alertStyle = document.createElement('style');
alertStyle.textContent = `
    @keyframes alertPulse {
        0% { background-color: var(--bg-color); }
        50% { background-color: #ff6666; }
        100% { background-color: var(--bg-color); }
    }
    
    body.alert .timer-display {
        animation: alertPulse 0.5s 4;
    }
`;
document.head.appendChild(alertStyle);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only handle keys when not typing in an input
    if (e.target.tagName === 'INPUT') return;
    
    const activePage = document.querySelector('.page.active').id;
    
    switch (e.key) {
        case ' ': // Space bar
            if (activePage === 'stopwatch-page') {
                toggleStopwatch();
                e.preventDefault();
            } else if (activePage === 'countdown-page') {
                toggleCountdown();
                e.preventDefault();
            }
            break;
        case 'Escape':
            if (activePage === 'stopwatch-page' || activePage === 'countdown-page') {
                showPage('main-menu');
                e.preventDefault();
            }
            break;
        case 'l':
        case 'L':
            if (activePage === 'stopwatch-page') {
                addLap();
                e.preventDefault();
            }
            break;
        case 'c':
        case 'C':
            if (activePage === 'stopwatch-page') {
                resetStopwatch();
                e.preventDefault();
            } else if (activePage === 'countdown-page') {
                resetCountdown();
                e.preventDefault();
            }
            break;
        case 't':
        case 'T':
            toggleTheme();
            e.preventDefault();
            break;
    }
});

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
});