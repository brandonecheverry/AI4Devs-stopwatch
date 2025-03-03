document.getElementById('stopwatch-btn').addEventListener('click', () => {
  document.getElementById('stopwatch').classList.remove('hidden');
  document.getElementById('countdown').classList.add('hidden');
  document.getElementById('menu').classList.add('hidden'); // Hide the menu
  
  // Smooth fade-in effect
  setTimeout(() => {
    document.getElementById('stopwatch').style.opacity = '1';
  }, 10);
});

document.getElementById('countdown-btn').addEventListener('click', () => {
  document.getElementById('stopwatch').classList.add('hidden');
  document.getElementById('countdown').classList.remove('hidden');
  document.getElementById('menu').classList.add('hidden'); // Hide the menu
  
  // Smooth fade-in effect
  setTimeout(() => {
    document.getElementById('countdown').style.opacity = '1';
  }, 10);
});

let stopwatchInterval;
let stopwatchTime = 0;

document.getElementById('start-stopwatch').addEventListener('click', () => {
  document.getElementById('start-stopwatch').classList.add('hidden');
  document.getElementById('stop-stopwatch').classList.remove('hidden');
  stopwatchInterval = setInterval(() => {
    stopwatchTime += 10;
    document.getElementById('stopwatch-display').textContent = new Date(stopwatchTime).toISOString().substr(11, 12);
  }, 10);
});

document.getElementById('stop-stopwatch').addEventListener('click', () => {
  document.getElementById('start-stopwatch').classList.remove('hidden');
  document.getElementById('stop-stopwatch').classList.add('hidden');
  clearInterval(stopwatchInterval);
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  document.getElementById('stopwatch-display').textContent = "00:00:00.000";
  document.getElementById('start-stopwatch').classList.remove('hidden');
  document.getElementById('stop-stopwatch').classList.add('hidden');
});

// Countdown functionality
let countdownDisplay = document.getElementById('countdown-display');
let countdownDigits = "000000000"; // HHmmssSSS format
let savedCountdownTime = "000000000"; // Store the time set by the user
let countdownInterval; // For the setInterval
let countdownTimeRemaining = 0; // Time remaining in milliseconds

// Initialize the display
function initCountdown() {
  countdownDigits = "000000000";
  updateCountdownDisplay();
  
  // Show setup controls, hide timer controls
  document.getElementById('countdown-setup-controls').classList.remove('hidden');
  document.getElementById('countdown-timer-controls').classList.add('hidden');
  document.getElementById('digit-pad').classList.remove('hidden');
  
  // Reset start/pause button state
  document.getElementById('start-countdown').classList.remove('hidden');
  document.getElementById('pause-countdown').classList.add('hidden');
}

// Update the display with the current digits
function updateCountdownDisplay() {
  let hours = countdownDigits.substring(0, 2);
  let minutes = countdownDigits.substring(2, 4);
  let seconds = countdownDigits.substring(4, 6);
  let milliseconds = countdownDigits.substring(6, 9);
  countdownDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Handle digit button clicks - correct digit shifting behavior
document.querySelectorAll('.digit-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Get the digit value
    const digitValue = button.textContent;
    
    // We'll manipulate the HHmmss part only (first 6 characters)
    let timePartDigits = countdownDigits.substring(0, 6);
    
    // Shift all digits one position to the left and add new digit at the end
    timePartDigits = timePartDigits.substring(1) + digitValue;
    
    // Combine with milliseconds part (unchanged)
    countdownDigits = timePartDigits + countdownDigits.substring(6);
    
    updateCountdownDisplay();
  });
});

// Convert the time string to milliseconds
function timeStringToMs(timeString) {
  const hours = parseInt(timeString.substring(0, 2));
  const minutes = parseInt(timeString.substring(2, 4));
  const seconds = parseInt(timeString.substring(4, 6));
  const ms = parseInt(timeString.substring(6, 9));
  
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + ms;
}

// Convert milliseconds to time string format
function msToTimeString(ms) {
  // Ensure ms is not negative
  if (ms < 0) ms = 0;
  
  const totalSeconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}${milliseconds.toString().padStart(3, '0')}`;
}

// Handle "Set" button click
document.getElementById('set-countdown').addEventListener('click', () => {
  // Reset milliseconds to 000 when set is pressed and save the time
  countdownDigits = countdownDigits.substring(0, 6) + "000";
  savedCountdownTime = countdownDigits;
  
  // Calculate time in milliseconds
  countdownTimeRemaining = timeStringToMs(countdownDigits);
  
  // Hide digit pad and setup controls
  document.getElementById('digit-pad').classList.add('hidden');
  document.getElementById('countdown-setup-controls').classList.add('hidden');
  
  // Show timer controls
  document.getElementById('countdown-timer-controls').classList.remove('hidden');
  
  updateCountdownDisplay();
});

// Handle "Clear" button click
document.getElementById('clear-countdown').addEventListener('click', () => {
  initCountdown();
});

// Handle "Start/Pause" countdown
document.getElementById('start-countdown').addEventListener('click', () => {
  // Switch to pause button
  document.getElementById('start-countdown').classList.add('hidden');
  document.getElementById('pause-countdown').classList.remove('hidden');
  
  // Start countdown timer
  const startTime = Date.now();
  countdownInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    countdownTimeRemaining -= 10; // Decrease by 10ms (interval time)
    
    if (countdownTimeRemaining <= 0) {
      // Time's up!
      clearInterval(countdownInterval);
      countdownTimeRemaining = 0;
      countdownDigits = "000000000";
      updateCountdownDisplay();
      
      // Reset button state
      document.getElementById('start-countdown').classList.remove('hidden');
      document.getElementById('pause-countdown').classList.add('hidden');
      
      // Notification sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
      audio.play().catch(e => console.log('No se pudo reproducir el audio: ', e));
      
      // Visual notification instead of alert
      const display = document.getElementById('countdown-display');
      display.style.color = 'var(--accent-color)';
      display.textContent = '¡Tiempo!';
      
      setTimeout(() => {
        display.style.color = '';
        updateCountdownDisplay();
      }, 3000);
      
      return;
    }
    
    // Update display with remaining time
    countdownDigits = msToTimeString(countdownTimeRemaining);
    updateCountdownDisplay();
  }, 10);
});

document.getElementById('pause-countdown').addEventListener('click', () => {
  // Switch to start button
  document.getElementById('start-countdown').classList.remove('hidden');
  document.getElementById('pause-countdown').classList.add('hidden');
  
  // Pause countdown timer
  clearInterval(countdownInterval);
});

// Handle "Reset" countdown
document.getElementById('reset-countdown').addEventListener('click', () => {
  // Stop any running countdown
  clearInterval(countdownInterval);
  
  // Restore saved time
  countdownDigits = savedCountdownTime;
  countdownTimeRemaining = timeStringToMs(savedCountdownTime);
  
  // Reset button state
  document.getElementById('start-countdown').classList.remove('hidden');
  document.getElementById('pause-countdown').classList.add('hidden');
  
  updateCountdownDisplay();
});

// Handle "Atrás" (Back) button click for countdown
document.getElementById('back-countdown').addEventListener('click', () => {
  // Stop any running countdown
  clearInterval(countdownInterval);
  
  // Hide countdown section
  document.getElementById('countdown').classList.add('hidden');
  // Show menu
  document.getElementById('menu').classList.remove('hidden');
  // Reset countdown state completely
  initCountdown();
});

// Handle "Atrás" (Back) button click for stopwatch
document.getElementById('back-stopwatch').addEventListener('click', () => {
  // Hide stopwatch section
  document.getElementById('stopwatch').classList.add('hidden');
  // Show menu
  document.getElementById('menu').classList.remove('hidden');
  // Reset stopwatch
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  document.getElementById('stopwatch-display').textContent = "00:00:00.000";
  document.getElementById('start-stopwatch').classList.remove('hidden');
  document.getElementById('stop-stopwatch').classList.add('hidden');
});

// Mejoras para el manejo de eventos táctiles en dispositivos móviles
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('touchstart', function() {
    this.classList.add('touch-active');
  });
  
  button.addEventListener('touchend', function() {
    this.classList.remove('touch-active');
  });
});

// Initialize countdown when the page loads
initCountdown();

// Add CSS classes for initial animations
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
});
