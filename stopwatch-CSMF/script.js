
let timerDisplay, millisecondsDisplay, startButton, clearButton;
let timer;
let time = 0;
let running = false;

document.addEventListener("DOMContentLoaded", () => {
    timerDisplay = document.getElementById("timer");
    millisecondsDisplay = document.getElementById("milliseconds");
    startButton = document.getElementById("start");
    clearButton = document.getElementById("clear");

    startButton.addEventListener("click", toggleTimer);
    clearButton.addEventListener("click", resetTimer);

    updateDisplay();
});

function toggleTimer() {
    if (running) {
        clearInterval(timer);
        startButton.textContent = "Continue";
        startButton.classList.remove("start");
        startButton.classList.add("pause");
    } else {
        timer = setInterval(() => {
            time += 10;
            updateDisplay();
        }, 10);
        startButton.textContent = "Pause";
        startButton.classList.remove("pause");
        startButton.classList.add("start");
    }
    running = !running;
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    running = false;
    updateDisplay();
    startButton.textContent = "Start";
    startButton.classList.remove("pause");
    startButton.classList.add("start");
}

function updateDisplay() {
    let hours = Math.floor(time / 3600000).toString().padStart(2, '0');
    let minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
    let seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    let milliseconds = (time % 1000).toString().padStart(3, '0');

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    millisecondsDisplay.textContent = milliseconds;
}
