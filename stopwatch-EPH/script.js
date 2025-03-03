// DOM Elements - Tabs
const stopwatchTab = document.getElementById("stopwatch-tab")
const countdownTab = document.getElementById("countdown-tab")
const stopwatchSection = document.getElementById("stopwatch-section")
const countdownSection = document.getElementById("countdown-section")

// DOM Elements - Stopwatch
const stopwatchDisplay = document.getElementById("stopwatch-display")
const stopwatchStartBtn = document.getElementById("stopwatch-start")
const stopwatchStopBtn = document.getElementById("stopwatch-stop")
const stopwatchResetBtn = document.getElementById("stopwatch-reset")
const stopwatchLapBtn = document.getElementById("stopwatch-lap")
const lapsContainer = document.getElementById("laps-container")
const lapsList = document.getElementById("laps-list")

// DOM Elements - Countdown
const countdownInputSection = document.getElementById("countdown-input-section")
const countdownDisplaySection = document.getElementById("countdown-display-section")
const countdownDisplay = document.getElementById("countdown-display")
const hoursInput = document.getElementById("hours-input")
const minutesInput = document.getElementById("minutes-input")
const secondsInput = document.getElementById("seconds-input")
const countdownStartBtn = document.getElementById("countdown-start")
const countdownStopBtn = document.getElementById("countdown-stop")
const countdownResetBtn = document.getElementById("countdown-reset")

// Global variables for Stopwatch
let stopwatchInterval
let stopwatchRunning = false
let stopwatchTime = 0 // Time in milliseconds
let laps = []

// Global variables for Countdown
let countdownInterval
let countdownRunning = false
let countdownTime = 0 // Time in seconds
let countdownEndTime = 0

// ==================== TAB FUNCTIONALITY ====================
/**
 * Switch between stopwatch and countdown tabs
 */
function setupTabs() {
  stopwatchTab.addEventListener("click", () => {
    stopwatchTab.classList.add("tab-active")
    countdownTab.classList.remove("tab-active")
    stopwatchSection.classList.remove("hidden")
    countdownSection.classList.add("hidden")
  })

  countdownTab.addEventListener("click", () => {
    countdownTab.classList.add("tab-active")
    stopwatchTab.classList.remove("tab-active")
    countdownSection.classList.remove("hidden")
    stopwatchSection.classList.add("hidden")
  })
}

// ==================== STOPWATCH FUNCTIONALITY ====================
/**
 * Format time in milliseconds to HH:MM:SS.CC format
 * @param {number} timeInMs - Time in milliseconds
 * @returns {string} Formatted time string
 */
function formatStopwatchTime(timeInMs) {
  const hours = Math.floor(timeInMs / 3600000)
  const minutes = Math.floor((timeInMs % 3600000) / 60000)
  const seconds = Math.floor((timeInMs % 60000) / 1000)
  const centiseconds = Math.floor((timeInMs % 1000) / 10)

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
}

/**
 * Start the stopwatch
 */
function startStopwatch() {
  if (stopwatchRunning) return

  stopwatchRunning = true
  const startTime = Date.now() - stopwatchTime

  stopwatchInterval = setInterval(() => {
    stopwatchTime = Date.now() - startTime
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime)
  }, 10) // Update every 10ms for smooth centiseconds

  // Toggle button visibility
  stopwatchStartBtn.classList.add("hidden")
  stopwatchStopBtn.classList.remove("hidden")
}

/**
 * Stop the stopwatch
 */
function stopStopwatch() {
  if (!stopwatchRunning) return

  clearInterval(stopwatchInterval)
  stopwatchRunning = false

  // Toggle button visibility
  stopwatchStopBtn.classList.add("hidden")
  stopwatchStartBtn.classList.remove("hidden")
}

/**
 * Reset the stopwatch
 */
function resetStopwatch() {
  stopStopwatch()
  stopwatchTime = 0
  stopwatchDisplay.textContent = formatStopwatchTime(0)

  // Clear laps
  laps = []
  lapsList.innerHTML = ""
  lapsContainer.classList.add("hidden")
}

/**
 * Record a lap time
 */
function recordLap() {
  if (!stopwatchRunning) return

  laps.push(stopwatchTime)

  // Show laps container if it's hidden
  if (lapsContainer.classList.contains("hidden")) {
    lapsContainer.classList.remove("hidden")
  }

  // Create lap element
  const lapNumber = laps.length
  const lapTime = formatStopwatchTime(stopwatchTime)

  // Calculate lap difference if not the first lap
  let lapDiff = ""
  if (lapNumber > 1) {
    const diff = stopwatchTime - laps[lapNumber - 2]
    lapDiff = ` (+${formatStopwatchTime(diff)})`
  }

  const lapElement = document.createElement("div")
  lapElement.className = "flex justify-between items-center bg-gray-100 p-2 rounded"
  lapElement.innerHTML = `
    <span class="font-semibold">Lap ${lapNumber}</span>
    <span class="timer-font">${lapTime}${lapDiff}</span>
  `

  lapsList.prepend(lapElement) // Add newest lap at the top
}

/**
 * Setup all stopwatch event listeners
 */
function setupStopwatch() {
  stopwatchStartBtn.addEventListener("click", startStopwatch)
  stopwatchStopBtn.addEventListener("click", stopStopwatch)
  stopwatchResetBtn.addEventListener("click", resetStopwatch)
  stopwatchLapBtn.addEventListener("click", recordLap)
}

// ==================== COUNTDOWN FUNCTIONALITY ====================
/**
 * Format time in seconds to HH:MM:SS format
 * @param {number} timeInSeconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatCountdownTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = timeInSeconds % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

/**
 * Get total seconds from input fields
 * @returns {number} Total seconds
 */
function getInputTime() {
  const hours = Number.parseInt(hoursInput.value) || 0
  const minutes = Number.parseInt(minutesInput.value) || 0
  const seconds = Number.parseInt(secondsInput.value) || 0

  return hours * 3600 + minutes * 60 + seconds
}

/**
 * Update input fields from seconds
 * @param {number} totalSeconds - Total seconds to set
 */
function setInputTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  hoursInput.value = hours
  minutesInput.value = minutes
  secondsInput.value = seconds
}

/**
 * Start the countdown
 */
function startCountdown() {
  // Get time from inputs
  countdownTime = getInputTime()

  // Don't start if time is 0
  if (countdownTime <= 0) return

  countdownRunning = true
  countdownEndTime = Date.now() + countdownTime * 1000

  // Switch to display view
  countdownInputSection.classList.add("hidden")
  countdownDisplaySection.classList.remove("hidden")

  // Update display
  countdownDisplay.textContent = formatCountdownTime(countdownTime)

  // Start interval
  countdownInterval = setInterval(() => {
    const remaining = Math.ceil((countdownEndTime - Date.now()) / 1000)

    if (remaining <= 0) {
      // Time's up!
      clearInterval(countdownInterval)
      countdownTime = 0
      countdownDisplay.textContent = formatCountdownTime(0)
      countdownRunning = false

      // Play alert sound and flash the display
      alertTimeUp()

      // Reset UI
      countdownStopBtn.classList.add("hidden")
      countdownStartBtn.classList.remove("hidden")
      return
    }

    countdownTime = remaining
    countdownDisplay.textContent = formatCountdownTime(countdownTime)
  }, 100) // Update frequently for accuracy

  // Toggle button visibility
  countdownStartBtn.classList.add("hidden")
  countdownStopBtn.classList.remove("hidden")
}

/**
 * Stop the countdown
 */
function stopCountdown() {
  if (!countdownRunning) return

  clearInterval(countdownInterval)
  countdownRunning = false

  // Toggle button visibility
  countdownStopBtn.classList.add("hidden")
  countdownStartBtn.classList.remove("hidden")
}

/**
 * Reset the countdown
 */
function resetCountdown() {
  stopCountdown()
  countdownTime = 0

  // Reset inputs
  hoursInput.value = 0
  minutesInput.value = 0
  secondsInput.value = 0

  // Switch back to input view
  countdownDisplaySection.classList.add("hidden")
  countdownInputSection.classList.remove("hidden")
}

/**
 * Alert when countdown reaches zero
 */
function alertTimeUp() {
  // Flash the display
  let flashCount = 0
  const flashInterval = setInterval(() => {
    if (flashCount >= 10) {
      clearInterval(flashInterval)
      countdownDisplay.style.color = ""
      return
    }

    countdownDisplay.style.color = flashCount % 2 === 0 ? "#ef4444" : "#ffffff"
    flashCount++
  }, 300)

  // Play sound (if browser supports it)
  try {
    const audio = new Audio(
      "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=",
    )
    audio.play()
  } catch (e) {
    console.log("Sound not supported")
  }
}

/**
 * Setup all countdown event listeners
 */
function setupCountdown() {
  countdownStartBtn.addEventListener("click", startCountdown)
  countdownStopBtn.addEventListener("click", stopCountdown)
  countdownResetBtn.addEventListener("click", resetCountdown)

  // Input validation
  hoursInput.addEventListener("input", () => {
    if (hoursInput.value < 0) hoursInput.value = 0
    if (hoursInput.value > 99) hoursInput.value = 99
  })

  minutesInput.addEventListener("input", () => {
    if (minutesInput.value < 0) minutesInput.value = 0
    if (minutesInput.value > 59) minutesInput.value = 59
  })

  secondsInput.addEventListener("input", () => {
    if (secondsInput.value < 0) secondsInput.value = 0
    if (secondsInput.value > 59) secondsInput.value = 59
  })
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupTabs()
  setupStopwatch()
  setupCountdown()
})
