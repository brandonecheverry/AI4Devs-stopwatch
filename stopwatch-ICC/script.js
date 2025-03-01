// DOM elements
let displayElement;
let startButton;
let stopButton;
let pauseButton;
let resetButton;
let lapButton;
let lapsList;
let darkModeToggle;
let container;

// Stopwatch state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let pausedTime = 0;
let isRunning = false;
let isPaused = false;
let laps = [];
let lapCounter = 1;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Create UI elements
  createUI();
  
  // Add event listeners
  addEventListeners();
  
  // Load saved state if available
  loadState();
});

function createUI() {
  const body = document.querySelector('body');
  
  // Create container
  container = document.createElement('div');
  container.className = 'container';
  
  // Create display
  displayElement = document.createElement('div');
  displayElement.className = 'display';
  displayElement.textContent = '00:00:00.000';
  
  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  
  // Create buttons
  startButton = createButton('start-btn', 'Start');
  pauseButton = createButton('pause-btn', 'Pause');
  stopButton = createButton('stop-btn', 'Stop');
  resetButton = createButton('reset-btn', 'Reset');
  lapButton = createButton('lap-btn', 'Lap');
  
  // Add buttons to container
  buttonsContainer.appendChild(startButton);
  buttonsContainer.appendChild(pauseButton);
  buttonsContainer.appendChild(stopButton);
  buttonsContainer.appendChild(resetButton);
  buttonsContainer.appendChild(lapButton);
  
  // Create laps container
  const lapsContainer = document.createElement('div');
  lapsContainer.className = 'laps-container';
  
  // Create laps heading
  const lapsHeading = document.createElement('h2');
  lapsHeading.textContent = 'Laps';
  lapsContainer.appendChild(lapsHeading);
  
  // Create laps list
  lapsList = document.createElement('ul');
  lapsList.className = 'laps-list';
  lapsContainer.appendChild(lapsList);
  
  // Create dark mode toggle
  darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.textContent = '🌙';
  
  // Append elements to container
  container.appendChild(displayElement);
  container.appendChild(buttonsContainer);
  container.appendChild(lapsContainer);
  container.appendChild(darkModeToggle);
  
  // Append container to body
  body.appendChild(container);
  
  // Set initial button states
  updateButtonStates();
}

function createButton(className, text) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = text;
  return button;
}

function addEventListeners() {
  // Button event listeners
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  stopButton.addEventListener('click', stopTimer);
  resetButton.addEventListener('click', resetTimer);
  lapButton.addEventListener('click', recordLap);
  darkModeToggle.addEventListener('click', toggleDarkMode);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isRunning) {
        startTimer();
      } else if (!isPaused) {
        pauseTimer();
      } else {
        startTimer();
      }
    } else if (e.code === 'KeyR') {
      resetTimer();
    } else if (e.code === 'KeyL') {
      if (isRunning && !isPaused) {
        recordLap();
      }
    }
  });
  
  // Check for dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
}

function startTimer() {
  if (!isRunning) {
    // If we're resuming from a paused state
    if (isPaused) {
      startTime = Date.now() - pausedTime;
      isPaused = false;
    } else {
      startTime = Date.now() - elapsedTime;
    }
    
    timerInterval = requestAnimationFrame(updateTimer);
    isRunning = true;
    
    updateButtonStates();
    saveState();
  }
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  displayTime(elapsedTime);
  
  if (isRunning) {
    timerInterval = requestAnimationFrame(updateTimer);
  }
  
  // Save state every second to avoid excessive writes
  if (elapsedTime % 1000 < 20) {
    saveState();
  }
}

function pauseTimer() {
  if (isRunning && !isPaused) {
    cancelAnimationFrame(timerInterval);
    pausedTime = elapsedTime;
    isPaused = true;
    isRunning = false;
    
    updateButtonStates();
    saveState();
  }
}

function stopTimer() {
  if (isRunning || isPaused) {
    if (isRunning) {
      cancelAnimationFrame(timerInterval);
    }
    isRunning = false;
    isPaused = false;
    
    updateButtonStates();
    saveState();
  }
}

function resetTimer() {
  cancelAnimationFrame(timerInterval);
  isRunning = false;
  isPaused = false;
  elapsedTime = 0;
  pausedTime = 0;
  startTime = 0;
  laps = [];
  lapCounter = 1;
  
  displayTime(0);
  clearLaps();
  updateButtonStates();
  saveState();
}

function recordLap() {
  if (isRunning && !isPaused) {
    const lapTime = elapsedTime;
    const previousLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
    const lapDuration = lapTime - previousLapTime;
    
    laps.push({
      number: lapCounter++,
      lapDuration: lapDuration,
      totalTime: lapTime
    });
    
    // Add lap to UI
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>Lap ${laps[laps.length - 1].number}</span> 
                         <span>${formatTime(lapDuration)}</span> 
                         <span>${formatTime(lapTime)}</span>`;
    lapsList.appendChild(lapItem);
    
    saveState();
  }
}

function clearLaps() {
  lapsList.innerHTML = '';
}

function displayTime(time) {
  const formattedTime = formatTime(time);
  displayElement.textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateButtonStates() {
  startButton.disabled = isRunning && !isPaused;
  pauseButton.disabled = !isRunning || isPaused;
  stopButton.disabled = !isRunning && !isPaused;
  resetButton.disabled = !isRunning && !isPaused && elapsedTime === 0;
  lapButton.disabled = !isRunning || isPaused;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

function saveState() {
  const state = {
    elapsedTime,
    isRunning,
    isPaused,
    pausedTime,
    laps,
    lapCounter,
    startTime: isRunning ? startTime : 0,
    timestamp: Date.now()
  };
  
  localStorage.setItem('stopwatchState', JSON.stringify(state));
}

function loadState() {
  const savedState = localStorage.getItem('stopwatchState');
  
  if (savedState) {
    const state = JSON.parse(savedState);
    
    // Calculate actual elapsed time if timer was running
    if (state.isRunning) {
      const timePassed = Date.now() - state.timestamp;
      elapsedTime = state.elapsedTime + timePassed;
      startTime = Date.now() - elapsedTime;
      isRunning = true;
      timerInterval = requestAnimationFrame(updateTimer);
    } else if (state.isPaused) {
      elapsedTime = state.pausedTime;
      pausedTime = state.pausedTime;
      isPaused = true;
      displayTime(elapsedTime);
    } else {
      elapsedTime = state.elapsedTime;
      displayTime(elapsedTime);
    }
    
    // Restore laps
    laps = state.laps;
    lapCounter = state.lapCounter;
    
    // Rebuild laps UI
    laps.forEach(lap => {
      const lapItem = document.createElement('li');
      lapItem.innerHTML = `<span>Lap ${lap.number}</span> 
                           <span>${formatTime(lap.lapDuration)}</span> 
                           <span>${formatTime(lap.totalTime)}</span>`;
      lapsList.appendChild(lapItem);
    });
    
    updateButtonStates();
  }
}
