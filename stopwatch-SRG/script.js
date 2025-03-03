/**
 * Aplicación de Cronómetro y Temporizador
 * 
 * Este script implementa la funcionalidad para un cronómetro y un temporizador
 * con capacidad para iniciar, pausar y reiniciar.
 */

// Elementos del DOM
const elements = {
    // Selectores de modo
    stopwatchBtn: document.getElementById('stopwatch-btn'),
    timerBtn: document.getElementById('timer-btn'),
    
    // Contenedores
    stopwatchContainer: document.getElementById('stopwatch-container'),
    timerContainer: document.getElementById('timer-container'),
    
    // Cronómetro
    stopwatchDisplay: document.getElementById('stopwatch-display'),
    stopwatchStartBtn: document.getElementById('stopwatch-start'),
    stopwatchClearBtn: document.getElementById('stopwatch-clear'),
    
    // Temporizador
    timerDisplay: document.getElementById('timer-display'),
    timerStartBtn: document.getElementById('timer-start'),
    timerClearBtn: document.getElementById('timer-clear'),
    hoursInput: document.getElementById('hours'),
    minutesInput: document.getElementById('minutes'),
    secondsInput: document.getElementById('seconds')
};

// Estado de la aplicación
const state = {
    stopwatch: {
        isRunning: false,
        startTime: 0,
        elapsedTime: 0,
        intervalId: null
    },
    timer: {
        isRunning: false,
        endTime: 0,
        remainingTime: 0,
        intervalId: null
    }
};

/**
 * Funciones de utilidad para formatear el tiempo
 */
const utils = {
    /**
     * Formatea el tiempo en milisegundos a formato HH:MM:SS.mmm
     * @param {number} timeInMs - Tiempo en milisegundos
     * @returns {Object} Objeto con el tiempo formateado y los milisegundos
     */
    formatTime: function(timeInMs) {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((timeInMs % 1000) / 10);
        
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const formattedMs = String(milliseconds).padStart(3, '0');
        
        return {
            time: formattedTime,
            ms: formattedMs
        };
    }
};

/**
 * Funciones para el Cronómetro
 */
const stopwatch = {
    start: function() {
        if (!state.stopwatch.isRunning) {
            state.stopwatch.isRunning = true;
            state.stopwatch.startTime = Date.now() - state.stopwatch.elapsedTime;
            
            state.stopwatch.intervalId = setInterval(() => {
                state.stopwatch.elapsedTime = Date.now() - state.stopwatch.startTime;
                this.updateDisplay();
            }, 10);
            
            elements.stopwatchStartBtn.textContent = 'Pause';
            elements.stopwatchStartBtn.classList.remove('start-btn');
            elements.stopwatchStartBtn.classList.add('pause-btn');
        } else {
            this.pause();
        }
    },
    
    pause: function() {
        if (state.stopwatch.isRunning) {
            state.stopwatch.isRunning = false;
            clearInterval(state.stopwatch.intervalId);
            
            elements.stopwatchStartBtn.textContent = 'Start';
            elements.stopwatchStartBtn.classList.remove('pause-btn');
            elements.stopwatchStartBtn.classList.add('start-btn');
        }
    },
    
    clear: function() {
        this.pause();
        state.stopwatch.elapsedTime = 0;
        this.updateDisplay();
    },
    
    updateDisplay: function() {
        const formatted = utils.formatTime(state.stopwatch.elapsedTime);
        elements.stopwatchDisplay.textContent = formatted.time;
        elements.stopwatchDisplay.nextElementSibling.textContent = formatted.ms;
    }
};

/**
 * Funciones para el Temporizador
 */
const timer = {
    start: function() {
        if (!state.timer.isRunning) {
            // Obtener tiempo del input
            if (state.timer.remainingTime <= 0) {
                const hours = parseInt(elements.hoursInput.value) || 0;
                const minutes = parseInt(elements.minutesInput.value) || 0;
                const seconds = parseInt(elements.secondsInput.value) || 0;
                
                // Validar que al menos hay un valor mayor que cero
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    alert('Por favor, introduce un tiempo válido para el temporizador.');
                    return;
                }
                
                state.timer.remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
            }
            
            state.timer.isRunning = true;
            state.timer.endTime = Date.now() + state.timer.remainingTime;
            
            state.timer.intervalId = setInterval(() => {
                state.timer.remainingTime = state.timer.endTime - Date.now();
                
                if (state.timer.remainingTime <= 0) {
                    this.timeComplete();
                    return;
                }
                
                this.updateDisplay();
            }, 10);
            
            elements.timerStartBtn.textContent = 'Pause';
            elements.timerStartBtn.classList.remove('start-btn');
            elements.timerStartBtn.classList.add('pause-btn');
        } else {
            this.pause();
        }
    },
    
    pause: function() {
        if (state.timer.isRunning) {
            state.timer.isRunning = false;
            clearInterval(state.timer.intervalId);
            
            elements.timerStartBtn.textContent = 'Start';
            elements.timerStartBtn.classList.remove('pause-btn');
            elements.timerStartBtn.classList.add('start-btn');
        }
    },
    
    clear: function() {
        this.pause();
        state.timer.remainingTime = 0;
        elements.hoursInput.value = 0;
        elements.minutesInput.value = 0;
        elements.secondsInput.value = 0;
        this.updateDisplay();
    },
    
    timeComplete: function() {
        this.pause();
        state.timer.remainingTime = 0;
        this.updateDisplay();
        alert('¡Tiempo completado!');
    },
    
    updateDisplay: function() {
        const formatted = utils.formatTime(Math.max(0, state.timer.remainingTime));
        elements.timerDisplay.textContent = formatted.time;
        elements.timerDisplay.nextElementSibling.textContent = formatted.ms;
    }
};

/**
 * Cambio entre modos (Cronómetro/Temporizador)
 */
function switchMode(mode) {
    if (mode === 'stopwatch') {
        elements.stopwatchBtn.classList.add('active');
        elements.timerBtn.classList.remove('active');
        elements.stopwatchContainer.classList.add('active');
        elements.timerContainer.classList.remove('active');
    } else if (mode === 'timer') {
        elements.timerBtn.classList.add('active');
        elements.stopwatchBtn.classList.remove('active');
        elements.timerContainer.classList.add('active');
        elements.stopwatchContainer.classList.remove('active');
    }
}

/**
 * Inicialización y eventos
 */
function init() {
    // Actualizar displays iniciales
    stopwatch.updateDisplay();
    timer.updateDisplay();
    
    // Eventos para el cambio de modo
    elements.stopwatchBtn.addEventListener('click', () => switchMode('stopwatch'));
    elements.timerBtn.addEventListener('click', () => switchMode('timer'));
    
    // Eventos para el cronómetro
    elements.stopwatchStartBtn.addEventListener('click', () => stopwatch.start());
    elements.stopwatchClearBtn.addEventListener('click', () => stopwatch.clear());
    
    // Eventos para el temporizador
    elements.timerStartBtn.addEventListener('click', () => timer.start());
    elements.timerClearBtn.addEventListener('click', () => timer.clear());
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);