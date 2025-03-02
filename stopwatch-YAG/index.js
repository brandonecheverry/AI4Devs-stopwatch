/***********************************************
 * index.js
 * Lógica del Cronómetro
 **********************************************/

// Variables de control
let startTime = 0;         // Timestamp (performance.now()) en el que se inició el cronómetro
let elapsedTime = 0;       // Tiempo total acumulado mientras está pausado
let requestId = null;      // ID de rAF para animar/actualizar
let isRunning = false;     // Estado del cronómetro

// Elementos del DOM
const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const startPauseText = document.getElementById("startPauseText");
const lapBtn = document.getElementById("lapBtn");
const clearBtn = document.getElementById("clearBtn");
const lapsList = document.getElementById("lapsList");

// Límite de vueltas
const MAX_LAPS = 10;

// Almacenamiento en localStorage
// Clave usada para persistir historial de vueltas
const STORAGE_KEY_LAPS = "yag_stopwatch_laps";

// Se cargan las vueltas almacenadas en localStorage
let laps = loadLapsFromLocalStorage();
renderLaps();

// ------------------------------------------------------
// Eventos: Botones
// ------------------------------------------------------

// Iniciar / Pausar / Continuar
startPauseBtn.addEventListener("click", toggleStartPause);

// Capturar vuelta
lapBtn.addEventListener("click", captureLap);

// Limpiar cronómetro
clearBtn.addEventListener("click", clearAll);

// ------------------------------------------------------
// Eventos: Teclado
// ------------------------------------------------------
document.addEventListener("keydown", (e) => {
  // Prevenir scroll con la barra espaciadora, si fuera necesario
  if (e.code === "Space") {
    e.preventDefault();
  }
  
  if (e.code === "Space") {
    toggleStartPause();
  } else if (e.key === "l" || e.key === "L") {
    clearAll();
  } else if (e.key === "v" || e.key === "V") {
    captureLap();
  }
});

// ------------------------------------------------------
// Funciones principales
// ------------------------------------------------------

/**
 * toggleStartPause
 * Cambia el estado del cronómetro:
 * - Si está detenido, iniciar.
 * - Si está en marcha, pausar.
 * - Si está pausado, continuar.
 */
function toggleStartPause() {
  if (!isRunning) {
    // Iniciar / Reanudar
    isRunning = true;
    startTime = performance.now() - elapsedTime;
    requestId = requestAnimationFrame(updateTimer);

    startPauseText.textContent = "Pausar";
    startPauseBtn.setAttribute("aria-label", "Pausar cronómetro");
  } else {
    // Pausar
    isRunning = false;
    elapsedTime = performance.now() - startTime;
    cancelAnimationFrame(requestId);

    startPauseText.textContent = "Continuar";
    startPauseBtn.setAttribute("aria-label", "Continuar cronómetro");
  }
}

/**
 * updateTimer
 * Utiliza requestAnimationFrame para actualizar el display cada frame.
 */
function updateTimer(timestamp) {
  if (!isRunning) return; // protección en caso de desincronización

  const currentTime = performance.now();
  const totalTime = currentTime - startTime;
  displayTime(totalTime);

  // Continuar requestAnimationFrame
  requestId = requestAnimationFrame(updateTimer);
}

/**
 * captureLap
 * Registra una vuelta en el historial, si el cronómetro está activo.
 */
function captureLap() {
  if (!isRunning) {
    // No capturar vueltas si está detenido o pausado
    return;
  }
  
  // El tiempo actual
  const currentTime = performance.now() - startTime;
  const formattedTime = formatTime(currentTime);

  // Insertar al final del array
  laps.push(formattedTime);

  // Controlar el desplazamiento (si excede 10)
  if (laps.length > MAX_LAPS) {
    laps.shift(); // Remueve el primero
  }

  // Persistir
  saveLapsToLocalStorage(laps);

  // Renderizar
  renderLaps(true); // true -> aplicar efecto de parpadeo a la última vuelta
}

/**
 * clearAll
 * Limpia el cronómetro y el historial de vueltas.
 */
function clearAll() {
  // Detener y resetear variables
  isRunning = false;
  cancelAnimationFrame(requestId);
  startPauseText.textContent = "Iniciar";
  startPauseBtn.setAttribute("aria-label", "Iniciar cronómetro");

  // Resetear tiempo
  startTime = 0;
  elapsedTime = 0;
  displayTime(0);

  // Limpiar historial
  laps = [];
  saveLapsToLocalStorage(laps);
  renderLaps();
}

/**
 * displayTime
 * Actualiza el elemento de tiempo con el formato mm:ss.ms
 */
function displayTime(milliseconds) {
  timerDisplay.textContent = formatTime(milliseconds);
}

/**
 * formatTime
 * Devuelve una cadena en formato mm:ss.mmm o hh:mm:ss.mmm
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Si no llega a la hora, se usa mm:ss.mmm
  // Si llega/hay horas, se usa hh:mm:ss.mmm
  if (hours > 0) {
    return (
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + "." +
      String(Math.floor(milliseconds)).padStart(3, "0")
    );
  } else {
    return (
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + "." +
      String(Math.floor(milliseconds)).padStart(3, "0")
    );
  }
}

// ------------------------------------------------------
// Manejo de Laps en la Interfaz
// ------------------------------------------------------

/**
 * renderLaps
 * Vuelca el array de vueltas en la lista <ul>.
 */
function renderLaps(highlightLast = false) {
  lapsList.innerHTML = "";

  laps.forEach((lapTime, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${lapTime}`;
    li.classList.add("lap-item");
    
    // En la última vuelta, opcionalmente aplicamos animación de parpadeo
    if (highlightLast && index === laps.length - 1) {
      li.classList.add("highlight");
      // Remover la clase después de un breve tiempo (para que parpadee solo una vez)
      setTimeout(() => {
        li.classList.remove("highlight");
      }, 1500);
    }

    lapsList.appendChild(li);
  });
}

// ------------------------------------------------------
// localStorage utils
// ------------------------------------------------------
function saveLapsToLocalStorage(lapsArray) {
  localStorage.setItem(STORAGE_KEY_LAPS, JSON.stringify(lapsArray));
}

function loadLapsFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY_LAPS);
  return stored ? JSON.parse(stored) : [];
}
