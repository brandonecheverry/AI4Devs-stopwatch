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
    
    // Obtener referencias a los inputs
    const hoursInput = document.getElementById("countdownHours");
    const minutesInput = document.getElementById("countdownMinutes");
    const secondsInput = document.getElementById("countdownSeconds");
    
    // Agregar validación para prevenir valores negativos
    [hoursInput, minutesInput, secondsInput].forEach(input => {
        input.addEventListener("input", function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
        
        // También validar cuando el input pierde el foco
        input.addEventListener("blur", function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

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
        // Asegurarse de que los valores sean no negativos
        const hours = Math.max(0, parseInt(hoursInput.value) || 0);
        const minutes = Math.max(0, parseInt(minutesInput.value) || 0);
        const seconds = Math.max(0, parseInt(secondsInput.value) || 0);
        
        // Actualizar los inputs con los valores validados
        hoursInput.value = hours;
        minutesInput.value = minutes;
        secondsInput.value = seconds;
        
        countdownTime = 
            hours * 3600000 +
            minutes * 60000 +
            seconds * 1000;
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
        hoursInput.value = "";
        minutesInput.value = "";
        secondsInput.value = "";
    });
});
