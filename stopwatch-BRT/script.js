let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startPauseResumeButton = document.getElementById('startPauseResume');
const resetButton = document.getElementById('reset');

// Cargar estado desde localStorage
window.onload = function () {
    const savedTime = localStorage.getItem('elapsedTime');
    const savedRunning = localStorage.getItem('running');
    if (savedTime) {
        elapsedTime = parseInt(savedTime);
        updateDisplay();
    }
    if (savedRunning === 'true') {
        startTimer();
    }
};

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    running = true;
    updateButtonState('pause');
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
    updateButtonState('resume');
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    updateDisplay();
    updateButtonState('start');
    localStorage.removeItem('elapsedTime');
    localStorage.removeItem('running');
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('running', running);
}

function updateDisplay() {
    let totalMilliseconds = elapsedTime;
    let hours = Math.floor(totalMilliseconds / 3600000);
    totalMilliseconds %= 3600000;
    let minutes = Math.floor(totalMilliseconds / 60000);
    totalMilliseconds %= 60000;
    let seconds = Math.floor(totalMilliseconds / 1000);
    let milliseconds = totalMilliseconds % 1000;
    
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
    millisecondsElement.textContent = String(milliseconds).padStart(3, '0');
}

function updateButtonState(state) {
    if (state === 'start') {
        startPauseResumeButton.textContent = 'Iniciar';
        startPauseResumeButton.className = 'start';
    } else if (state === 'pause') {
        startPauseResumeButton.textContent = 'Pausar';
        startPauseResumeButton.className = 'pause';
    } else if (state === 'resume') {
        startPauseResumeButton.textContent = 'Reanudar';
        startPauseResumeButton.className = 'resume';
    }
}

startPauseResumeButton.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
