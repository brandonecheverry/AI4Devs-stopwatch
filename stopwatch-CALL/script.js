let timer;
let time = 0;
let running = false;
let countdownMode = false;

const display = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const countdownInput = document.getElementById("countdown-input");
const countdownBtn = document.getElementById("countdown-btn");

function updateDisplay() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            time++;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    running = false;
    clearInterval(timer);
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    time = 0;
    updateDisplay();
}

function startCountdown() {
    let countdownTime = parseInt(countdownInput.value);
    if (isNaN(countdownTime) || countdownTime <= 0) {
        alert("Ingrese un número válido");
        return;
    }
    resetTimer();
    time = countdownTime;
    updateDisplay();
    countdownMode = true;
    running = true;
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timer);
            running = false;
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
countdownBtn.addEventListener("click", startCountdown);

updateDisplay();
