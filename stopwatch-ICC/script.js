// DOM elements
let displayElement;
let startButton;
let pauseButton;
let stopButton;
let resetButton;
let lapButton;
let lapsList;
let darkModeToggle;
let container;
let exportButton;

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
  
  // Create info section
  createInfoSection();
  
  // Create display
  displayElement = document.createElement('div');
  displayElement.className = 'display';
  displayElement.textContent = '00:00:00.000';
  
  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  
  // Create buttons
  startButton = createButton('start-btn', '⏵ Start');
  pauseButton = createButton('pause-btn', '⏸ Pause');
  stopButton = createButton('stop-btn', '⏹ Stop');
  resetButton = createButton('reset-btn', '↺ Reset');
  lapButton = createButton('lap-btn', '⏱ Lap');
  exportButton = createButton('export-btn', '⬇ Export');
  
  // Add buttons to container
  buttonsContainer.appendChild(startButton);
  buttonsContainer.appendChild(pauseButton);
  buttonsContainer.appendChild(stopButton);
  buttonsContainer.appendChild(resetButton);
  buttonsContainer.appendChild(lapButton);
  buttonsContainer.appendChild(exportButton);
  
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
  darkModeToggle.title = 'Toggle Dark Mode';
  
  // Append elements to container
  container.appendChild(displayElement);
  container.appendChild(buttonsContainer);
  container.appendChild(lapsContainer);
  container.appendChild(darkModeToggle);
  
  // Append container to body
  body.appendChild(container);
  
  // Add keyboard shortcuts info
  createKeyboardShortcutsInfo();
  
  // Set initial button states
  updateButtonStates();
}

function createInfoSection() {
  const infoSection = document.createElement('div');
  infoSection.className = 'info-section';
  
  // Create app title and info
  const titleContainer = document.createElement('div');
  titleContainer.className = 'title-container';
  
  const appIcon = document.createElement('span');
  appIcon.className = 'app-icon';
  appIcon.textContent = '⏱️';
  
  const appTitle = document.createElement('h1');
  appTitle.textContent = 'Precision Stopwatch';
  
  titleContainer.appendChild(appIcon);
  titleContainer.appendChild(appTitle);
  
  // Create app description
  const appDescription = document.createElement('p');
  appDescription.className = 'app-description';
  appDescription.innerHTML = 'A high-precision timing tool for accurate time measurement with lap recording and persistent storage.';
  
  // Create features list
  const featuresList = document.createElement('div');
  featuresList.className = 'features-list';
  
  const features = [
    { icon: '⏱️', text: 'Millisecond precision timing' },
    { icon: '📊', text: 'Lap time recording' },
    { icon: '💾', text: 'Automatic state saving' },
    { icon: '⌨️', text: 'Keyboard shortcuts' },
    { icon: '🌙', text: 'Dark/light mode' },
    { icon: '📱', text: 'Responsive design' }
  ];
  
  features.forEach(feature => {
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    
    const featureIcon = document.createElement('span');
    featureIcon.className = 'feature-icon';
    featureIcon.textContent = feature.icon;
    
    const featureText = document.createElement('span');
    featureText.className = 'feature-text';
    featureText.textContent = feature.text;
    
    featureItem.appendChild(featureIcon);
    featureItem.appendChild(featureText);
    featuresList.appendChild(featureItem);
  });
  
  // Append all elements to info section
  infoSection.appendChild(titleContainer);
  infoSection.appendChild(appDescription);
  infoSection.appendChild(featuresList);
  
  // Append info section to container
  container.appendChild(infoSection);
  
  // Add a collapsible toggle for mobile
  const toggleInfo = document.createElement('button');
  toggleInfo.className = 'toggle-info';
  toggleInfo.textContent = 'ℹ️ About';
  toggleInfo.addEventListener('click', () => {
    infoSection.classList.toggle('expanded');
    toggleInfo.textContent = infoSection.classList.contains('expanded') ? '✖️ Close' : 'ℹ️ About';
  });
  
  container.appendChild(toggleInfo);
}

function createKeyboardShortcutsInfo() {
  const shortcutsInfo = document.createElement('div');
  shortcutsInfo.className = 'shortcuts-info';
  
  const shortcutsTitle = document.createElement('h3');
  shortcutsTitle.textContent = '⌨️ Keyboard Shortcuts';
  
  const shortcutsList = document.createElement('div');
  shortcutsList.className = 'shortcuts-list';
  
  const shortcuts = [
    { key: 'Space', action: 'Start/Pause' },
    { key: 'R', action: 'Reset' },
    { key: 'L', action: 'Lap' }
  ];
  
  shortcuts.forEach(shortcut => {
    const shortcutItem = document.createElement('div');
    shortcutItem.className = 'shortcut-item';
    
    const keyElement = document.createElement('kbd');
    keyElement.textContent = shortcut.key;
    
    const actionElement = document.createElement('span');
    actionElement.textContent = shortcut.action;
    
    shortcutItem.appendChild(keyElement);
    shortcutItem.appendChild(actionElement);
    shortcutsList.appendChild(shortcutItem);
  });
  
  shortcutsInfo.appendChild(shortcutsTitle);
  shortcutsInfo.appendChild(shortcutsList);
  
  container.appendChild(shortcutsInfo);
}

function createButton(className, text) {
  const button = document.createElement('button');
  button.className = className;
  button.innerHTML = text;
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
  exportButton.addEventListener('click', exportLaps);
  
  // Sound toggle
  const soundToggle = document.createElement('button');
  soundToggle.className = 'sound-toggle';
  soundToggle.textContent = '🔊';
  soundToggle.title = 'Toggle Sound';
  let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  updateSoundToggle();
  
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateSoundToggle();
  });
  
  function updateSoundToggle() {
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  }
  
  container.appendChild(soundToggle);
  
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
    
    playSound('start');
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
    
    playSound('pause');
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
    
    playSound('stop');
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
  playSound('reset');
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
    
    playSound('lap');
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
  exportButton.disabled = laps.length === 0;
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

function exportLaps() {
  if (laps.length === 0) return;
  
  // Create CSV content
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Lap Number,Lap Duration,Total Time\n";
  
  laps.forEach(lap => {
    csvContent += `${lap.number},${formatTime(lap.lapDuration)},${formatTime(lap.totalTime)}\n`;
  });
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `stopwatch_laps_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  
  // Trigger download and clean up
  link.click();
  document.body.removeChild(link);
  
  playSound('export');
}

function playSound(action) {
  if (localStorage.getItem('soundEnabled') === 'false') return;
  
  // Create audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create oscillator
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Set sound parameters based on action
  switch(action) {
    case 'start':
      oscillator.type = 'sine';
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.1;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 100);
      break;
    case 'pause':
      oscillator.type = 'sine';
      oscillator.frequency.value = 660;
      gainNode.gain.value = 0.1;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 100);
      break;
    case 'stop':
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      gainNode.gain.value = 0.1;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 200);
      break;
    case 'lap':
      oscillator.type = 'sine';
      oscillator.frequency.value = 1320;
      gainNode.gain.value = 0.05;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 50);
      break;
    case 'reset':
      oscillator.type = 'sine';
      oscillator.frequency.value = 220;
      gainNode.gain.value = 0.1;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 300);
      break;
    case 'export':
      oscillator.type = 'sine';
      oscillator.frequency.value = 1760;
      gainNode.gain.value = 0.1;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 150);
      break;
  }
}