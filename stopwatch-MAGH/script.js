
// Variables globales
let stopwatchInterval
let countdownInterval
let stopwatchTime = 0
let countdownTime = 0
let isRunning = false
let isCountdownRunning = false
let currentMode = "selection"

// Funciones de utilidad
function formatTime(time) {
  const hours = Math.floor(time / 3600000)
  const minutes = Math.floor((time % 3600000) / 60000)
  const seconds = Math.floor((time % 60000) / 1000)
  const milliseconds = time % 1000
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`
}

function updateDisplay(id, time) {
  document.getElementById(id).textContent = formatTime(time)
}

// Funciones para el cronómetro
function startStopwatch() {
  if (!isRunning) {
    isRunning = true
    document.getElementById("startStopButton").textContent = "Pause"
    document.getElementById("startStopButton").classList.remove("btn-start", "btn-continue")
    document.getElementById("startStopButton").classList.add("btn-pause")
    stopwatchInterval = setInterval(() => {
      stopwatchTime += 10
      updateDisplay("stopwatch", stopwatchTime)
    }, 10)
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false
    document.getElementById("startStopButton").textContent = "Continue"
    document.getElementById("startStopButton").classList.remove("btn-pause")
    document.getElementById("startStopButton").classList.add("btn-continue")
    clearInterval(stopwatchInterval)
  }
}

function continueStopwatch() {
  startStopwatch()
}

function resetStopwatch() {
  pauseStopwatch()
  stopwatchTime = 0
  updateDisplay("stopwatch", stopwatchTime)
  document.getElementById("startStopButton").textContent = "Start"
  document.getElementById("startStopButton").classList.remove("btn-continue", "btn-pause")
  document.getElementById("startStopButton").classList.add("btn-start")
}

// Funciones para la cuenta regresiva
function startCountdown() {
  if (!isCountdownRunning && countdownTime > 0) {
    isCountdownRunning = true
    document.getElementById("startStopCountdownButton").textContent = "Pause"
    document.getElementById("startStopCountdownButton").classList.remove("btn-start", "btn-continue")
    document.getElementById("startStopCountdownButton").classList.add("btn-pause")
    countdownInterval = setInterval(() => {
      countdownTime -= 10
      if (countdownTime <= 0) {
        clearCountdown()
      } else {
        updateDisplay("countdown", countdownTime)
      }
    }, 10)
  }
}

function pauseCountdown() {
  if (isCountdownRunning) {
    isCountdownRunning = false
    document.getElementById("startStopCountdownButton").textContent = "Continue"
    document.getElementById("startStopCountdownButton").classList.remove("btn-pause")
    document.getElementById("startStopCountdownButton").classList.add("btn-continue")
    clearInterval(countdownInterval)
  }
}

function continueCountdown() {
  startCountdown()
}

function resetCountdown() {
  pauseCountdown()
  countdownTime = 0
  updateDisplay("countdown", countdownTime)
  document.getElementById("startStopCountdownButton").textContent = "Start"
  document.getElementById("startStopCountdownButton").classList.remove("btn-continue", "btn-pause")
  document.getElementById("startStopCountdownButton").classList.add("btn-start")
}

function setCountdownTime(time) {
  countdownTime = time
  updateDisplay("countdown", countdownTime)
}

// Funciones de interfaz
function showStopwatch() {
  currentMode = "stopwatch"
  document.getElementById("selection").style.display = "none"
  document.getElementById("stopwatch").style.display = "block"
  document.getElementById("stopwatchButtons").style.display = "flex"
  resetStopwatch()
}

function showCountdown() {
  currentMode = "countdown"
  document.getElementById("selection").style.display = "none"
  document.getElementById("countdown").style.display = "block"
  document.getElementById("countdownSetup").style.display = "grid"
  document.getElementById("countdownButtons").style.display = "none"
  resetCountdown()
}

function goBack() {
  if (currentMode === "stopwatch" || currentMode === "countdown") {
    currentMode = "selection"
    document.getElementById("selection").style.display = "flex"
    document.getElementById("stopwatch").style.display = "none"
    document.getElementById("countdown").style.display = "none"
    document.getElementById("stopwatchButtons").style.display = "none"
    document.getElementById("countdownButtons").style.display = "none"
    document.getElementById("countdownSetup").style.display = "none"
    resetStopwatch()
    resetCountdown()
  }
}

function startStop() {
  if (isRunning) {
    pauseStopwatch()
  } else {
    startStopwatch()
  }
}

function clearStopwatch() {
    clearInterval(stopwatchInterval)
    resetStopwatch()
}

function startStopCountdown() {
  if (isCountdownRunning) {
    pauseCountdown()
  } else {
    startCountdown()
  }
}

function clearCountdown() {
  clearInterval(countdownInterval)
  resetCountdown()
  document.getElementById("countdownSetup").style.display = "grid"
  document.getElementById("countdownButtons").style.display = "none"
}

function addDigit(digit) {
  let currentTime = document.getElementById("countdown").textContent.replace(/[:.]/g, "")
  currentTime = currentTime.slice(1) + digit // Mover dígitos a la izquierda y añadir el nuevo dígito

  // Formatear el tiempo para la visualización
  const formatted = currentTime.padStart(9, "0")
  const display = `${formatted.slice(0, 2)}:${formatted.slice(2, 4)}:${formatted.slice(4, 6)}.${formatted.slice(6)}`

  document.getElementById("countdown").textContent = display
}

function setCountdown() {
  const timeString = document.getElementById("countdown").textContent
  const [hours, minutes, seconds] = timeString.split(":")
  const [secs, millisecs] = seconds.split(".")

  countdownTime =
    (Number.parseInt(hours) * 3600 + Number.parseInt(minutes) * 60 + Number.parseInt(secs)) * 1000 +
    Number.parseInt(millisecs)

  if (countdownTime > 0) {
    document.getElementById("countdownSetup").style.display = "none"
    document.getElementById("countdownButtons").style.display = "flex"
  }
}

// Tests unitarios y de integración
function runTests() {
  console.log("Ejecutando tests...")

  // Test unitario: formatTime
  console.assert(formatTime(3661000) === "01:01:01.000", "Test formatTime failed")

  // Test unitario: startStopwatch
  startStopwatch()
  console.assert(isRunning === true, "Test startStopwatch failed")

  // Test unitario: pauseStopwatch
  pauseStopwatch()
  console.assert(isRunning === false, "Test pauseStopwatch failed")

  // Test unitario: resetStopwatch
  resetStopwatch()
  console.assert(stopwatchTime === 0, "Test resetStopwatch failed")

  // Test unitario: setCountdownTime
  setCountdownTime(60000)
  console.assert(countdownTime === 60000, "Test setCountdownTime failed")

  // Test de integración: cronómetro
  resetStopwatch()
  startStopwatch()
  setTimeout(() => {
    pauseStopwatch()
    console.assert(stopwatchTime > 0, "Test de integración del cronómetro failed")
    resetStopwatch()
  }, 100)

  // Test de integración: cuenta regresiva
  setCountdownTime(1000)
  startCountdown()
  setTimeout(() => {
    pauseCountdown()
    console.assert(countdownTime < 1000, "Test de integración de la cuenta regresiva failed")
    resetCountdown()
  }, 100)

  console.log("Tests completados.")
}

// Ejecutar tests
runTests()

// Instrucciones para ejecutar los tests:
// 1. Abra la consola del navegador (F12 en la mayoría de los navegadores)
// 2. Los tests se ejecutarán automáticamente al cargar la página
// 3. Verifique los resultados en la consola

