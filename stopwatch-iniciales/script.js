let timerInterval;
let elapsedTime = 0;
let countdownTime = 0;
let isRunning = false;
let countdownActive = false;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const countdownInputContainer = document.getElementById('countdownInputContainer');
const setCountdownBtn = document.getElementById('setCountdownBtn');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const timerTypeInputs = document.getElementsByName('timerType');

function updateDisplay(time) {
    const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    if (countdownActive) {
        startCountdown();
    } else {
        timerInterval = setInterval(() => {
            elapsedTime += 10;
            updateDisplay(elapsedTime);
        }, 10);
    }
    isRunning = true;
    updateButtons();
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    updateButtons();
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    countdownTime = 0;
    countdownActive = false;
    updateDisplay(0);
    isRunning = false;
    updateButtons();
}

function setCountdown() {
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    // Validación de rango en JavaScript
    if (hours > 59) hours = 59;
    if (minutes > 59) minutes = 59;
    if (seconds > 59) seconds = 59;

    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = seconds;

    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    updateDisplay(countdownTime);
    countdownActive = true;
    updateButtons();
}

function startCountdown() {
    timerInterval = setInterval(() => {
        countdownTime -= 10;
        if (countdownTime <= 0) {
            clearInterval(timerInterval);
            countdownTime = 0;
            countdownActive = false;
        }
        updateDisplay(countdownTime);
    }, 10);
}

timerTypeInputs.forEach(input => {
    input.addEventListener('change', (event) => {
        resetTimer();
        if (event.target.value === 'down') {
            countdownInputContainer.style.display = 'block';
        } else {
            countdownInputContainer.style.display = 'none';
        }
    });
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
setCountdownBtn.addEventListener('click', setCountdown);

function updateButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    resetBtn.disabled = elapsedTime === 0 && countdownTime === 0;
}
