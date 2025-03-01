document.addEventListener("DOMContentLoaded", () => {
    const showStopwatchBtn = document.getElementById("showStopwatch");
    const showCountdownBtn = document.getElementById("showCountdown");
    const stopwatchContainer = document.getElementById("stopwatch");
    const countdownContainer = document.getElementById("countdown");
    
    function updateActiveMenu(activeBtn) {
        document.querySelectorAll(".menu-btn").forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
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
    
    // Cronómetro con milisegundos
    let stopwatchInterval;
    let stopwatchTime = 0;
    const stopwatchDisplay = document.querySelector("#stopwatch .timer-display");
    const startStopwatchBtn = document.getElementById("startStopwatch");
    const stopStopwatchBtn = document.getElementById("stopStopwatch");
    const resetStopwatchBtn = document.getElementById("resetStopwatch");
    
    startStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        let startTime = performance.now() - stopwatchTime;
        startStopwatchBtn.disabled = true;
        stopStopwatchBtn.disabled = false;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = performance.now() - startTime;
            let totalMilliseconds = Math.floor(stopwatchTime);
            let hours = Math.floor(totalMilliseconds / 3600000).toString().padStart(2, "0");
            let minutes = Math.floor((totalMilliseconds % 3600000) / 60000).toString().padStart(2, "0");
            let seconds = Math.floor((totalMilliseconds % 60000) / 1000).toString().padStart(2, "0");
            let milliseconds = (totalMilliseconds % 1000).toString().padStart(3, "0");
            stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }, 10);
    });
    
    stopStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        startStopwatchBtn.disabled = false;
        stopStopwatchBtn.disabled = true;
    });
    
    resetStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        stopwatchDisplay.textContent = "00:00:00.000";
        startStopwatchBtn.disabled = false;
        stopStopwatchBtn.disabled = true;
    });
});
