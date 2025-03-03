// stopwatch.js: Lógica y eventos del cronómetro
document.addEventListener('DOMContentLoaded', function() {
    const timerTime = document.getElementById('timer-time');
    const timerMS = document.getElementById('timer-ms');
    const timerToggle = document.getElementById('timer-toggle');
    const timerClear = document.getElementById('timer-clear');
    const timerBack = document.getElementById('timer-back');

    let timerInterval = null;
    let timerStartTime = null;
    let timerElapsed = 0;
    let timerState = "notStarted"; // "notStarted", "running", "paused"

    function updateTimerDisplay(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(ms % 1000).padStart(3, '0');
        timerTime.textContent = `${hours}:${minutes}:${seconds}`;
        timerMS.textContent = milliseconds;
    }

    function updateTimer() {
        const now = Date.now();
        const elapsed = timerElapsed + (now - timerStartTime);
        updateTimerDisplay(elapsed);
    }

    timerToggle.addEventListener('click', function() {
        if (timerState === "notStarted" || timerState === "paused") {
            timerStartTime = Date.now();
            timerInterval = setInterval(updateTimer, 10);
            timerState = "running";
            timerToggle.textContent = "Pause";
            timerToggle.classList.remove("cron-start-continue-button");
            timerToggle.classList.add("cron-pause-button");
        } else if (timerState === "running") {
            clearInterval(timerInterval);
            timerInterval = null;
            timerElapsed += Date.now() - timerStartTime;
            timerState = "paused";
            timerToggle.textContent = "Continue";
            timerToggle.classList.remove("cron-pause-button");
            timerToggle.classList.add("cron-start-continue-button");
        }
    });

    timerClear.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStartTime = null;
        timerElapsed = 0;
        timerState = "notStarted";
        timerToggle.textContent = "Start";
        timerToggle.classList.remove("cron-pause-button");
        timerToggle.classList.add("cron-start-continue-button");
        updateTimerDisplay(0);
    });

    timerBack.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStartTime = null;
        timerElapsed = 0;
        timerState = "notStarted";
        timerToggle.textContent = "Start";
        timerToggle.classList.remove("cron-pause-button");
        timerToggle.classList.add("cron-start-continue-button");
        updateTimerDisplay(0);
        showScreen(document.getElementById('screen-main'));
    });
});
