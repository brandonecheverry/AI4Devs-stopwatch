let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const beepSound = document.getElementById("beep");

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;
    let milliseconds = ms % 1000;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

// Iniciar/Detener cronómetro
startStopBtn.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = "Start";
    } else {
        beepSound.play();
        startTime = Date.now();
        timer = setInterval(() => {
            let currentTime = elapsedTime + (Date.now() - startTime);
            display.textContent = formatTime(currentTime);
        }, 10);
        startStopBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
});

// Reiniciar cronómetro
resetBtn.addEventListener("click", function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00.000";
    startStopBtn.textContent = "Start";
});

// === Temporizador de Cuenta Regresiva ===
let countdownTimer;
let countdownRemaining = 0;
const countdownInput = document.getElementById("countdownInput");
const startCountdownBtn = document.getElementById("startCountdown");
const stopCountdownBtn = document.getElementById("stopCountdown");
const countdownDisplay = document.getElementById("countdownDisplay");

startCountdownBtn.addEventListener("click", function() {
    let countdownSeconds = parseInt(countdownInput.value, 10);
    if (isNaN(countdownSeconds) || countdownSeconds <= 0) return;
    
    countdownRemaining = countdownSeconds * 1000;
    countdownDisplay.textContent = formatTime(countdownRemaining);

    let countdownStart = Date.now();
    countdownTimer = setInterval(() => {
        let elapsed = Date.now() - countdownStart;
        let timeLeft = countdownRemaining - elapsed;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            countdownDisplay.textContent = "00:00:00.000";
            beepSound.play();
        } else {
            countdownDisplay.textContent = formatTime(timeLeft);
        }
    }, 10);
});

stopCountdownBtn.addEventListener("click", function() {
    clearInterval(countdownTimer);
});