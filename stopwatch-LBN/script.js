document.addEventListener("DOMContentLoaded", () => {
    const showStopwatchBtn = document.getElementById("showStopwatch");
    const showCountdownBtn = document.getElementById("showCountdown");
    const stopwatchContainer = document.getElementById("stopwatch");
    const countdownContainer = document.getElementById("countdown");
    const welcomeContainer = document.getElementById("welcome");
    const selectedTimeDisplay = document.getElementById("selectedTime");

    let countdownInterval;
    let countdownTime = 0;
    let isCountingDown = false;
    const countdownDisplay = document.querySelector("#countdown .timer-display");
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

    setCountdownBtn.addEventListener("click", () => {
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;
        const seconds = parseInt(document.getElementById("seconds").value) || 0;
        countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        selectedTimeDisplay.textContent = `Tiempo seleccionado: ${hours}h ${minutes}m ${seconds}s`;
        selectedTimeDisplay.classList.remove("hidden");
        countdownDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.000`;
    });

    startCountdownBtn.addEventListener("click", () => {
        if (!isCountingDown && countdownTime > 0) {
            let endTime = performance.now() + countdownTime;
            isCountingDown = true;
            countdownInterval = setInterval(() => {
                let remainingTime = endTime - performance.now();
                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                    countdownDisplay.textContent = "00:00:00.000";
                    isCountingDown = false;
                    return;
                }
                countdownTime = remainingTime;
            }, 10);
        }
    });

    stopCountdownBtn.addEventListener("click", () => {
        clearInterval(countdownInterval);
        isCountingDown = false;
    });
});
