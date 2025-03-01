document.addEventListener('DOMContentLoaded', function() {
    /***************************************
     *           PANTALLA PRINCIPAL
     ***************************************/
    const screenMain = document.getElementById('screen-main');
    const btnTimer = document.getElementById('btn-timer');
    const btnCountdown = document.getElementById('btn-countdown');

    /***************************************
     *             CRONÓMETRO
     ***************************************/
    const screenTimer = document.getElementById('screen-timer');
    const timerTime = document.getElementById('timer-time');
    const timerMS = document.getElementById('timer-ms');
    const timerToggle = document.getElementById('timer-toggle'); // Start/Pause/Continue
    const timerClear = document.getElementById('timer-clear');   // Clear
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

    // Botón Start/Pause/Continue
    timerToggle.addEventListener('click', function() {
        if (timerState === "notStarted" || timerState === "paused") {
            // Start o Continue
            timerStartTime = Date.now();
            timerInterval = setInterval(updateTimer, 10);
            timerState = "running";
            timerToggle.textContent = "Pause";
            // Cambiar clase a "pause" (azul)
            timerToggle.classList.remove("cron-start-continue-button");
            timerToggle.classList.add("cron-pause-button");
        } else if (timerState === "running") {
            // Pause
            clearInterval(timerInterval);
            timerInterval = null;
            timerElapsed += Date.now() - timerStartTime;
            timerState = "paused";
            timerToggle.textContent = "Continue";
            // Cambiar clase a "start-continue" (verde)
            timerToggle.classList.remove("cron-pause-button");
            timerToggle.classList.add("cron-start-continue-button");
        }
    });

    // Botón Clear
    timerClear.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStartTime = null;
        timerElapsed = 0;
        timerState = "notStarted";
        timerToggle.textContent = "Start";
        // Aseguramos fondo verde
        timerToggle.classList.remove("cron-pause-button");
        timerToggle.classList.add("cron-start-continue-button");
        updateTimerDisplay(0);
    });

    // Botón Back
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
        showScreen(screenMain);
    });

    /***************************************
     *             CUENTA ATRÁS
     ***************************************/
    const screenCountdown = document.getElementById('screen-countdown');
    const countdownTime = document.getElementById('countdown-time');
    const countdownMS = document.getElementById('countdown-ms');
    const digitRows = document.getElementById('digit-rows');
    const actionButtons = document.getElementById('action-buttons');

    const digitButtons = document.querySelectorAll('.countdown-digit');
    const countdownSetButton = document.getElementById('countdown-set');
    const countdownClearButton = document.getElementById('countdown-clear');
    const countdownToggleButton = document.getElementById('countdown-toggle');
    const countdownStopButton = document.getElementById('countdown-stop-button');
    const countdownBack = document.getElementById('countdown-back');

    let countdownInterval = null;
    let countdownLastUpdate = null;
    let countdownTotalTime = 0;
    let countdownRemaining = 0;
    let alarmTriggered = false;
    let alarmOscillator = null;
    let countdownState = "notStarted"; // "notStarted", "running", "paused"
    let countdownDigits = "";

    // Muestra la pantalla deseada
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    function updateCountdownDisplay(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(ms % 1000).padStart(3, '0');
        countdownTime.textContent = `${hours}:${minutes}:${seconds}`;
        countdownMS.textContent = milliseconds;
    }

    function updateCountdownDisplayFromDigits() {
        const padded = countdownDigits.padStart(6, '0');
        const hh = padded.slice(0,2);
        const mm = padded.slice(2,4);
        const ss = padded.slice(4,6);
        countdownTime.textContent = `${hh}:${mm}:${ss}`;
        countdownMS.textContent = "000";
    }

    function playAlarm() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        alarmOscillator = audioCtx.createOscillator();
        alarmOscillator.type = 'sine';
        alarmOscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        alarmOscillator.connect(audioCtx.destination);
        alarmOscillator.start();
        alarmOscillator.stop(audioCtx.currentTime + 1);
    }

    function updateCountdown() {
        const now = Date.now();
        const elapsed = now - countdownLastUpdate;
        countdownRemaining -= elapsed;
        countdownLastUpdate = now;
        if (countdownRemaining <= 0) {
            countdownRemaining = 0;
            clearInterval(countdownInterval);
            countdownInterval = null;
            if (!alarmTriggered) {
                playAlarm();
                alarmTriggered = true;
            }
            countdownToggleButton.classList.add('hidden');
        }
        updateCountdownDisplay(countdownRemaining);
    }

    // Botones de dígitos
    digitButtons.forEach(button => {
        button.addEventListener('click', function() {
            countdownDigits += this.getAttribute('data-value');
            if (countdownDigits.length > 6) {
                countdownDigits = countdownDigits.slice(-6);
            }
            updateCountdownDisplayFromDigits();
        });
    });

    // Botón Clear (fila de dígitos)
    countdownClearButton.addEventListener('click', function() {
        countdownDigits = "";
        updateCountdownDisplayFromDigits();
    });

    // Botón Set
    countdownSetButton.addEventListener('click', function() {
        const padded = countdownDigits.padStart(6, '0');
        let hh = parseInt(padded.slice(0,2));
        let mm = parseInt(padded.slice(2,4));
        let ss = parseInt(padded.slice(4,6));
        const totalSeconds = hh * 3600 + mm * 60 + ss;
        const normH = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const normM = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const normS = String(totalSeconds % 60).padStart(2, '0');

        countdownTime.textContent = `${normH}:${normM}:${normS}`;
        countdownMS.textContent = "000";

        countdownTotalTime = totalSeconds * 1000;
        countdownRemaining = countdownTotalTime;
        countdownDigits = normH + normM + normS;

        digitRows.classList.add('hidden');
        actionButtons.classList.remove('hidden');

        alarmTriggered = false;
        countdownState = "notStarted";
        countdownToggleButton.textContent = "Start";
        countdownToggleButton.classList.remove('hidden');
        // Aseguramos que el botón toggle esté en verde
        countdownToggleButton.classList.remove("ca-pause-button");
        countdownToggleButton.classList.add("ca-green-button");
    });

    // Botón Toggle (Start/Pause/Continue)
    countdownToggleButton.addEventListener('click', function() {
        if (countdownState === "notStarted" || countdownState === "paused") {
            // Start o Continue
            countdownLastUpdate = Date.now();
            countdownInterval = setInterval(updateCountdown, 10);
            countdownState = "running";
            countdownToggleButton.textContent = "Pause";
            // Cambiamos la clase a "ca-pause-button" (azul)
            countdownToggleButton.classList.remove("ca-green-button");
            countdownToggleButton.classList.add("ca-pause-button");
        } else if (countdownState === "running") {
            // Pause
            clearInterval(countdownInterval);
            countdownInterval = null;
            countdownState = "paused";
            countdownToggleButton.textContent = "Continue";
            // Volver a verde
            countdownToggleButton.classList.remove("ca-pause-button");
            countdownToggleButton.classList.add("ca-green-button");
        }
    });

    // Botón Stop
    countdownStopButton.addEventListener('click', function() {
        if (alarmOscillator) {
            try {
                alarmOscillator.stop();
            } catch (e) {}
            alarmOscillator = null;
        }
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        countdownRemaining = countdownTotalTime;
        updateCountdownDisplay(countdownRemaining);
        countdownState = "notStarted";
        countdownToggleButton.textContent = "Start";
        countdownToggleButton.classList.remove('hidden');
        // Regresa a fondo verde
        countdownToggleButton.classList.remove("ca-pause-button");
        countdownToggleButton.classList.add("ca-green-button");
    });

    // Botón Back en cuenta atrás
    countdownBack.addEventListener('click', function() {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownTotalTime = 0;
        countdownRemaining = 0;
        countdownDigits = "";
        updateCountdownDisplay(0);
        digitRows.classList.remove('hidden');
        actionButtons.classList.add('hidden');
        showScreen(screenMain);
    });

    /***************************************
     *         NAVEGACIÓN PRINCIPAL
     ***************************************/
    btnTimer.addEventListener('click', function() {
        showScreen(screenTimer);
    });

    btnCountdown.addEventListener('click', function() {
        countdownDigits = "";
        updateCountdownDisplayFromDigits();
        digitRows.classList.remove('hidden');
        actionButtons.classList.add('hidden');
        showScreen(screenCountdown);
    });
});
