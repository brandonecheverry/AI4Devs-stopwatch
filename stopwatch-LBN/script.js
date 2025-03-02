document.addEventListener("DOMContentLoaded", () => {
    const showStopwatchBtn = document.getElementById("showStopwatch");
    const showCountdownBtn = document.getElementById("showCountdown");
    const stopwatchContainer = document.getElementById("stopwatch");
    const countdownContainer = document.getElementById("countdown");

    const welcomeContainer = document.getElementById("welcome");

    let stopwatchInterval;
    let stopwatchTime = 0;
    let isStopwatchRunning = false;
    const stopwatchDisplay = document.getElementById("stopwatchDisplay");
    const startStopwatchBtn = document.getElementById("startStopwatch");
    const stopStopwatchBtn = document.getElementById("stopStopwatch");
    const resetStopwatchBtn = document.getElementById("resetStopwatch");

    let countdownInterval;
    let countdownTime = 0;
    let isCountingDown = false;
    const countdownDisplay = document.getElementById("countdownDisplay");
    const startCountdownBtn = document.getElementById("startCountdown");
    const stopCountdownBtn = document.getElementById("stopCountdown");
    const resetCountdownBtn = document.getElementById("resetCountdown");
    const setCountdownBtn = document.getElementById("setCountdown");

    function updateActiveMenu(activeBtn) {
        document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
        welcomeContainer.classList.add("hidden");
    }

    showStopwatchBtn.addEventListener("click", () => {
        stopwatchContainer.classList.remove("hidden");
        countdownContainer.classList.add("hidden");
        updateActiveMenu(showStopwatchBtn);
    });

    showCountdownBtn.addEventListener("click", () => {
        countdownContainer.classList.remove("hidden");
        stopwatchContainer.classList.add("hidden");
        updateActiveMenu(showCountdownBtn);
    });

    startStopwatchBtn.addEventListener("click", () => {
        if (!isStopwatchRunning) {
            isStopwatchRunning = true;
            let startTime = performance.now() - stopwatchTime;
            stopwatchInterval = setInterval(() => {
                stopwatchTime = performance.now() - startTime;
                let totalMilliseconds = Math.floor(stopwatchTime);
                stopwatchDisplay.textContent = new Date(totalMilliseconds).toISOString().substr(11, 12);
            }, 10);
        }
    });

    stopStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
    });

    resetStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        isStopwatchRunning = false;
        stopwatchDisplay.textContent = "00:00:00.000";
    });

    setCountdownBtn.addEventListener("click", () => {
        countdownTime = 
            (parseInt(document.getElementById("countdownHours").value) || 0) * 3600000 +
            (parseInt(document.getElementById("countdownMinutes").value) || 0) * 60000 +
            (parseInt(document.getElementById("countdownSeconds").value) || 0) * 1000;
        countdownDisplay.textContent = new Date(countdownTime).toISOString().substr(11, 12);
    });

    startCountdownBtn.addEventListener("click", () => {
        if (!isCountingDown && countdownTime > 0) {
            isCountingDown = true;
            countdownInterval = setInterval(() => {
                countdownTime -= 10;
                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    countdownDisplay.textContent = "00:00:00.000";
                    isCountingDown = false;
                }
                countdownDisplay.textContent = new Date(countdownTime).toISOString().substr(11, 12);
            }, 10);
        }
    });

    stopCountdownBtn.addEventListener("click", () => {
        clearInterval(countdownInterval);
        isCountingDown = false;
    });

    resetCountdownBtn.addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownTime = 0;
        isCountingDown = false;
        countdownDisplay.textContent = "00:00:00.000";
        document.getElementById("countdownHours").value = "";
        document.getElementById("countdownMinutes").value = "";
        document.getElementById("countdownSeconds").value = "";
    });
});
