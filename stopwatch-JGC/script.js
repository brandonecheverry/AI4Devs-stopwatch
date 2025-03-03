// Variables globales
let stopwatchInterval;
let countdownInterval;
let stopwatchTime = 0;
let countdownTime = 0;
let countdownInputSequence = "";

// Elementos del DOM
const mainMenu = document.getElementById("main-menu");
const stopwatchSection = document.getElementById("stopwatch");
const countdownSection = document.getElementById("countdown");
const stopwatchDisplay = document.getElementById("stopwatch-display");
const countdownDisplay = document.getElementById("countdown-display");
const alarmSound = document.getElementById("alarm-sound");

// Botones del cronómetro
const stopwatchStartBtn = document.getElementById("stopwatch-start");
const stopwatchPauseBtn = document.getElementById("stopwatch-pause");
const stopwatchResumeBtn = document.getElementById("stopwatch-resume");
const stopwatchClearBtn = document.getElementById("stopwatch-clear");
const stopwatchBackBtn = document.getElementById("stopwatch-back");

// Botones de la cuenta atrás
const countdownStartBtn = document.getElementById("countdown-start");
const countdownPauseBtn = document.getElementById("countdown-pause");
const countdownResumeBtn = document.getElementById("countdown-resume");
const countdownClearBtn = document.getElementById("countdown-clear");
const countdownBackBtn = document.getElementById("countdown-back");
const countdownSetBtn = document.getElementById("countdown-set");
const countdownSetupClearBtn = document.getElementById("countdown-setup-clear");
const countdownSetup = document.getElementById("countdown-setup");
const countdownControls = document.getElementById("countdown-controls");
const countdownMessage = document.getElementById("countdown-message");
const numberButtons = document.querySelectorAll(".number-button[data-number]");

// Navegación entre secciones
document.getElementById("stopwatch-option").addEventListener("click", () => {
    showSection(stopwatchSection);
    document.getElementById("app-header").textContent = "Cronómetro";
});

document.getElementById("countdown-option").addEventListener("click", () => {
    showSection(countdownSection);
    document.getElementById("app-header").textContent = "Cuenta Atrás";
});

stopwatchBackBtn.addEventListener("click", () => {
    showSection(mainMenu);
    document.getElementById("app-header").textContent = "Cronómetro y Cuenta Atrás";
    stopStopwatch();
});

countdownBackBtn.addEventListener("click", () => {
    showSection(mainMenu);
    document.getElementById("app-header").textContent = "Cronómetro y Cuenta Atrás";
    stopCountdown();
    resetCountdownSetup();
});

// Funciones para mostrar/ocultar secciones
function showSection(section) {
    mainMenu.style.display = "none";
    stopwatchSection.style.display = "none";
    countdownSection.style.display = "none";
    section.style.display = "block";
}

// ------------------- CRONÓMETRO -------------------
stopwatchStartBtn.addEventListener("click", startStopwatch);
stopwatchPauseBtn.addEventListener("click", pauseStopwatch);
stopwatchResumeBtn.addEventListener("click", resumeStopwatch);
stopwatchClearBtn.addEventListener("click", clearStopwatch);

function startStopwatch() {
    toggleStopwatchButtons("running");
    const startTime = Date.now() - stopwatchTime;
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10); // Actualizamos cada 10ms para más precisión
}

function pauseStopwatch() {
    toggleStopwatchButtons("paused");
    clearInterval(stopwatchInterval);
}

function resumeStopwatch() {
    toggleStopwatchButtons("running");
    const startTime = Date.now() - stopwatchTime;
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    toggleStopwatchButtons("initial");
}

function clearStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function toggleStopwatchButtons(state) {
    if (state === "initial") {
        stopwatchStartBtn.classList.remove("hidden");
        stopwatchPauseBtn.classList.add("hidden");
        stopwatchResumeBtn.classList.add("hidden");
    } else if (state === "running") {
        stopwatchStartBtn.classList.add("hidden");
        stopwatchPauseBtn.classList.remove("hidden");
        stopwatchResumeBtn.classList.add("hidden");
    } else if (state === "paused") {
        stopwatchStartBtn.classList.add("hidden");
        stopwatchPauseBtn.classList.add("hidden");
        stopwatchResumeBtn.classList.remove("hidden");
    }
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatTime(stopwatchTime);
}

// ------------------- CUENTA ATRÁS -------------------
countdownStartBtn.addEventListener("click", startCountdown);
countdownPauseBtn.addEventListener("click", pauseCountdown);
countdownResumeBtn.addEventListener("click", resumeCountdown);
countdownClearBtn.addEventListener("click", clearCountdown);
countdownSetBtn.addEventListener("click", setCountdown);
countdownSetupClearBtn.addEventListener("click", clearCountdownInput);

// Configurar los botones numéricos
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.getAttribute("data-number");
        addNumberToCountdown(number);
    });
});

function addNumberToCountdown(number) {
    if (countdownInputSequence.length < 6) {
        countdownInputSequence += number;
        updateCountdownInputDisplay();
    }
}

function updateCountdownInputDisplay() {
    // Rellenar con ceros a la izquierda hasta tener 6 dígitos
    let displaySequence = countdownInputSequence.padStart(6, "0");
    
    // Formatear en formato hh:mm:ss
    const hours = displaySequence.slice(0, 2);
    const minutes = displaySequence.slice(2, 4);
    const seconds = displaySequence.slice(4, 6);
    
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}.000`;
    
    // Actualizar el mensaje
    if (countdownInputSequence.length === 0) {
        countdownMessage.textContent = "Configura el tiempo usando los números:";
    } else if (countdownInputSequence.length <= 2) {
        countdownMessage.textContent = "Configurando segundos...";
    } else if (countdownInputSequence.length <= 4) {
        countdownMessage.textContent = "Configurando minutos y segundos...";
    } else {
        countdownMessage.textContent = "Configurando horas, minutos y segundos...";
    }
}

function clearCountdownInput() {
    countdownInputSequence = "";
    updateCountdownInputDisplay();
}

function setCountdown() {
    if (countdownInputSequence.length === 0) {
        // No se ha introducido ningún número
        countdownMessage.textContent = "Por favor, introduce al menos un número";
        return;
    }
    
    // Convertir la secuencia introducida a milisegundos
    let displaySequence = countdownInputSequence.padStart(6, "0");
    const hours = parseInt(displaySequence.slice(0, 2));
    const minutes = parseInt(displaySequence.slice(2, 4));
    const seconds = parseInt(displaySequence.slice(4, 6));
    
    // Verificar si los valores son válidos
    if (minutes >= 60 || seconds >= 60) {
        countdownMessage.textContent = "Valores inválidos. Minutos y segundos deben ser menores a 60";
        return;
    }
    
    // Calcular el tiempo total en milisegundos
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    
    // Mostrar los controles y ocultar la configuración
    countdownSetup.classList.add("hidden");
    countdownControls.classList.remove("hidden");
    
    // Actualizar la pantalla
    updateCountdownDisplay();
}

function startCountdown() {
    toggleCountdownButtons("running");
    const targetTime = Date.now() + countdownTime;
    
    countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        
        if (currentTime >= targetTime) {
            // El tiempo ha terminado
            finishCountdown();
        } else {
            // Actualizar el tiempo restante
            countdownTime = targetTime - currentTime;
            updateCountdownDisplay();
        }
    }, 10);
}

function pauseCountdown() {
    toggleCountdownButtons("paused");
    clearInterval(countdownInterval);
}

function resumeCountdown() {
    toggleCountdownButtons("running");
    const targetTime = Date.now() + countdownTime;
    
    countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        
        if (currentTime >= targetTime) {
            finishCountdown();
        } else {
            countdownTime = targetTime - currentTime;
            updateCountdownDisplay();
        }
    }, 10);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    toggleCountdownButtons("initial");
}

function clearCountdown() {
    stopCountdown();
    resetCountdownSetup();
}

function resetCountdownSetup() {
    countdownSetup.classList.remove("hidden");
    countdownControls.classList.add("hidden");
    clearCountdownInput();
    countdownDisplay.classList.remove("blink");
}

function finishCountdown() {
    stopCountdown();
    countdownTime = 0;
    updateCountdownDisplay();
    countdownDisplay.classList.add("blink");
    playAlarm();
}

function toggleCountdownButtons(state) {
    if (state === "initial") {
        countdownStartBtn.classList.remove("hidden");
        countdownPauseBtn.classList.add("hidden");
        countdownResumeBtn.classList.add("hidden");
    } else if (state === "running") {
        countdownStartBtn.classList.add("hidden");
        countdownPauseBtn.classList.remove("hidden");
        countdownResumeBtn.classList.add("hidden");
    } else if (state === "paused") {
        countdownStartBtn.classList.add("hidden");
        countdownPauseBtn.classList.add("hidden");
        countdownResumeBtn.classList.remove("hidden");
    }
}

function updateCountdownDisplay() {
    countdownDisplay.textContent = formatTime(countdownTime);
}

// ------------------- UTILIDADES -------------------
function formatTime(timeInMilliseconds) {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(timeInMilliseconds % 1000);
    
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZeroMs(milliseconds)}`;
}

function padZero(num) {
    return num.toString().padStart(2, "0");
}

function padZeroMs(num) {
    return num.toString().padStart(3, "0");
}

function playAlarm() {
    alarmSound.play().catch(error => {
        console.error("Error al reproducir sonido:", error);
    });
}

// Inicialización
updateStopwatchDisplay();
updateCountdownInputDisplay();