document.addEventListener("DOMContentLoaded", () => {
    let stopwatchInterval, countdownInterval;
    let stopwatchTime = 0, countdownTime = 0;
    let stopwatchRunning = false, countdownRunning = false;
    let countdownPaused = false;
    let countdownInputValue = "";

    const stopwatchDisplay = document.getElementById("stopwatch-display");
    const countdownDisplay = document.getElementById("countdown-display");
    const countdownStartButton = document.getElementById("countdown-start");
    const countdownPauseButton = document.getElementById("countdown-pause");
    const stopwatchPauseButton = document.getElementById("stopwatch-pause");
    const alarmSound = document.getElementById("alarm-sound");
    
    // Ocultar botones de pausa al inicio
    countdownPauseButton.style.display = "none";
    stopwatchPauseButton.style.display = "none";
    
    function formatTime(ms) {
        const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    function updateStopwatch() {
        stopwatchTime += 10;
        stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }

    function updateCountdown() {
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownRunning = false;
            alarmSound.play();
            countdownStartButton.textContent = "Start";
            countdownPauseButton.style.display = "none";
        } else {
            countdownTime -= 10;
            countdownDisplay.textContent = formatTime(countdownTime);
        }
    }

    document.getElementById("stopwatch-start").addEventListener("click", () => {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            stopwatchInterval = setInterval(updateStopwatch, 10);
            stopwatchPauseButton.style.display = "inline-block";
        }
    });

    stopwatchPauseButton.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    });

    document.getElementById("stopwatch-clear").addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchTime = 0;
        stopwatchDisplay.textContent = "00:00:00";
        stopwatchPauseButton.style.display = "none";
    });

    countdownStartButton.addEventListener("click", () => {
        if (!countdownRunning) {
            if (countdownPaused) {
                countdownPaused = false;
            } else {
                countdownTime = parseInt(countdownInputValue.slice(0, 2)) * 3600000 +
                                parseInt(countdownInputValue.slice(2, 4)) * 60000 +
                                parseInt(countdownInputValue.slice(4, 6)) * 1000;
            }
            countdownRunning = true;
            countdownPauseButton.style.display = "inline-block";
            if (countdownPaused) {
                countdownStartButton.textContent = "Continue";
            } else {
                countdownStartButton.textContent = "Start";
            }
            clearInterval(countdownInterval);
            countdownInterval = setInterval(updateCountdown, 10);
        }
    });

    countdownPauseButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownPaused = true;
        countdownStartButton.textContent = "Continue";
    });

    document.getElementById("countdown-clear").addEventListener("click", () => {
        clearInterval(countdownInterval);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        countdownRunning = false;
        countdownPaused = false;
        countdownTime = 0;
        countdownInputValue = "";
        countdownDisplay.textContent = "00:00:00";
        countdownStartButton.textContent = "Start";
        countdownPauseButton.style.display = "none";
    });

    document.querySelectorAll(".key").forEach(button => {
        button.addEventListener("click", (event) => {
            const value = event.target.dataset.value;
            const action = event.target.dataset.action;
            
            if (action === "delete") {
                countdownInputValue = countdownInputValue.slice(0, -1);
            } else if (countdownInputValue.replace(/^0+/, '').length < 6) {
                countdownInputValue = countdownInputValue.replace(/^0+/, '') + value;
            }
            
            countdownInputValue = countdownInputValue.padStart(6, "0");
            countdownDisplay.textContent = countdownInputValue.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
        });
    });

    document.getElementById("stopwatch-tab").addEventListener("click", () => {
        document.getElementById("stopwatch").classList.remove("hidden");
        document.getElementById("countdown").classList.add("hidden");
    });

    document.getElementById("countdown-tab").addEventListener("click", () => {
        document.getElementById("stopwatch").classList.add("hidden");
        document.getElementById("countdown").classList.remove("hidden");
        countdownInputValue = "";
        countdownDisplay.textContent = "00:00:00";
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownStartButton.textContent = "Start";
        countdownPauseButton.style.display = "none";
    });
});