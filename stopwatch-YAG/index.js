/***********************************************
 * index.js
 * Lógica del Cronómetro y Cuenta Atrás
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
const lapsSection = document.getElementById("lapsSection");
const resetBtn = document.getElementById("resetBtn");
const lapShortcut = document.getElementById("lapShortcut");
const countdownConfig = document.getElementById("countdownConfig");
const stopwatchModeBtn = document.getElementById("stopwatchModeBtn");
const countdownModeBtn = document.getElementById("countdownModeBtn");
const alarmSound = document.getElementById("alarmSound");

// Inputs para configurar el countdown
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

// Variables específicas para countdown
let currentMode = "stopwatch"; // Puede ser "stopwatch" o "countdown"
let countdownTime = 0;         // Tiempo total en ms para el countdown
let initialCountdownTime = 0;  // Tiempo inicial para el reset
let isCountdownFinished = false; // Indica si la cuenta atrás ha terminado
let alarmInterval = null;      // Intervalo para reproducir el sonido de alarma

// Límite de vueltas
const MAX_LAPS = 10;

// Almacenamiento en localStorage
// Clave usada para persistir historial de vueltas
const STORAGE_KEY_LAPS = "yag_stopwatch_laps";

// Se cargan las vueltas almacenadas en localStorage
let laps = loadLapsFromLocalStorage();
renderLaps();

// ------------------------------------------------------
// Inicialización
// ------------------------------------------------------

// Configurar eventos para los botones de incremento/decremento
setupTimeInputControls();

// ------------------------------------------------------
// Eventos: Botones
// ------------------------------------------------------

// Iniciar / Pausar / Continuar
startPauseBtn.addEventListener("click", toggleStartPause);

// Reiniciar cuenta atrás
resetBtn.addEventListener("click", resetCountdown);

// Capturar vuelta
lapBtn.addEventListener("click", captureLap);

// Limpiar cronómetro
clearBtn.addEventListener("click", clearAll);

// Cambiar entre cronómetro y cuenta atrás
stopwatchModeBtn.addEventListener("click", () => switchMode("stopwatch"));
countdownModeBtn.addEventListener("click", () => switchMode("countdown"));

// Validar valores de entrada numérica
hoursInput.addEventListener("input", () => validateTimeInput(hoursInput, 0, 23));
minutesInput.addEventListener("input", () => validateTimeInput(minutesInput, 0, 59));
secondsInput.addEventListener("input", () => validateTimeInput(secondsInput, 0, 59));

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
  } else if ((e.key === "v" || e.key === "V") && currentMode === "stopwatch") {
    captureLap();
  }
});

// ------------------------------------------------------
// Funciones principales
// ------------------------------------------------------

/**
 * toggleStartPause
 * Cambia el estado del cronómetro o cuenta atrás:
 * - Si está detenido, iniciar.
 * - Si está en marcha, pausar.
 * - Si está pausado, continuar.
 */
function toggleStartPause() {
  // Para la cuenta atrás, verificar que hay un valor configurado
  if (currentMode === "countdown" && !isRunning && elapsedTime === 0) {
    const configuredTime = getConfiguredTime();
    if (configuredTime <= 0) {
      alert("Por favor, configure un tiempo válido mayor a 00:00:00");
      return;
    }
    countdownTime = configuredTime;
    initialCountdownTime = configuredTime;
    
    // Ocultar la configuración al iniciar
    countdownConfig.classList.add("hidden");
  }

  // Detener la alarma si está sonando
  if (isCountdownFinished) {
    stopAlarm();
    isCountdownFinished = false;
    timerDisplay.classList.remove("countdown-finished");
    enableButtons(true);
    return;
  }

  if (!isRunning) {
    // Iniciar / Reanudar
    isRunning = true;
    
    if (currentMode === "stopwatch") {
      startTime = performance.now() - elapsedTime;
      requestId = requestAnimationFrame(updateStopwatch);
    } else {
      // Para countdown, elapsedTime almacena cuánto tiempo ha transcurrido
      startTime = performance.now() - (initialCountdownTime - countdownTime);
      requestId = requestAnimationFrame(updateCountdown);
    }

    startPauseText.textContent = "Pausar";
    startPauseBtn.setAttribute("aria-label", 
      currentMode === "stopwatch" ? "Pausar cronómetro" : "Pausar cuenta atrás");
  } else {
    // Pausar
    isRunning = false;
    cancelAnimationFrame(requestId);
    
    if (currentMode === "stopwatch") {
      elapsedTime = performance.now() - startTime;
    } else {
      // Para countdown, actualizamos el tiempo restante
      const elapsedSinceSart = performance.now() - startTime;
      countdownTime = Math.max(0, initialCountdownTime - elapsedSinceSart);
    }

    startPauseText.textContent = "Continuar";
    startPauseBtn.setAttribute("aria-label", 
      currentMode === "stopwatch" ? "Continuar cronómetro" : "Continuar cuenta atrás");
  }
}

/**
 * updateStopwatch
 * Utiliza requestAnimationFrame para actualizar el display del cronómetro cada frame.
 */
function updateStopwatch(timestamp) {
  if (!isRunning) return; // protección en caso de desincronización

  const currentTime = performance.now();
  const totalTime = currentTime - startTime;
  displayTime(totalTime);

  // Continuar requestAnimationFrame
  requestId = requestAnimationFrame(updateStopwatch);
}

/**
 * updateCountdown
 * Utiliza requestAnimationFrame para actualizar el display de la cuenta atrás cada frame.
 */
function updateCountdown(timestamp) {
  if (!isRunning) return; // protección en caso de desincronización

  const currentTime = performance.now();
  const elapsedSinceSart = currentTime - startTime;
  const remainingTime = Math.max(0, initialCountdownTime - elapsedSinceSart);
  
  // Actualizar el tiempo de cuenta atrás para usar en caso de pausa
  countdownTime = remainingTime;
  
  // Mostrar el tiempo restante
  displayTime(remainingTime);
  
  // Comprobar si el tiempo restante está en el rango de advertencia o peligro
  updateVisualIndicators(remainingTime);
  
  // Verificar si llegó a cero
  if (remainingTime <= 0) {
    finishCountdown();
    return;
  }

  // Continuar requestAnimationFrame
  requestId = requestAnimationFrame(updateCountdown);
}

/**
 * finishCountdown
 * Maneja el final de la cuenta atrás.
 */
function finishCountdown() {
  isRunning = false;
  isCountdownFinished = true;
  cancelAnimationFrame(requestId);
  
  // Establecer a 0
  displayTime(0);
  
  // Deshabilitar botones excepto el de iniciar/pausar (que ahora será detener alarma)
  enableButtons(false);
  
  // Cambiar texto del botón
  startPauseText.textContent = "Detener Alarma";
  startPauseBtn.setAttribute("aria-label", "Detener alarma");
  
  // Efecto visual
  timerDisplay.classList.add("countdown-finished");
  document.body.classList.add("countdown-finished");
  
  // Reproducir alarma
  playAlarm();
}

/**
 * enableButtons
 * Habilita o deshabilita botones según el estado.
 */
function enableButtons(enable) {
  resetBtn.disabled = !enable;
  clearBtn.disabled = !enable;
  
  // Siempre dejar habilitado el botón de iniciar/pausar
  startPauseBtn.disabled = false;
}

/**
 * playAlarm
 * Reproduce el sonido de alarma en bucle.
 */
function playAlarm() {
  alarmSound.loop = true;
  alarmSound.play().catch(error => {
    console.error("Error reproduciendo alarma:", error);
  });

  // Asegurarnos de que siga sonando en caso de error
  alarmInterval = setInterval(() => {
    alarmSound.play().catch(() => {});
  }, 1000);
}

/**
 * stopAlarm
 * Detiene el sonido de alarma.
 */
function stopAlarm() {
  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }
  
  alarmSound.pause();
  alarmSound.currentTime = 0;
  
  // Limpiar efectos visuales
  document.body.classList.remove("countdown-finished");
}

/**
 * updateVisualIndicators
 * Actualiza los indicadores visuales según el tiempo restante.
 */
function updateVisualIndicators(remainingTime) {
  // Remover clases existentes
  timerDisplay.classList.remove("countdown-warning", "countdown-danger");
  timerDisplay.parentNode.classList.remove("countdown-bg", "danger");
  
  // Último 20% del tiempo: advertencia (amarillo)
  if (remainingTime <= initialCountdownTime * 0.2 && remainingTime > 5000) {
    timerDisplay.classList.add("countdown-warning");
    timerDisplay.parentNode.classList.add("countdown-bg");
  }
  // Últimos 5 segundos: peligro (rojo) + parpadeo
  else if (remainingTime <= 5000) {
    timerDisplay.classList.add("countdown-danger");
    timerDisplay.parentNode.classList.add("countdown-bg", "danger");
    
    // Parpadeo en los últimos 5 segundos
    if (!timerDisplay.classList.contains("blink") && remainingTime <= 5000) {
      timerDisplay.classList.add("blink");
      timerDisplay.style.animation = "highlightFlash 0.5s infinite";
    }
  } else {
    // Quitar el parpadeo si salimos de la zona de peligro
    timerDisplay.classList.remove("blink");
    timerDisplay.style.animation = "";
  }
}

/**
 * resetCountdown
 * Reinicia la cuenta atrás al valor inicial.
 */
function resetCountdown() {
  // Detener si está en marcha
  if (isRunning) {
    isRunning = false;
    cancelAnimationFrame(requestId);
  }
  
  // Reiniciar a los valores iniciales
  countdownTime = initialCountdownTime;
  
  // Mostrar el tiempo configurado
  displayTime(countdownTime);
  
  // Limpiar indicadores visuales
  timerDisplay.classList.remove("countdown-warning", "countdown-danger", "blink", "countdown-finished");
  timerDisplay.parentNode.classList.remove("countdown-bg", "danger");
  timerDisplay.style.animation = "";
  
  // Actualizar botón
  startPauseText.textContent = "Iniciar";
  startPauseBtn.setAttribute("aria-label", "Iniciar cuenta atrás");
  
  // Si se había terminado, restaurar botones
  if (isCountdownFinished) {
    isCountdownFinished = false;
    enableButtons(true);
    stopAlarm();
  }
  
  // Volver a mostrar la configuración
  countdownConfig.classList.remove("hidden");
}

/**
 * captureLap
 * Registra una vuelta en el historial, si el cronómetro está activo.
 */
function captureLap() {
  // Solo permitir vueltas en modo cronómetro
  if (currentMode !== "stopwatch" || !isRunning) {
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
 * Limpia el cronómetro/cuenta atrás y el historial de vueltas.
 */
function clearAll() {
  // Detener y resetear variables
  isRunning = false;
  cancelAnimationFrame(requestId);
  startPauseText.textContent = "Iniciar";
  startPauseBtn.setAttribute("aria-label", 
    currentMode === "stopwatch" ? "Iniciar cronómetro" : "Iniciar cuenta atrás");

  // Detener alarma si está sonando
  if (isCountdownFinished) {
    stopAlarm();
    isCountdownFinished = false;
  }

  // Resetear valores específicos según el modo
  if (currentMode === "stopwatch") {
    // Modo cronómetro
    startTime = 0;
    elapsedTime = 0;
    displayTime(0);
    
    // Limpiar historial
    laps = [];
    saveLapsToLocalStorage(laps);
    renderLaps();
  } else {
    // Modo cuenta atrás
    countdownTime = 0;
    initialCountdownTime = 0;
    displayTime(0);
    
    // Resetear inputs
    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
    
    // Mostrar la configuración
    countdownConfig.classList.remove("hidden");
    
    // Limpiar indicadores visuales
    timerDisplay.classList.remove("countdown-warning", "countdown-danger", "blink", "countdown-finished");
    timerDisplay.parentNode.classList.remove("countdown-bg", "danger");
    timerDisplay.style.animation = "";
  }
  
  // Restaurar botones
  enableButtons(true);
}

/**
 * displayTime
 * Actualiza el elemento de tiempo con el formato mm:ss.ms o hh:mm:ss.ms
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
// Funciones para la Cuenta Atrás
// ------------------------------------------------------

/**
 * switchMode
 * Cambia entre modo cronómetro y cuenta atrás.
 */
function switchMode(mode) {
  if (mode === currentMode) return;
  
  // Detener cualquier operación en curso
  isRunning = false;
  cancelAnimationFrame(requestId);
  stopAlarm();
  
  currentMode = mode;
  
  // Resetear valores
  startTime = 0;
  elapsedTime = 0;
  countdownTime = 0;
  initialCountdownTime = 0;
  isCountdownFinished = false;
  
  // Actualizar UI
  if (mode === "stopwatch") {
    // Activar modo cronómetro
    stopwatchModeBtn.classList.add("mode-active");
    countdownModeBtn.classList.remove("mode-active");
    
    // Mostrar/ocultar elementos
    lapBtn.classList.remove("hidden");
    resetBtn.classList.add("hidden");
    lapsSection.classList.remove("hidden");
    countdownConfig.classList.add("hidden");
    lapShortcut.classList.remove("hidden");
    
    // Cargar vueltas del localStorage
    laps = loadLapsFromLocalStorage();
    renderLaps();
  } else {
    // Activar modo cuenta atrás
    stopwatchModeBtn.classList.remove("mode-active");
    countdownModeBtn.classList.add("mode-active");
    
    // Mostrar/ocultar elementos
    lapBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    lapsSection.classList.add("hidden");
    countdownConfig.classList.remove("hidden");
    lapShortcut.classList.add("hidden");
    
    // Resetear la configuración de tiempo
    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
  }
  
  // Resetear display
  displayTime(0);
  
  // Resetear clases y botones
  timerDisplay.classList.remove("countdown-warning", "countdown-danger", "blink", "countdown-finished");
  timerDisplay.parentNode.classList.remove("countdown-bg", "danger");
  timerDisplay.style.animation = "";
  
  startPauseText.textContent = "Iniciar";
  startPauseBtn.setAttribute("aria-label", 
    mode === "stopwatch" ? "Iniciar cronómetro" : "Iniciar cuenta atrás");
  
  enableButtons(true);
}

/**
 * setupTimeInputControls
 * Configura los controles de incremento/decremento para los inputs de tiempo.
 */
function setupTimeInputControls() {
  // Obtener todos los botones de incremento/decremento
  const timeButtons = document.querySelectorAll(".time-btn");
  
  timeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      const isUp = button.classList.contains("up");
      
      let input;
      let max;
      
      // Determinar el input y el valor máximo
      switch (target) {
        case "hours":
          input = hoursInput;
          max = 23;
          break;
        case "minutes":
          input = minutesInput;
          max = 59;
          break;
        case "seconds":
          input = secondsInput;
          max = 59;
          break;
      }
      
      if (input) {
        let value = parseInt(input.value, 10);
        
        if (isUp) {
          // Incrementar y manejar overflow
          value = (value + 1) > max ? 0 : value + 1;
        } else {
          // Decrementar y manejar underflow
          value = (value - 1) < 0 ? max : value - 1;
        }
        
        // Actualizar el valor formateado
        input.value = String(value).padStart(2, "0");
      }
    });
  });
}

/**
 * validateTimeInput
 * Valida y formatea el valor de un input de tiempo.
 */
function validateTimeInput(input, min, max) {
  let value = input.value.trim();
  
  // Eliminar caracteres no numéricos
  value = value.replace(/[^0-9]/g, "");
  
  // Convertir a número
  let numValue = parseInt(value, 10);
  
  // Verificar rango
  if (isNaN(numValue)) {
    numValue = 0;
  } else if (numValue > max) {
    numValue = max;
  } else if (numValue < min) {
    numValue = min;
  }
  
  // Actualizar el valor formateado
  input.value = String(numValue).padStart(2, "0");
}

/**
 * getConfiguredTime
 * Obtiene el tiempo configurado en milisegundos.
 */
function getConfiguredTime() {
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;
  
  // Convertir a milisegundos
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
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
