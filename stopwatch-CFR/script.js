// DOM elements
const mainPanel = document.getElementById('main-panel');
const stopwatchPanel = document.getElementById('stopwatch-panel');
const countdownPanel = document.getElementById('countdown-panel');

const stopwatchOption = document.getElementById('stopwatch-option');
const countdownOption = document.getElementById('countdown-option');

const stopwatchDisplay = document.querySelector('#stopwatch-display .time-value');
const stopwatchMilliseconds = document.querySelector('#stopwatch-display .milliseconds');
const countdownDisplay = document.querySelector('#countdown-display .time-value');
const countdownMilliseconds = document.querySelector('#countdown-display .milliseconds');

const startPauseBtn = document.getElementById('start-pause-btn');
const clearStopwatchBtn = document.getElementById('clear-stopwatch-btn');

const setBtn = document.getElementById('set-btn');
const clearCountdownBtn = document.getElementById('clear-countdown-btn');
const numButtons = document.querySelectorAll('.btn-num');

const backFromStopwatch = document.getElementById('back-from-stopwatch');
const backFromCountdown = document.getElementById('back-from-countdown');

// Stopwatch variables
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let stopwatchStartTime;
let stopwatchOffset = 0;

// Countdown variables
let countdownInterval;
let countdownRunning = false;
let countdownTime = 0;
let inputSequence = "000000"; // Hours, minutes, seconds (each 2 digits)
let isCountdownMode = false; // Flag to determine if countdown is active
let cameFromCountdown = false; // Bandera para saber si venimos del countdown al stopwatch

// Initialize the application
function init() {
    // Add event listeners
    addEventListeners();
    
    // Initialize displays
    updateStopwatchDisplay(0);
    updateCountdownDisplay();
}

// Add all event listeners
function addEventListeners() {
    // Main panel options
    stopwatchOption.addEventListener('click', navigateToStopwatch);
    countdownOption.addEventListener('click', navigateToCountdown);

    // Stopwatch controls
    startPauseBtn.addEventListener('click', toggleStopwatch);
    clearStopwatchBtn.addEventListener('click', clearStopwatch);
    backFromStopwatch.addEventListener('click', navigateToMain);

    // Countdown controls
    numButtons.forEach(button => {
        button.addEventListener('click', () => {
            const num = button.getAttribute('data-num');
            addNumberToSequence(num);
        });
    });
    
    setBtn.addEventListener('click', setCountdown);
    clearCountdownBtn.addEventListener('click', clearCountdown);
    backFromCountdown.addEventListener('click', navigateToMain);
}

// Navigation functions
function navigateToStopwatch() {
    cameFromCountdown = false;
    mainPanel.classList.remove('active');
    mainPanel.classList.add('move-right');
    
    // Resetear el cronómetro al entrar
    clearStopwatch();
    
    // Dar tiempo para que la transición se complete
    setTimeout(() => {
        stopwatchPanel.classList.add('active');
    }, 50);
}

function navigateToCountdown() {
    // Resetear el temporizador al entrar
    clearCountdown();
    
    mainPanel.classList.remove('active');
    mainPanel.classList.add('move-left');
    
    // Dar tiempo para que la transición se complete
    setTimeout(() => {
        countdownPanel.classList.add('active');
    }, 50);
}

function navigateToMain() {
    // Determinar de qué panel venimos
    if (stopwatchPanel.classList.contains('active')) {
        // Detener el cronómetro si está corriendo y resetearlo
        if (stopwatchRunning) {
            pauseStopwatch();
        }
        clearStopwatch();
        
        stopwatchPanel.classList.remove('active');
        
        // Si vinimos de Countdown a través de Set, preparar el mainPanel
        if (cameFromCountdown) {
            // Preparar el panel principal para que aparezca correctamente
            mainPanel.style.transition = 'none';
            mainPanel.classList.remove('move-left', 'move-right');
            
            // Forzar reflow para aplicar los cambios inmediatamente
            void mainPanel.offsetWidth;
            
            // Restaurar la transición y activar el panel
            mainPanel.style.transition = 'transform 0.5s ease';
            mainPanel.classList.add('active');
            
            // Resetear la bandera
            cameFromCountdown = false;
        } else {
            // Transición normal
            setTimeout(() => {
                mainPanel.classList.remove('move-right');
                mainPanel.classList.add('active');
            }, 50);
        }
    } else if (countdownPanel.classList.contains('active')) {
        // Resetear el temporizador
        clearCountdown();
        
        countdownPanel.classList.remove('active');
        
        // Transición normal
        setTimeout(() => {
            mainPanel.classList.remove('move-left');
            mainPanel.classList.add('active');
        }, 50);
    }
}

// Special transition from countdown to stopwatch
function navigateFromCountdownToStopwatch() {
    cameFromCountdown = true;
    
    // Ocultar el panel de countdown
    countdownPanel.classList.remove('active');
    
    // Posicionar correctamente el panel principal sin transición visible
    mainPanel.style.transition = 'none';
    mainPanel.classList.remove('active');
    mainPanel.classList.add('move-left');
    
    // Forzar un reflow para aplicar los cambios inmediatamente
    void mainPanel.offsetWidth;
    
    // Restaurar la transición normal
    mainPanel.style.transition = 'transform 0.5s ease';
    
    // Activar el panel de stopwatch
    stopwatchPanel.classList.add('active');
}

// Stopwatch functions
function toggleStopwatch() {
    if (!stopwatchRunning) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
}

function startStopwatch() {
    stopwatchRunning = true;
    
    // Cambiar el botón a "Pause"
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.remove('btn-start', 'btn-continue');
    startPauseBtn.classList.add('btn-pause');
    
    // Guardar el tiempo actual para cálculos precisos
    stopwatchStartTime = Date.now() - stopwatchOffset;
    
    // Iniciar el intervalo para actualizar el display
    stopwatchInterval = setInterval(updateStopwatch, 10); // Actualizar cada 10ms para mayor precisión
}

function pauseStopwatch() {
    stopwatchRunning = false;
    
    // Detener el intervalo
    clearInterval(stopwatchInterval);
    
    // Guardar el offset para cuando se continúe
    stopwatchOffset = Date.now() - stopwatchStartTime;
    
    // Cambiar el botón a "Continue"
    startPauseBtn.textContent = 'Continue';
    startPauseBtn.classList.remove('btn-pause');
    startPauseBtn.classList.add('btn-continue');
}

function clearStopwatch() {
    // Detener el cronómetro si está corriendo
    if (stopwatchRunning) {
        pauseStopwatch();
    }
    
    // Limpiar el intervalo por si acaso
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
    }
    
    // Resetear todas las variables
    stopwatchOffset = 0;
    stopwatchTime = 0;
    
    // Resetear el display
    updateStopwatchDisplay(0);
    
    // Resetear el botón a "Start"
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('btn-pause', 'btn-continue');
    startPauseBtn.classList.add('btn-start');
    
    // Si estábamos en modo countdown, volver al modo normal
    isCountdownMode = false;
}

function updateStopwatch() {
    const currentTime = Date.now();
    
    if (isCountdownMode) {
        // En modo countdown, restamos en lugar de sumar
        const elapsed = currentTime - stopwatchStartTime;
        stopwatchTime = countdownTime - elapsed;
        
        // Si llegamos a cero o menos, detenemos
        if (stopwatchTime <= 0) {
            stopwatchTime = 0;
            pauseStopwatch();
            // Aquí se podría añadir algún tipo de alerta o sonido
        }
    } else {
        // Modo normal de cronómetro (hacia adelante)
        stopwatchTime = currentTime - stopwatchStartTime;
    }
    
    updateStopwatchDisplay(stopwatchTime);
}

function updateStopwatchDisplay(timeInMilliseconds) {
    // Asegurarnos de que el tiempo no sea negativo
    timeInMilliseconds = Math.max(0, timeInMilliseconds);
    
    // Convertir milisegundos a horas, minutos, segundos, milisegundos
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);
    
    // Formatear los valores con ceros a la izquierda
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    
    // Actualizar el display
    stopwatchDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    stopwatchMilliseconds.textContent = formattedMilliseconds + '0';
}

// Countdown functions
function addNumberToSequence(num) {
    // Rotar los números hacia la izquierda
    inputSequence = inputSequence.substring(1) + num;
    
    // Actualizar el display del countdown
    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    // Formatear la secuencia en un formato de tiempo para display
    const hours = inputSequence.substring(0, 2);
    const minutes = inputSequence.substring(2, 4);
    const seconds = inputSequence.substring(4, 6);
    
    // Actualizar el display
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function setCountdown() {
    // Convertir la secuencia de entrada a un valor de tiempo en milisegundos
    const hours = parseInt(inputSequence.substring(0, 2));
    const minutes = parseInt(inputSequence.substring(2, 4));
    const seconds = parseInt(inputSequence.substring(4, 6));
    
    // Normalizar minutos y segundos (convertir si son mayores a 59)
    let totalHours = hours;
    let totalMinutes = minutes;
    let totalSeconds = seconds;
    
    // Si los segundos son mayores a 59, convertir a minutos
    if (totalSeconds > 59) {
        totalMinutes += Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
    }
    
    // Si los minutos son mayores a 59, convertir a horas
    if (totalMinutes > 59) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
    }
    
    // Calcular el tiempo total en milisegundos
    countdownTime = ((totalHours * 60 * 60) + (totalMinutes * 60) + totalSeconds) * 1000;
    
    // Preparar el cronómetro para el countdown
    stopwatchOffset = 0;
    stopwatchTime = countdownTime;
    isCountdownMode = true;
    
    // Actualizar el display del cronómetro con el tiempo del countdown
    updateStopwatchDisplay(countdownTime);
    
    // Navegar del countdown al cronómetro con una transición especial
    navigateFromCountdownToStopwatch();
}

function clearCountdown() {
    // Resetear la secuencia de entrada
    inputSequence = "000000";
    
    // Actualizar el display
    updateCountdownDisplay();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);