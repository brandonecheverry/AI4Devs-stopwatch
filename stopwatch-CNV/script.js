/* script.js */

// Mapeo de pantallas
const screens = {
    initial: document.getElementById("initialScreen"),
    stopwatch: document.getElementById("stopwatchScreen"),
    countdown: document.getElementById("countdownScreen"),
    downwatch: document.getElementById("downwatchScreen")
  };
  
  function showScreen(screenId) {
    for (let key in screens) {
      screens[key].classList.remove("active");
    }
    screens[screenId].classList.add("active");
  }
  
  // Función para formatear tiempo a partir de milisegundos
  function formatTime(totalMs) {
    let totalSeconds = Math.floor(totalMs / 1000);
    let ms = totalMs % 1000;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return {
      time:
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0"),
      ms: String(ms).padStart(3, "0")
    };
  }
  
  /* ==================== */
  /* Funcionalidad Stopwatch */
  /* ==================== */
  let stopwatchInterval = null;
  let stopwatchElapsed = 0;
  let stopwatchState = "stopped"; // estados: "stopped", "running", "paused"
  let stopwatchLastUpdate = null;
  
  function updateStopwatchDisplay() {
    const { time, ms } = formatTime(stopwatchElapsed);
    document.getElementById("stopwatchTime").textContent = time;
    document.getElementById("stopwatchMs").textContent = ms;
  }
  
  function startStopwatch() {
    stopwatchState = "running";
    document.getElementById("swStartBtn").textContent = "Pause";
    stopwatchLastUpdate = Date.now();
    stopwatchInterval = setInterval(() => {
      let now = Date.now();
      let delta = now - stopwatchLastUpdate;
      stopwatchElapsed += delta;
      stopwatchLastUpdate = now;
      updateStopwatchDisplay();
    }, 10);
  }
  
  function pauseStopwatch() {
    stopwatchState = "paused";
    clearInterval(stopwatchInterval);
    document.getElementById("swStartBtn").textContent = "Continue";
  }
  
  function clearStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchElapsed = 0;
    stopwatchState = "stopped";
    document.getElementById("swStartBtn").textContent = "Start";
    updateStopwatchDisplay();
  }
  
  /* ==================== */
  /* Funcionalidad Downwatch (Countdown en cuenta atrás) */
  /* ==================== */
  let downwatchInterval = null;
  let downwatchRemaining = 0;
  let downwatchState = "stopped"; // "stopped", "running", "paused"
  let downwatchPreset = 0; // valor configurado en ms
  let downwatchLastUpdate = null;
  
  function updateDownwatchDisplay() {
    const { time, ms } = formatTime(downwatchRemaining);
    document.getElementById("downwatchTime").textContent = time;
    document.getElementById("downwatchMs").textContent = ms;
  }
  
  function startDownwatch() {
    if (downwatchRemaining <= 0) return;
    downwatchState = "running";
    document.getElementById("dwStartBtn").textContent = "Pause";
    downwatchLastUpdate = Date.now();
    downwatchInterval = setInterval(() => {
      let now = Date.now();
      let delta = now - downwatchLastUpdate;
      downwatchLastUpdate = now;
      downwatchRemaining -= delta;
      if (downwatchRemaining <= 0) {
        downwatchRemaining = 0;
        clearInterval(downwatchInterval);
        document.getElementById("dwStartBtn").textContent = "Start";
        downwatchState = "stopped";
      }
      updateDownwatchDisplay();
    }, 10);
  }
  
  function pauseDownwatch() {
    downwatchState = "paused";
    clearInterval(downwatchInterval);
    document.getElementById("dwStartBtn").textContent = "Continue";
  }
  
  function clearDownwatch() {
    clearInterval(downwatchInterval);
    downwatchRemaining = downwatchPreset;
    downwatchState = "stopped";
    document.getElementById("dwStartBtn").textContent = "Start";
    updateDownwatchDisplay();
  }
  
  /* ==================== */
  /* Funcionalidad Countdown (configuración) */
  /* ==================== */
  // Usamos una cadena de 6 dígitos (HHMMSS)
  let countdownInput = "000000";
  
  function updateCountdownDisplay() {
    let formatted = countdownInput.slice(0, 2) + ":" +
                    countdownInput.slice(2, 4) + ":" +
                    countdownInput.slice(4, 6);
    document.getElementById("countdownTime").textContent = formatted;
    document.getElementById("countdownMs").textContent = "000";
  }
  
  /* ==================== */
  /* Eventos y listeners */
  /* ==================== */
  document.addEventListener("DOMContentLoaded", function() {
    // Pantalla Inicial
    document.getElementById("btnStopwatch").addEventListener("click", function() {
      clearStopwatch();
      showScreen("stopwatch");
    });
    document.getElementById("btnCountdown").addEventListener("click", function() {
      countdownInput = "000000";
      updateCountdownDisplay();
      showScreen("countdown");
    });
    
    // Eventos en Pantalla Stopwatch
    document.getElementById("swStartBtn").addEventListener("click", function() {
      if (stopwatchState === "stopped" || stopwatchState === "paused") {
        startStopwatch();
      } else if (stopwatchState === "running") {
        pauseStopwatch();
      }
    });
    document.getElementById("swClearBtn").addEventListener("click", function() {
      clearStopwatch();
    });
    document.getElementById("swBackBtn").addEventListener("click", function() {
      clearStopwatch();
      showScreen("initial");
    });
  
    // Eventos en Pantalla Countdown (configuración)
    const numberButtons = document.querySelectorAll("#countdownScreen .number-button");
    numberButtons.forEach(btn => {
      btn.addEventListener("click", function() {
        // Se remueve el primer dígito y se añade el dígito pulsado al final
        countdownInput = countdownInput.slice(1) + btn.textContent;
        updateCountdownDisplay();
      });
    });
    document.getElementById("cdClearBtn").addEventListener("click", function() {
      countdownInput = "000000";
      updateCountdownDisplay();
    });
    document.getElementById("cdSetBtn").addEventListener("click", function() {
      // Convertir countdownInput (HHMMSS) a milisegundos
      let hours = parseInt(countdownInput.slice(0, 2), 10);
      let minutes = parseInt(countdownInput.slice(2, 4), 10);
      let seconds = parseInt(countdownInput.slice(4, 6), 10);
      downwatchPreset = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
      downwatchRemaining = downwatchPreset;
      updateDownwatchDisplay();
      downwatchState = "stopped";
      document.getElementById("dwStartBtn").textContent = "Start";
      showScreen("downwatch");
    });
    document.getElementById("cdBackBtn").addEventListener("click", function() {
      showScreen("initial");
    });
  
    // Eventos en Pantalla Downwatch
    document.getElementById("dwStartBtn").addEventListener("click", function() {
      if (downwatchState === "stopped" || downwatchState === "paused") {
        startDownwatch();
      } else if (downwatchState === "running") {
        pauseDownwatch();
      }
    });
    document.getElementById("dwClearBtn").addEventListener("click", function() {
      clearDownwatch();
    });
    document.getElementById("dwBackBtn").addEventListener("click", function() {
      clearDownwatch();
      showScreen("initial");
    });
  });
  