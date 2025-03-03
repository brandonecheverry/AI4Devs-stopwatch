let timer;
let running = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;

const timeDisplay = document.getElementById("time");
const msDisplay = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const clearButton = document.getElementById("clear");

function updateDisplay() {
    timeDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    msDisplay.textContent = String(milliseconds).padStart(3, '0');
}

function startStop() {
    if (running) {
        clearInterval(timer);
        startButton.textContent = "Start";
    } else {
        timer = setInterval(() => {
            milliseconds += 10;
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 10);
        startButton.textContent = "Pause";
    }
    running = !running;
}

function clearTimer() {
    clearInterval(timer);
    running = false;
    hours = minutes = seconds = milliseconds = 0;
    updateDisplay();
    startButton.textContent = "Start";
}

startButton.addEventListener("click", startStop);
clearButton.addEventListener("click", clearTimer);

updateDisplay();
