/*
  script.js
  Lógica para Stopwatch y Countdown con navegación entre “páginas”
*/

document.addEventListener('DOMContentLoaded', () => {
  // Páginas
  const pages = {
    main: document.getElementById('main-menu'),
    stopwatch: document.getElementById('stopwatch-page'),
    countdownSetup: document.getElementById('countdown-setup-page'),
    countdown: document.getElementById('countdown-page')
  };

  // Función para mostrar una página y ocultar las demás
  function showPage(pageName) {
    for (let key in pages) {
      pages[key].style.display = key === pageName ? 'block' : 'none';
    }
  }

  /* === Navegación === */
  document.getElementById('to-stopwatch').addEventListener('click', () => {
    showPage('stopwatch');
  });

  document.getElementById('to-countdown-setup').addEventListener('click', () => {
    showPage('countdownSetup');
  });

  document.getElementById('stopwatch-back').addEventListener('click', () => {
    showPage('main');
    resetStopwatch();
  });

  document.getElementById('countdown-setup-back').addEventListener('click', () => {
    showPage('main');
    resetCountdownSetup();
  });

  document.getElementById('countdown-back').addEventListener('click', () => {
    // Regresamos al setup para poder modificar la configuración
    showPage('countdownSetup');
    resetCountdown();
  });

  /* =========================
     LÓGICA DEL STOPWATCH
  ========================= */
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  const stopwatchToggleBtn = document.getElementById('stopwatch-toggle');
  const stopwatchClearBtn = document.getElementById('stopwatch-clear');

  let stopwatchInterval = null;
  let stopwatchStartTime = 0;
  let stopwatchElapsed = 0;
  let stopwatchRunning = false;

  stopwatchToggleBtn.addEventListener('click', () => {
    if (!stopwatchRunning) {
      // Si está en estado "Start" o "Continue"
      stopwatchStartTime = Date.now() - stopwatchElapsed;
      stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
      stopwatchRunning = true;
      stopwatchToggleBtn.textContent = 'Pause';
    } else {
      // Está corriendo: se pausa
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
      stopwatchToggleBtn.textContent = 'Continue';
    }
  });

  stopwatchClearBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchElapsed = 0;
    stopwatchDisplay.textContent = '00:00:00.000';
    stopwatchToggleBtn.textContent = 'Start';
  });

  function updateStopwatchDisplay() {
    stopwatchElapsed = Date.now() - stopwatchStartTime;
    let ms = stopwatchElapsed % 1000;
    let totalSec = Math.floor(stopwatchElapsed / 1000);
    let hh = Math.floor(totalSec / 3600);
    let mm = Math.floor((totalSec % 3600) / 60);
    let ss = totalSec % 60;
    stopwatchDisplay.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}.${ms.toString().padStart(3, '0')}`;
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchElapsed = 0;
    stopwatchDisplay.textContent = '00:00:00.000';
    stopwatchToggleBtn.textContent = 'Start';
  }

  /* =========================
     LÓGICA DEL COUNTDOWN SETUP
  ========================= */
  const countdownSetupDisplay = document.getElementById('countdown-setup-display');
  const numKeys = document.querySelectorAll('.num-key');
  const countdownSetBtn = document.getElementById('countdown-set');
  const countdownSetupClearBtn = document.getElementById('countdown-setup-clear');

  // Al hacer clic en cada tecla numérica se actualiza el display
  numKeys.forEach(key => {
    key.addEventListener('click', () => {
      let current = countdownSetupDisplay.textContent.replace(/:/g, ''); // Ej: "000000"
      current = current.slice(1) + key.getAttribute('data-value');
      const hh = current.slice(0,2);
      const mm = current.slice(2,4);
      const ss = current.slice(4,6);
      countdownSetupDisplay.textContent = `${hh}:${mm}:${ss}`;
    });
  });

  countdownSetBtn.addEventListener('click', () => {
    // Al hacer clic en Set se guarda la configuración y se navega a la página Countdown
    countdownTotalSeconds = timeStrToSeconds(countdownSetupDisplay.textContent);
    // Si el tiempo es mayor a cero, cambiamos de pantalla
    if (countdownTotalSeconds > 0) {
      // Actualizamos el display de la página Countdown
      countdownDisplay.textContent = countdownSetupDisplay.textContent;
      showPage('countdown');
    }
  });

  countdownSetupClearBtn.addEventListener('click', resetCountdownSetup);

  function resetCountdownSetup() {
    countdownSetupDisplay.textContent = '00:00:00';
  }

  /* =========================
     LÓGICA DEL COUNTDOWN
  ========================= */
  const countdownDisplay = document.getElementById('countdown-display');
  const countdownToggleBtn = document.getElementById('countdown-toggle');
  const countdownClearBtn = document.getElementById('countdown-clear');

  let countdownInterval = null;
  let countdownTotalSeconds = 0;
  let countdownRunning = false;

  countdownToggleBtn.addEventListener('click', () => {
    if (!countdownRunning) {
      // Inicia o reanuda la cuenta atrás
      countdownToggleBtn.textContent = 'Pause';
      countdownRunning = true;
      countdownInterval = setInterval(() => {
        if (countdownTotalSeconds <= 0) {
          clearInterval(countdownInterval);
          countdownRunning = false;
          countdownToggleBtn.textContent = 'Start';
          playAlarmSound();
        } else {
          countdownTotalSeconds--;
          updateCountdownDisplay();
        }
      }, 1000);
    } else {
      // Pausa la cuenta atrás
      clearInterval(countdownInterval);
      countdownRunning = false;
      countdownToggleBtn.textContent = 'Continue';
    }
  });

  countdownClearBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTotalSeconds = 0;
    countdownDisplay.textContent = '00:00:00';
    countdownToggleBtn.textContent = 'Start';
  });

  function updateCountdownDisplay() {
    let hh = Math.floor(countdownTotalSeconds / 3600);
    let mm = Math.floor((countdownTotalSeconds % 3600) / 60);
    let ss = countdownTotalSeconds % 60;
    countdownDisplay.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  }

  function resetCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTotalSeconds = 0;
    countdownDisplay.textContent = '00:00:00';
    countdownToggleBtn.textContent = 'Start';
  }

  /* =========================
     UTILIDADES
  ========================= */
  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function timeStrToSeconds(str) {
    const parts = str.split(':');
    const hh = parseInt(parts[0], 10) || 0;
    const mm = parseInt(parts[1], 10) || 0;
    const ss = parseInt(parts[2], 10) || 0;
    return hh * 3600 + mm * 60 + ss;
  }

  /* =========================
     SONIDOS
  ========================= */
  function playAlarmSound() {
    // Asegúrate de contar con el archivo sounds/alarm.wav
    const alarm = new Audio('sounds/alarm.wav');
    alarm.play().catch(err => console.log('Error reproduciendo sonido:', err));
  }
});
