document.addEventListener("DOMContentLoaded", () => {
    // Pantalla inicial y navegación
    const modeSelection = document.querySelector(".mode-selection");
    const chronoScreen = document.getElementById("chrono-screen");
    const countdownScreen = document.getElementById("countdown-screen");

    const chronoBtn = document.getElementById("chrono-btn");
    const countdownBtn = document.getElementById("countdown-btn");
    const backButtons = document.querySelectorAll(".back-btn");

    chronoBtn.addEventListener("click", () => {
        modeSelection.classList.add("hidden");
        chronoScreen.classList.remove("hidden");
    });

    countdownBtn.addEventListener("click", () => {
        modeSelection.classList.add("hidden");
        countdownScreen.classList.remove("hidden");
        resetCountdown();
    });

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            chronoScreen.classList.add("hidden");
            countdownScreen.classList.add("hidden");
            modeSelection.classList.remove("hidden");
            resetChrono();
            resetCountdown();
            // 🔹 Si está en pantalla completa, salir de fullscreen
            if (document.fullscreenElement) {
              document.exitFullscreen();
            }

        });
    });

    // -----------------------------------
    //  CRONÓMETRO CON MILISEGUNDOS
    // -----------------------------------
    let chronoTime = 0;
    let chronoInterval;
    let running = false;
    let startTime;
    
    const chronoDisplay = document.getElementById("chrono-display");

    document.getElementById("start-chrono").addEventListener("click", function () {
        if (!running) {
            startTime = Date.now() - chronoTime;
            chronoInterval = setInterval(() => {
                chronoTime = Date.now() - startTime;
                updateChronoDisplay();
            }, 10);
            running = true;
            this.textContent = "Pausar";
        } else {
            clearInterval(chronoInterval);
            running = false;
            this.textContent = "Iniciar";
        }
    });

    function updateChronoDisplay() {
        let totalMilliseconds = chronoTime;
        let hours = Math.floor(totalMilliseconds / 3600000);
        let minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        let seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        chronoDisplay.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}<span class="milliseconds">.${String(milliseconds).padStart(2, '0')}</span>`;
    }

    document.getElementById("clear-chrono").addEventListener("click", resetChrono);

    function resetChrono() {
        clearInterval(chronoInterval);
        chronoTime = 0;
        running = false;
        document.getElementById("start-chrono").textContent = "Iniciar";
        chronoDisplay.innerHTML = "00:00:00<span class='milliseconds'>.00</span>";
    }

    // -----------------------------------
    //  CUENTA ATRÁS CON MILISEGUNDOS, EFECTO BLINK Y SONIDOS
    // -----------------------------------
    let inputTime = "";
    const numDisplay = document.getElementById("num-input");
    const numKeys = document.querySelectorAll(".num-key");
    const deleteKey = document.getElementById("delete-key");
    const setTimeBtn = document.getElementById("set-time");
    const resetTimeBtn = document.getElementById("reset-time");
    const countdownDisplay = document.getElementById("countdown-display");
    const countdownControls = document.getElementById("countdown-controls");
    const numPad = document.getElementById("num-pad");

    let countdownTime = 0;
    let countdownInterval;
    let isCountingDown = false;

    function formatTimeDisplay(time) {
        const padded = time.padStart(6, "0");
        return `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(4, 6)}`;
    }

    numKeys.forEach(button => {
        button.addEventListener("click", () => {
            if (inputTime.length < 6) {
                inputTime += button.textContent;
                numDisplay.textContent = formatTimeDisplay(inputTime);
            }
        });
    });

    deleteKey.addEventListener("click", () => {
        inputTime = inputTime.slice(0, -1);
        numDisplay.textContent = formatTimeDisplay(inputTime);
    });

    setTimeBtn.addEventListener("click", () => {
    const padded = inputTime.padStart(6, "0");
    const hours = parseInt(padded.slice(0, 2), 10);
    const minutes = parseInt(padded.slice(2, 4), 10);
    const seconds = parseInt(padded.slice(4, 6), 10);
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (countdownTime > 0) {
        countdownDisplay.innerHTML = formatTimeDisplay(inputTime) + "<span class='milliseconds'>.00</span>";
        numPad.classList.add("hidden");
        setTimeBtn.classList.add("hidden");
        countdownControls.classList.remove("hidden");

        // 🔹 Corregido: Asegurar que el botón aparezca como "Iniciar" después de presionar SET
        const startCountdownBtn = document.getElementById("start-countdown");
        startCountdownBtn.textContent = "Iniciar";
    }
});


    document.getElementById("start-countdown").addEventListener("click", function () {
        if (!isCountingDown && countdownTime > 0) {
            let startTime = Date.now();
            countdownInterval = setInterval(() => {
                let elapsed = Date.now() - startTime;
                let remainingTime = countdownTime - elapsed;

                if (remainingTime > 0) {
                    let h = Math.floor(remainingTime / 3600000);
                    let m = Math.floor((remainingTime % 3600000) / 60000);
                    let s = Math.floor((remainingTime % 60000) / 1000);
                    let ms = Math.floor((remainingTime % 1000) / 10);
                    countdownDisplay.innerHTML = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}<span class="milliseconds">.${String(ms).padStart(2, '0')}</span>`;

                    if (remainingTime <= 3000) {
                        countdownDisplay.classList.add("blink");
                        new Audio("beep.mp3").play();
                    }
                } else {
                    clearInterval(countdownInterval);
                    countdownDisplay.innerHTML = "00:00:00<span class='milliseconds'>.00</span>";
                    // 🔹 Reproducir sonido y detenerlo después de 2 segundos
                    let alarmSound = new Audio("alarm.mp3");
                    alarmSound.play();

                    setTimeout(() => {
                      alarmSound.pause();
                      alarmSound.currentTime = 0;  // Reiniciar el audio para futuras reproducciones
                    }, 3000);  // ⏳ Detiene el audio después de 2 segundos
                    countdownDisplay.classList.remove("blink");
                }
            }, 10);

            isCountingDown = true;
            this.textContent = "Pausar";
        } else {
            clearInterval(countdownInterval);
            isCountingDown = false;
            this.textContent = "Iniciar";
        }
    });

    resetTimeBtn.addEventListener("click", resetCountdown);

    function resetCountdown() {
        clearInterval(countdownInterval);
        countdownTime = 0;
        isCountingDown = false;
        countdownDisplay.innerHTML = "00:00:00<span class='milliseconds'>.00</span>";
        numPad.classList.remove("hidden");
        setTimeBtn.classList.remove("hidden");
        countdownControls.classList.add("hidden");
        inputTime = "";
        numDisplay.textContent = "00:00:00";
    }
});

// 🔹 Función para manejar pantalla completa en todos los navegadores
function setupFullscreen(fullscreenBtn, exitFullscreenBtn, container) {
    fullscreenBtn.addEventListener("click", () => {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { // Firefox
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Edge
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { // Internet Explorer
            container.msRequestFullscreen();
        }

        // 🔹 Activar el modo pantalla completa
        container.classList.add("fullscreen-mode");
        fullscreenBtn.classList.add("hidden");
        exitFullscreenBtn.classList.remove("hidden");
    });

    // 🔹 Función para salir de pantalla completa
    function exitFullscreen() {
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        // 🔹 Restaurar el diseño al salir de pantalla completa
        container.classList.remove("fullscreen-mode");
        fullscreenBtn.classList.remove("hidden");
        exitFullscreenBtn.classList.add("hidden");
    }

    // 🔹 Evento para el botón de salida `×`
    exitFullscreenBtn.addEventListener("click", exitFullscreen);

    // 🔹 Detectar ESC para salir de pantalla completa
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            exitFullscreen();
        }
    });

    // 🔹 Detectar si el usuario sale de pantalla completa manualmente
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            exitFullscreen();
        }
    });
}

// 🔹 Aplicar pantalla completa en cronómetro y cuenta atrás
setupFullscreen(
    document.getElementById("fullscreen-btn"),
    document.getElementById("exit-fullscreen-btn"),
    document.getElementById("chrono-screen")
);

setupFullscreen(
    document.getElementById("fullscreen-btn-countdown"),
    document.getElementById("exit-fullscreen-btn-countdown"),
    document.getElementById("countdown-screen")
);

