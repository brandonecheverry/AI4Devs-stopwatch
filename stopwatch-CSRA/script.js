/********************************************
 *          VARIABLES GLOBALES
 ********************************************/
// Para el Temporizador (Countdown)
let countdownInterval = null;
let countdownTimeInSeconds = 0; 
let initialTimeInSeconds = 0;

// Para el Cronómetro
let stopwatchInterval = null;
let stopwatchSeconds = 0;

// Audio de la sirena (ambulancia)
const alarmAudio = document.getElementById("alarmAudio");

/********************************************
 *          MOSTRAR/OCULTAR SECCIONES
 ********************************************/
const mainMenu = document.getElementById("mainMenu");
const timerSection = document.getElementById("timerSection");
const stopwatchSection = document.getElementById("stopwatchSection");

function showSection(sectionToShow) {
  // Oculta todas
  mainMenu.classList.add("section-hidden");
  timerSection.classList.add("section-hidden");
  stopwatchSection.classList.add("section-hidden");

  // Muestra la elegida
  sectionToShow.classList.remove("section-hidden");
  sectionToShow.classList.add("section-active");
}

function returnToMenu() {
  // Detener cualquier cuenta que esté corriendo
  stopCountdown();
  stopStopwatch();
  
  // Volver al menú principal
  showSection(mainMenu);
}

/********************************************
 *        LÓGICA DEL TEMPORIZADOR
 ********************************************/
function startCountdown() {
  // Si ya está corriendo, evitar doble inicio
  if (countdownInterval) return;

  // Obtener valores de hora, minuto, segundo
  const hours = parseInt(document.getElementById("hoursInput").value, 10) || 0;
  const minutes = parseInt(document.getElementById("minutesInput").value, 10) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value, 10) || 0;

  // Calcular total en segundos y guardar como referencia
  countdownTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  initialTimeInSeconds = countdownTimeInSeconds;

  // Si no hay tiempo, no iniciar
  if (countdownTimeInSeconds <= 0) return;

  // Actualizar visualmente antes de iniciar
  updateTimerDisplay(countdownTimeInSeconds);

  // Iniciar intervalo de 1s
  countdownInterval = setInterval(() => {
    countdownTimeInSeconds--;
    updateTimerDisplay(countdownTimeInSeconds);

    // Verificar si se acabó el tiempo
    if (countdownTimeInSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      // Reproducir la sirena de ambulancia en loop
      alarmAudio.currentTime = 0;
      alarmAudio.play();
    }
  }, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  // Pausar alarma si suena
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
}

function resetCountdown() {
  // Detener la cuenta
  stopCountdown();
  // Regresar al tiempo inicial
  countdownTimeInSeconds = initialTimeInSeconds;
  updateTimerDisplay(countdownTimeInSeconds);
}

function updateTimerDisplay(seconds) {
  if (seconds < 0) seconds = 0; // Evitar valores negativos al mostrar
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  document.getElementById("timerDisplay").textContent = 
    `${padTime(hrs)}:${padTime(mins)}:${padTime(secs)}`;
}

/********************************************
 *          LÓGICA DEL CRONÓMETRO
 ********************************************/
function startStopwatch() {
  if (stopwatchInterval) return; // Ya está corriendo

  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    updateStopwatchDisplay(stopwatchSeconds);
  }, 1000);
}

function pauseStopwatch() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
}

function resetStopwatch() {
  pauseStopwatch();
  stopwatchSeconds = 0;
  updateStopwatchDisplay(stopwatchSeconds);
}

function stopStopwatch() {
  pauseStopwatch();
}

/********************************************
 *     ACTUALIZAR PANTALLA CRONÓMETRO
 ********************************************/
function updateStopwatchDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  document.getElementById("stopwatchDisplay").textContent =
    `${padTime(hrs)}:${padTime(mins)}:${padTime(secs)}`;
}

/********************************************
 *       FUNCIONES DE AYUDA (UTILS)
 ********************************************/
function padTime(num) {
  return num < 10 ? "0" + num : num;
}

/********************************************
 *       ASIGNAR EVENTOS A BOTONES
 ********************************************/
// Botones del Menú Principal
document.getElementById("btnTemporizador").addEventListener("click", () => {
  showSection(timerSection);
});
document.getElementById("btnCronometro").addEventListener("click", () => {
  showSection(stopwatchSection);
});

// Temporizador
document.getElementById("btnIniciarTimer").addEventListener("click", startCountdown);
document.getElementById("btnDetenerTimer").addEventListener("click", stopCountdown);
document.getElementById("btnResetTimer").addEventListener("click", resetCountdown);
document.getElementById("btnVolverMenuTimer").addEventListener("click", returnToMenu);

// Cronómetro
document.getElementById("btnIniciarStopwatch").addEventListener("click", startStopwatch);
document.getElementById("btnPausarStopwatch").addEventListener("click", pauseStopwatch);
document.getElementById("btnResetStopwatch").addEventListener("click", resetStopwatch);
document.getElementById("btnVolverMenuStopwatch").addEventListener("click", returnToMenu);