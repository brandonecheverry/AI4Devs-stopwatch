let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let isCountdown = false;
let countdownTime = 0;

const modeSelector = document.getElementById("modeSelector");
const instructions = document.getElementById("instructions");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const displayMillis = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const countdownOptions = document.getElementById("countdown-options");
const countdownButtons = document.querySelectorAll(".countdown-btn");

modeSelector.addEventListener("change", switchMode);
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
countdownButtons.forEach(button => {
    button.addEventListener("click", () => setCountdown(parseInt(button.dataset.time)));
});

document.querySelectorAll(".editable").forEach(el => {
    el.addEventListener("click", () => {
        if (!isCountdown) return;
        let newValue = prompt("Ingresa un valor (0-59 para min/sec, 0-99 para horas):", el.textContent);
        if (newValue !== null && !isNaN(newValue)) {
            newValue = Math.max(0, Math.min(el.id === "hours" ? 99 : 59, parseInt(newValue)));
            el.textContent = String(newValue).padStart(2, '0');
            updateCountdownTime();
        }
    });
});

function updateDisplay(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    displayMillis.textContent = `.${String(milliseconds).padStart(3, '0')}`;
}

function startPauseTimer() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = "Iniciar";
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            let currentTime = isCountdown ? countdownTime - (Date.now() - startTime) : elapsedTime + (Date.now() - startTime);
            if (isCountdown && currentTime <= 0) {
                clearInterval(timer);
                updateDisplay(0);
                alert("⏳ ¡Se acabó el tiempo, final del partido!");
                running = false;
                startPauseBtn.textContent = "Iniciar";
            } else {
                updateDisplay(currentTime);
            }
        }, 10);
        startPauseBtn.textContent = "Pausar";
    }
    running = !running;
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    isCountdown = false;
    updateDisplay(0);
    running = false;
    startPauseBtn.textContent = "Iniciar";
}

function setCountdown(minutes) {
    countdownTime = minutes * 60 * 1000;
    updateDisplay(countdownTime);
    isCountdown = true;
    running = false;
    startPauseBtn.textContent = "Iniciar";
}

function updateCountdownTime() {
    let hours = parseInt(hoursEl.textContent) * 60 * 60 * 1000;
    let minutes = parseInt(minutesEl.textContent) * 60 * 1000;
    let seconds = parseInt(secondsEl.textContent) * 1000;
    countdownTime = hours + minutes + seconds;
}

function switchMode() {
    resetTimer();
    if (modeSelector.value === "temporizador") {
        countdownOptions.classList.remove("hidden");
        isCountdown = true;
        instructions.textContent = "⏳ ¡Es hora de administrar el tiempo del partido! Configura el temporizador seleccionando una opción rápida o haciendo clic en las horas, minutos y segundos para editarlos directamente.";
    } else {
        countdownOptions.classList.add("hidden");
        isCountdown = false;
        instructions.textContent = "⚽ Usa el cronómetro para medir el tiempo de juego, como si estuvieras en una final con América de Cali.";
    }
}

updateDisplay(0);
switchMode();