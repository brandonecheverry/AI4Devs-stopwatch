// countdown.js: Lógica y eventos de la cuenta atrás
document.addEventListener('DOMContentLoaded', function() {
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

    digitButtons.forEach(button => {
        button.addEventListener('click', function() {
            countdownDigits += this.getAttribute('data-value');
            if (countdownDigits.length > 6) {
                countdownDigits = countdownDigits.slice(-6);
            }
            updateCountdownDisplayFromDigits();
        });
    });

    countdownClearButton.addEventListener('click', function() {
        countdownDigits = "";
        updateCountdownDisplayFromDigits();
    });

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
        countdownToggleButton.classList.remove("ca-pause-button");
        countdownToggleButton.classList.add("ca-green-button");
    });

    countdownToggleButton.addEventListener('click', function() {
        if (countdownState === "notStarted" || countdownState === "paused") {
            countdownLastUpdate = Date.now();
            countdownInterval = setInterval(updateCountdown, 10);
            countdownState = "running";
            countdownToggleButton.textContent = "Pause";
            countdownToggleButton.classList.remove("ca-green-button");
            countdownToggleButton.classList.add("ca-pause-button");
        } else if (countdownState === "running") {
            clearInterval(countdownInterval);
            countdownInterval = null;
            countdownState = "paused";
            countdownToggleButton.textContent = "Continue";
            countdownToggleButton.classList.remove("ca-pause-button");
            countdownToggleButton.classList.add("ca-green-button");
        }
    });

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
        countdownToggleButton.classList.remove("ca-pause-button");
        countdownToggleButton.classList.add("ca-green-button");
    });

    countdownBack.addEventListener('click', function() {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownTotalTime = 0;
        countdownRemaining = 0;
        countdownDigits = "";
        updateCountdownDisplay(0);
        digitRows.classList.remove('hidden');
        actionButtons.classList.add('hidden');
        showScreen(document.getElementById('screen-main'));
    });
});
