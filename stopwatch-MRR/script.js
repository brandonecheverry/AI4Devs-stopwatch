// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Tab elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Stopwatch elements
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  const stopwatchStartBtn = document.getElementById('stopwatch-start');
  const stopwatchResetBtn = document.getElementById('stopwatch-reset');
  
  // Countdown elements
  const countdownDisplay = document.getElementById('countdown-display');
  const numpadButtons = document.querySelectorAll('.numpad-btn');
  const setCountdownBtn = document.getElementById('set-countdown');
  const countdownControls = document.getElementById('countdown-controls');
  const numpad = document.getElementById('numpad');
  const countdownStartBtn = document.getElementById('countdown-start');
  const countdownResetBtn = document.getElementById('countdown-reset');
  
  // Sound elements
  const startSound = document.getElementById('start-sound');
  const endSound = document.getElementById('end-sound');
  
  // State variables
  let stopwatchInterval = null;
  let countdownInterval = null;
  let stopwatchRunning = false;
  let countdownRunning = false;
  let stopwatchSeconds = 0;
  let countdownSeconds = 0;
  let countdownValue = '';
  let lastSetCountdownValue = 0;
  
  // ============================================================
  // Utility Functions
  // ============================================================
  
  /**
   * Format seconds to HH:MM:SS format
   * @param {number} totalSeconds - Total seconds to format
   * @return {string} Formatted time string
   */
  const formatTime = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return [hours, minutes, seconds]
          .map(val => val.toString().padStart(2, '0'))
          .join(':');
  };
  
  /**
   * Play sound effect
   * @param {HTMLAudioElement} sound - Audio element to play
   */
  const playSound = (sound) => {
      // Reset sound to beginning in case it's already playing
      sound.pause();
      sound.currentTime = 0;
      
      // Play sound
      sound.play().catch(error => {
          console.warn('Sound could not be played:', error);
      });
  };
  
  /**
   * Add pulse animation to timer display
   * @param {HTMLElement} element - Element to animate
   * @param {boolean} active - Whether to add or remove animation
   */
  const animateTimer = (element, active) => {
      if (active) {
          element.classList.add('timer-active');
      } else {
          element.classList.remove('timer-active');
      }
  };
  
  /**
   * Reset all timers and state when switching tabs
   */
  const resetAllTimers = () => {
      // Stop intervals
      if (stopwatchInterval) {
          clearInterval(stopwatchInterval);
          stopwatchInterval = null;
      }
      
      if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
      }
      
      // Reset stopwatch
      stopwatchRunning = false;
      stopwatchSeconds = 0;
      stopwatchDisplay.textContent = formatTime(0);
      stopwatchStartBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
      animateTimer(stopwatchDisplay, false);
      
      // Reset countdown
      countdownRunning = false;
      countdownSeconds = 0;
      countdownValue = '';
      countdownDisplay.textContent = formatTime(0);
      countdownStartBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
      animateTimer(countdownDisplay, false);
      countdownDisplay.classList.remove('timer-completed');
      
      // Show numpad, hide controls
      numpad.classList.remove('hidden');
      countdownControls.classList.add('hidden');
  };
  
  // ============================================================
  // Tab Functionality
  // ============================================================
  
  /**
   * Handle tab switching
   */
  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          const target = button.dataset.target;
          
          // Apply fade transition
          tabPanes.forEach(pane => {
              pane.classList.add('tab-transition');
              pane.style.opacity = 0;
          });
          
          // After short delay, switch tabs
          setTimeout(() => {
              // Update active tab button
              tabButtons.forEach(btn => {
                  btn.classList.remove('active');
              });
              button.classList.add('active');
              
              // Update active tab pane
              tabPanes.forEach(pane => {
                  pane.classList.remove('active');
                  if (pane.id === target) {
                      pane.classList.add('active');
                      setTimeout(() => {
                          pane.style.opacity = 1;
                      }, 50);
                  }
              });
              
              // Reset timers when switching tabs
              resetAllTimers();
          }, 300);
      });
  });
  
  // ============================================================
  // Stopwatch Functionality
  // ============================================================
  
  /**
   * Start or pause the stopwatch
   */
  const toggleStopwatch = () => {
      if (!stopwatchRunning) {
          // Start stopwatch
          stopwatchRunning = true;
          stopwatchStartBtn.innerHTML = '<i class="fas fa-pause"></i> Detener';
          animateTimer(stopwatchDisplay, true);
          playSound(startSound);
          
          // Start interval
          stopwatchInterval = setInterval(() => {
              stopwatchSeconds++;
              stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
          }, 1000);
      } else {
          // Stop stopwatch
          stopwatchRunning = false;
          stopwatchStartBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
          animateTimer(stopwatchDisplay, false);
          
          // Clear interval
          clearInterval(stopwatchInterval);
          stopwatchInterval = null;
      }
  };
  
  /**
   * Reset the stopwatch
   */
  const resetStopwatch = () => {
      // Stop if running
      if (stopwatchRunning) {
          toggleStopwatch();
      }
      
      // Reset seconds and display
      stopwatchSeconds = 0;
      stopwatchDisplay.textContent = formatTime(0);
  };
  
  // Stopwatch button event listeners
  stopwatchStartBtn.addEventListener('click', toggleStopwatch);
  stopwatchResetBtn.addEventListener('click', resetStopwatch);
  
  // ============================================================
  // Countdown Functionality
  // ============================================================
  
  /**
   * Update countdown display from numpad input
   * @param {string} value - Digit to add to countdown
   */
  const updateCountdownInput = (value) => {
      // If we already have 6 digits, ignore
      if (countdownValue.length >= 6) return;
      
      // Add digit to value
      countdownValue += value;
      
      // Shift values (right to left) to update HH:MM:SS format
      // For example, if we have "12" and press 3:
      // - Initially it shows as 00:00:12
      // - After pressing 3, it becomes 00:01:23
      let displayValue = countdownValue.padStart(6, '0');
      let hours = parseInt(displayValue.substring(0, 2), 10);
      let minutes = parseInt(displayValue.substring(2, 4), 10);
      let seconds = parseInt(displayValue.substring(4, 6), 10);
      
      // Format and display
      countdownDisplay.textContent = formatTime(hours * 3600 + minutes * 60 + seconds);
      
      // Add highlight effect
      countdownDisplay.classList.add('highlight');
      setTimeout(() => {
          countdownDisplay.classList.remove('highlight');
      }, 300);
  };
  
  /**
   * Set the countdown time and show start/reset controls
   */
  const setCountdown = () => {
      // Parse display to get total seconds
      const timeDisplay = countdownDisplay.textContent;
      const [hours, minutes, seconds] = timeDisplay.split(':').map(num => parseInt(num, 10));
      countdownSeconds = hours * 3600 + minutes * 60 + seconds;
      lastSetCountdownValue = countdownSeconds;
      
      // If no time set, do nothing
      if (countdownSeconds === 0) return;
      
      // Hide numpad, show controls
      numpad.classList.add('hidden');
      countdownControls.classList.remove('hidden');
  };
  
  /**
   * Start or pause the countdown
   */
  const toggleCountdown = () => {
      if (!countdownRunning) {
          // If countdown is at 0, don't start
          if (countdownSeconds === 0) return;
          
          // Start countdown
          countdownRunning = true;
          countdownStartBtn.innerHTML = '<i class="fas fa-pause"></i> Detener';
          animateTimer(countdownDisplay, true);
          playSound(startSound);
          
          // Start interval
          countdownInterval = setInterval(() => {
              countdownSeconds--;
              countdownDisplay.textContent = formatTime(countdownSeconds);
              
              // If reached zero, stop countdown
              if (countdownSeconds === 0) {
                  clearInterval(countdownInterval);
                  countdownInterval = null;
                  countdownRunning = false;
                  countdownStartBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
                  animateTimer(countdownDisplay, false);
                  countdownDisplay.classList.add('timer-completed');
                  playSound(endSound);
              }
          }, 1000);
      } else {
          // Stop countdown
          countdownRunning = false;
          countdownStartBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
          animateTimer(countdownDisplay, false);
          
          // Clear interval
          clearInterval(countdownInterval);
          countdownInterval = null;
      }
  };
  
  /**
   * Reset the countdown to last set value
   */
  const resetCountdown = () => {
      // Stop if running
      if (countdownRunning) {
          toggleCountdown();
      }
      
      // Reset to last set value
      countdownSeconds = lastSetCountdownValue;
      countdownDisplay.textContent = formatTime(countdownSeconds);
      countdownDisplay.classList.remove('timer-completed');
  };
  
  // Numpad button event listeners
  numpadButtons.forEach(button => {
      if (button.dataset.value) {
          button.addEventListener('click', () => {
              updateCountdownInput(button.dataset.value);
          });
      }
  });
  
  // Countdown button event listeners
  setCountdownBtn.addEventListener('click', setCountdown);
  countdownStartBtn.addEventListener('click', toggleCountdown);
  countdownResetBtn.addEventListener('click', resetCountdown);
  
  // Initialize displays
  stopwatchDisplay.textContent = formatTime(0);
  countdownDisplay.textContent = formatTime(0);
});