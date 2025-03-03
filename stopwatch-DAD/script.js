/**
 * Stopwatch and Countdown
 * 
 * This script implements the functionality of a stopwatch and a countdown
 * using vanilla JavaScript without frameworks.
 * 
 * Features:
 * - Stopwatch with millisecond precision
 * - Configurable countdown
 * - Intuitive user interface
 * - Local storage for configurations
 * - Enhanced accessibility
 * @author Senior Frontend Developer
 */

// Global variables for the stopwatch
let cronometroInterval;
let cronometroStartTime;
let cronometroPausedTime = 0;
let cronometroRunning = false;

// Global variables for the countdown
let cuentaAtrasInterval;
let cuentaAtrasEndTime;
let cuentaAtrasPausedTime = 0;
let cuentaAtrasRunning = false;
let cuentaAtrasValue = 0; // Value in milliseconds

// DOM elements
const seleccionInicial = document.getElementById('seleccion-inicial');
const cronometroSection = document.getElementById('cronometro');
const cuentaAtrasSection = document.getElementById('cuenta-atras');

// Stopwatch elements
const cronometroDisplay = document.getElementById('cronometro-display');
const cronometroMs = document.getElementById('cronometro-ms');
const cronometroStartBtn = document.getElementById('cronometro-start');
const cronometroPauseBtn = document.getElementById('cronometro-pause');
const cronometroResetBtn = document.getElementById('cronometro-reset');
const cronometroBackBtn = document.getElementById('cronometro-back');

// Countdown elements
const cuentaAtrasDisplay = document.getElementById('cuenta-atras-display');
const cuentaAtrasMs = document.getElementById('cuenta-atras-ms');
const cuentaAtrasRunningDisplay = document.getElementById('cuenta-atras-running-display');
const cuentaAtrasRunningMs = document.getElementById('cuenta-atras-running-ms');
const cuentaAtrasConfig = document.getElementById('cuenta-atras-config');
const cuentaAtrasControles = document.getElementById('cuenta-atras-controles');
const cuentaAtrasStartBtn = document.getElementById('cuenta-atras-start');
const cuentaAtrasPauseBtn = document.getElementById('cuenta-atras-pause');
const cuentaAtrasResetBtn = document.getElementById('cuenta-atras-reset');
const cuentaAtrasBackBtn = document.getElementById('cuenta-atras-back');
const numBtns = document.querySelectorAll('.num-btn');
const setBtn = document.getElementById('set-btn');
const clearBtn = document.getElementById('clear-btn');

// Notification element
const notification = document.getElementById('notification');

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    // Configure events for initial selection
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const option = card.getAttribute('data-option');
            showSection(option);
        });
        
        // Accessibility: allow keyboard selection
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const option = card.getAttribute('data-option');
                showSection(option);
            }
        });
    });

    // Configure events for the stopwatch
    cronometroStartBtn.addEventListener('click', startCronometro);
    cronometroPauseBtn.addEventListener('click', pauseCronometro);
    cronometroResetBtn.addEventListener('click', resetCronometro);
    cronometroBackBtn.addEventListener('click', () => showSection('inicial'));

    // Configure events for the countdown
    numBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const num = btn.getAttribute('data-num');
            addNumberToCuentaAtras(num);
        });
    });
    
    setBtn.addEventListener('click', setCuentaAtras);
    clearBtn.addEventListener('click', clearCuentaAtras);
    cuentaAtrasStartBtn.addEventListener('click', startCuentaAtras);
    cuentaAtrasPauseBtn.addEventListener('click', pauseCuentaAtras);
    cuentaAtrasResetBtn.addEventListener('click', resetCuentaAtras);
    cuentaAtrasBackBtn.addEventListener('click', () => showSection('inicial'));

    // Load saved settings
    loadSavedSettings();
    
    // Configure keyboard accessibility
    setupKeyboardShortcuts();
});

/**
 * Shows the selected section and hides the others
 * @param {string} section - Name of the section to show ('inicial', 'cronometro', 'cuenta-atras')
 */
function showSection(section) {
    // Hide all sections
    seleccionInicial.classList.add('hidden');
    cronometroSection.classList.add('hidden');
    cuentaAtrasSection.classList.add('hidden');
    
    // Show the selected section
    switch (section) {
        case 'inicial':
            seleccionInicial.classList.remove('hidden');
            // Stop stopwatch and countdown if active
            if (cronometroRunning) pauseCronometro();
            if (cuentaAtrasRunning) pauseCuentaAtras();
            break;
        case 'cronometro':
            cronometroSection.classList.remove('hidden');
            break;
        case 'cuenta-atras':
            cuentaAtrasSection.classList.remove('hidden');
            break;
    }
}

/**
 * STOPWATCH FUNCTIONS
 */

/**
 * Starts the stopwatch
 */
function startCronometro() {
    if (cronometroRunning) return;
    
    cronometroRunning = true;
    cronometroStartBtn.classList.add('hidden');
    cronometroPauseBtn.classList.remove('hidden');
    
    const now = Date.now();
    
    if (cronometroPausedTime > 0) {
        // If it was paused, adjust the start time
        cronometroStartTime = now - cronometroPausedTime;
    } else {
        // If it's new, set the start time
        cronometroStartTime = now;
    }
    
    // Start the interval to update the display
    cronometroInterval = setInterval(updateCronometro, 10); // Update every 10ms for greater precision
    
    // Add class for animation
    document.querySelector('.timer-display').classList.add('timer-active');
}

/**
 * Pauses the stopwatch
 */
function pauseCronometro() {
    if (!cronometroRunning) return;
    
    cronometroRunning = false;
    clearInterval(cronometroInterval);
    cronometroPausedTime = Date.now() - cronometroStartTime;
    
    cronometroStartBtn.classList.remove('hidden');
    cronometroPauseBtn.classList.add('hidden');
    
    // Remove animation class
    document.querySelector('.timer-display').classList.remove('timer-active');
}

/**
 * Resets the stopwatch
 */
function resetCronometro() {
    clearInterval(cronometroInterval);
    cronometroRunning = false;
    cronometroPausedTime = 0;
    
    cronometroStartBtn.classList.remove('hidden');
    cronometroPauseBtn.classList.add('hidden');
    
    // Reset display
    cronometroDisplay.textContent = '00:00:00';
    cronometroMs.textContent = '000';
    
    // Remove animation class
    document.querySelector('.timer-display').classList.remove('timer-active');
}

/**
 * Updates the stopwatch display
 */
function updateCronometro() {
    const elapsedTime = Date.now() - cronometroStartTime;
    const formattedTime = formatTime(elapsedTime);
    
    cronometroDisplay.textContent = formattedTime.main;
    cronometroMs.textContent = formattedTime.ms;
}

/**
 * COUNTDOWN FUNCTIONS
 */

/**
 * Adds a number to the countdown configuration
 * @param {string} num - Number to add (0-9)
 */
function addNumberToCuentaAtras(num) {
    // Get the current time
    const currentTime = cuentaAtrasDisplay.textContent;
    
    // Remove colons to manipulate as string
    let timeStr = currentTime.replace(/:/g, '');
    
    // Add the new number and shift to the left
    timeStr = timeStr.substring(1) + num;
    
    // Format again with colons
    const newTime = timeStr.substring(0, 2) + ':' + timeStr.substring(2, 4) + ':' + timeStr.substring(4, 6);
    
    cuentaAtrasDisplay.textContent = newTime;
    
    // Calculate the value in milliseconds
    const hours = parseInt(timeStr.substring(0, 2));
    const minutes = parseInt(timeStr.substring(2, 4));
    const seconds = parseInt(timeStr.substring(4, 6));
    
    cuentaAtrasValue = (hours * 3600 + minutes * 60 + seconds) * 1000;
}

/**
 * Clears the countdown configuration
 */
function clearCuentaAtras() {
    cuentaAtrasDisplay.textContent = '00:00:00';
    cuentaAtrasMs.textContent = '000';
    cuentaAtrasValue = 0;
}

/**
 * Sets the countdown and shows the controls
 */
function setCuentaAtras() {
    if (cuentaAtrasValue <= 0) {
        // Show error notification
        showNotification('Please set a valid time');
        return;
    }
    
    // Show controls and hide configuration
    cuentaAtrasConfig.classList.add('hidden');
    cuentaAtrasControles.classList.remove('hidden');
    
    // Set the initial display
    const formattedTime = formatTime(cuentaAtrasValue);
    cuentaAtrasRunningDisplay.textContent = formattedTime.main;
    cuentaAtrasRunningMs.textContent = formattedTime.ms;
    
    // Save configuration
    saveSettings();
}

/**
 * Starts the countdown
 */
function startCuentaAtras() {
    if (cuentaAtrasRunning) return;
    
    cuentaAtrasRunning = true;
    cuentaAtrasStartBtn.classList.add('hidden');
    cuentaAtrasPauseBtn.classList.remove('hidden');
    
    const now = Date.now();
    
    if (cuentaAtrasPausedTime > 0) {
        // If it was paused, adjust the end time
        cuentaAtrasEndTime = now + cuentaAtrasPausedTime;
    } else {
        // If it's new, set the end time
        cuentaAtrasEndTime = now + cuentaAtrasValue;
    }
    
    // Start the interval to update the display
    cuentaAtrasInterval = setInterval(updateCuentaAtras, 10); // Update every 10ms for greater precision
    
    // Add class for animation
    document.querySelectorAll('.timer-display')[1].classList.add('timer-active');
}

/**
 * Pauses the countdown
 */
function pauseCuentaAtras() {
    if (!cuentaAtrasRunning) return;
    
    cuentaAtrasRunning = false;
    clearInterval(cuentaAtrasInterval);
    cuentaAtrasPausedTime = cuentaAtrasEndTime - Date.now();
    
    cuentaAtrasStartBtn.classList.remove('hidden');
    cuentaAtrasPauseBtn.classList.add('hidden');
    
    // Remove animation class
    document.querySelectorAll('.timer-display')[1].classList.remove('timer-active');
}

/**
 * Resets the countdown
 */
function resetCuentaAtras() {
    clearInterval(cuentaAtrasInterval);
    cuentaAtrasRunning = false;
    cuentaAtrasPausedTime = 0;
    
    // Return to configuration
    cuentaAtrasConfig.classList.remove('hidden');
    cuentaAtrasControles.classList.add('hidden');
    
    cuentaAtrasStartBtn.classList.remove('hidden');
    cuentaAtrasPauseBtn.classList.add('hidden');
    
    // Reset display
    cuentaAtrasDisplay.textContent = '00:00:00';
    cuentaAtrasMs.textContent = '000';
    
    // Remove animation classes
    document.querySelectorAll('.timer-display')[1].classList.remove('timer-active');
    document.querySelectorAll('.timer-display')[1].classList.remove('warning');
    document.querySelectorAll('.timer-display')[1].classList.remove('finished');
}

/**
 * Updates the countdown display
 */
function updateCuentaAtras() {
    const remainingTime = cuentaAtrasEndTime - Date.now();
    
    if (remainingTime <= 0) {
        // Time finished
        clearInterval(cuentaAtrasInterval);
        cuentaAtrasRunning = false;
        cuentaAtrasPausedTime = 0;
        
        cuentaAtrasRunningDisplay.textContent = '00:00:00';
        cuentaAtrasRunningMs.textContent = '000';
        
        cuentaAtrasStartBtn.classList.remove('hidden');
        cuentaAtrasPauseBtn.classList.add('hidden');
        
        // Show notification
        showNotification('Time\'s up!');
        
        // Play sound (optional)
        playAlarmSound();
        
        // Add class for completion animation
        document.querySelectorAll('.timer-display')[1].classList.remove('timer-active');
        document.querySelectorAll('.timer-display')[1].classList.remove('warning');
        document.querySelectorAll('.timer-display')[1].classList.add('finished');
        
        return;
    }
    
    // Format and display the remaining time
    const formattedTime = formatTime(remainingTime);
    cuentaAtrasRunningDisplay.textContent = formattedTime.main;
    cuentaAtrasRunningMs.textContent = formattedTime.ms;
    
    // Add visual warning when less than 10 seconds remain
    if (remainingTime < 10000 && !document.querySelectorAll('.timer-display')[1].classList.contains('warning')) {
        document.querySelectorAll('.timer-display')[1].classList.add('warning');
    }
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Formats time in milliseconds to HH:MM:SS.mmm format
 * @param {number} timeInMs - Time in milliseconds
 * @returns {Object} - Object with formatted time {main: 'HH:MM:SS', ms: 'mmm'}
 */
function formatTime(timeInMs) {
    // Ensure time is not negative
    timeInMs = Math.max(0, timeInMs);
    
    const ms = timeInMs % 1000;
    const seconds = Math.floor(timeInMs / 1000) % 60;
    const minutes = Math.floor(timeInMs / (1000 * 60)) % 60;
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    
    // Format with leading zeros
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMs = String(ms).padStart(3, '0');
    
    return {
        main: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
        ms: formattedMs
    };
}

/**
 * Shows a notification
 * @param {string} message - Message to display
 */
function showNotification(message) {
    notification.querySelector('p').textContent = message;
    notification.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

/**
 * Plays an alarm sound
 */
function playAlarmSound() {
    // Create an audio element
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLHPM+N2fUBECFVK26PbepGYcBgkwdL7y+fPauHQpDRIwaLTp/P/97NDDYi4PIjFqrN/1//z54cNwNw0dKmG23v7//vfSu38+FB4oXrvt/////86vjVIaHhxQp+f/////xpuMYyYcFj6T1P////+/jIxuMhwQK3TG/////76FgHk9GwwkZLn4////yH1tgEUcCRpLpvL////TdWOFTiEGFDiO4P///+FtWIVVJQUPKXfV////6mhOhV0pBAsdWc3////yZEaFYy8ECRhJwP////RhQoVoNQIHEzS1/////2A/hW05AQUQKaf/////YT2FcD4BBAwenv////9iPYVzQgEDCRuS/////2M9hXZGAQIHF4z/////ZD2Fd0sBAQYVhv////9lPoV6TwEBBRKC/////2Y+hXxTAQEEEH//////Zz+FflcBAQMOeP////9oP4WAWwEBAg10/////2k/hYJeAQECDHD/////aj+Fg2IBAAEKbP////9rQIWFZgEAAQln/////2xAhYZpAQABCGP/////bUCFiG0BAAEHYf////9uQYWJcAEAAQZd/////29BhYpzAQABBVn/////cEGFjHYBAAEEVv////9xQoWNeQEAAQNU/////3JChY58AQABAlH/////c0KFkH8BAAEBT/////90QoWRggEAAQFM/////3VChZOFAQABAUr/////dkOFlYgBAAEBSP////93Q4WXiwEAAQFF/////3hDhZmOAQABAUP/////eUOFm5EBAAEAQP////96RIWdlAEAAQA+/////3tEhZ6XAQABADz/////fESFoJoBAQEAO/////99RIWinQEBAQA5/////35EhaOfAQEBADf/////f0WFpKIBAQEANv////+ARYWmpQEBAQA0/////4FGhaimAQEBADP/////gkaFqqsBAQEAMv////+DRoWsrgEBAQAw/////4RHha+wAQEBAC//////hUeFsbMBAQEALf////+GSIWztgEBAQAs/////4dIhbW5AQEBAir/////iEiFt7wBAQECKf////+JSYa5vgEBAQIn/////4pJhrvBAQEBAib/////i0qGvcMBAQECJP////+MSoa/xgEBAQIj/////41Lh8HIAQEBAiH/////jkuHw8sBAQECIP////+PS4fFzQEBAQIe/////5BMh8fQAQEBAh3/////kUyHydIBAQECG/////+STYfL1QEBAQIa/////5NNh83XAQEBAhj/////lE6Hz9oBAQECF/////+VTofR3AEBAQIw/////5ZPh9LfAQEBAjr/////l0+H1OEBAQECJf////+YUIjW5AEBAQIf/////5lQiNjmAQEBAhn/////mlGI2ukBAQECE/////+bUYjc6wEBAQIO/////5xSiN7tAQEBAh7/////nVKI4PABAQECKf////+eU4jh8gEBAQIz/////59TiOP0AQEBAj3/////oFSI5PcBAQECR/////+hVIjm+QEBAQJSf////6JViOj7AQEBAmyI////o1WI6f0BAQECgZD///+kVojr/gEBAQKWl////6VXiez/AQEBAqyd////plqM7f8BAQECwKX///+nXo/u/wEBAQLTrf///6hkku//AQEBAvK2////qWqW8P8BAQEC8Ln///+qdJvy/wEBAQL7wv///6t+n/P/AQEBA/fH////rIej9P8BAQED/c3///+tjaL1/wEBAQQM1v///66Xo/b/AQEBBCDf////r6Gl9/8BAQEENOj///+wq6b4/wEBAQRI8f///7G1p/n/AQEBBVz6////sr+o+v8BAQEF/P////+zyaj7/wEBAQb/////tNOp/P8BAQEH/////7Xdqv3/AQEBB/////+24qv+/wEBAQj/////t+ys//8BAQEI/////7jvrf//AQEBCP////+5863//wEBAQn/////uvSu//8BAQEJ/////7v1r///AQEBC/////+89q///wEBAQv/////vfew//8BAQEM/////772sP//AQEBD/////+/97H//wEBAQ//////wPex//8BAQEQ/////8H4sf//AQEBEP////+/+LL//wEBARL/////vviy//8BAQET/////7z5s///AQEBFP////+7+bP//wEBARb/////ufq0//8BAgEX/////7j6tP//AQIBGP////+2+7X//wECARr/////tfu1//8BAgEc/////7P8tv//AQIBH/////+y/Lb//wECASD/////sPy3//8BAgEi/////6/9t///AQIBJ/////+t/bj//wECASj/////rP24//8BAgEq/////6r+uf//AQIBK/////+p/rn//wECATP/////p/66//8BAgE0/////6b+u///AQIBNP////+k/7v//wECATb/////o/+8//8BAgE3/////6H/vP//AQIBN/////+g/73//wECATn/////n/+9//8BAgE6/////53/vv//AQIBO/////+c/77//wECATz/////mv++//8BAgE9/////5n/v///AQIBQP////+X/7///wECAUH/////lv/A//8BAgFC/////5T/wP//AQIBQ/////+T/8H//wECAUT/////kf/B//8BAgFF/////5D/wv//AQIBR/////+O/8L//wECAUj/////jf/D//8BAgFJ/////4v/w///AQIBS/////+K/8T//wECAUz/////iP/E//8BAgFN/////4f/xf//AQIBT/////+F/8X//wECAVD/////hP/G//8BAgFR/////4L/xv//AQIBVP////+A/8f//wECAVX/////f//H//8BAgFW/////33/yP//AQIBWP////97/8j//wECAVn/////ev/J//8BAgFb/////3j/yf//AQIBXP////93/8r//wECAV3/////df/K//8BAgFf/////3T/y///AQIBX/////9z/8v//wECAWH/////cf/M//8BAgFi/////3D/zP//AQIBY/////9u/83//wECAWX/////bf/N//8BAgFm/////2v/zv//AQIBZ/////9q/87//wECAWn/////aP/P//8BAgFq/////2f/z///AQIBW/////9m/9D//wECAUz/////Zf/Q//8BAgE9/////2P/0f//AQIBMP////9i/9H//wECASP/////YP/S//8BAgEW/////1//0v//AQIBDP////9d/9P//wECAQP/////XP/T//8BAgAA';
    
    // Play the sound
    audio.play();
}

/**
 * Saves the settings in local storage
 */
function saveSettings() {
    const settings = {
        cuentaAtrasValue: cuentaAtrasValue
    };
    
    localStorage.setItem('cronometroSettings', JSON.stringify(settings));
}

/**
 * Loads saved settings
 */
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('cronometroSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        if (settings.cuentaAtrasValue) {
            cuentaAtrasValue = settings.cuentaAtrasValue;
            const formattedTime = formatTime(cuentaAtrasValue);
            cuentaAtrasDisplay.textContent = formattedTime.main;
            cuentaAtrasMs.textContent = formattedTime.ms;
        }
    }
}

/**
 * Sets up keyboard shortcuts to improve accessibility
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Avoid shortcuts if typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.key) {
            case 'Escape':
                // Return to home screen
                showSection('inicial');
                break;
            case ' ':
                // Start/Pause the active stopwatch or countdown
                if (!seleccionInicial.classList.contains('hidden')) return;
                
                if (!cronometroSection.classList.contains('hidden')) {
                    if (cronometroRunning) {
                        pauseCronometro();
                    } else {
                        startCronometro();
                    }
                } else if (!cuentaAtrasSection.classList.contains('hidden')) {
                    if (!cuentaAtrasControles.classList.contains('hidden')) {
                        if (cuentaAtrasRunning) {
                            pauseCuentaAtras();
                        } else {
                            startCuentaAtras();
                        }
                    }
                }
                break;
            case 'r':
            case 'R':
                // Reset the active stopwatch or countdown
                if (!seleccionInicial.classList.contains('hidden')) return;
                
                if (!cronometroSection.classList.contains('hidden')) {
                    resetCronometro();
                } else if (!cuentaAtrasSection.classList.contains('hidden')) {
                    resetCuentaAtras();
                }
                break;
        }
    });
} 