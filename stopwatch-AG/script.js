/**
 * Stopwatch and Countdown Timer Application
 *
 * This script handles the navigation between sections and the stopwatch functionality.
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements - Homepage
  const homepageSection = document.getElementById("homepage")
  const stopwatchFeature = document.getElementById("stopwatch-feature")
  const countdownFeature = document.getElementById("countdown-feature")

  // DOM Elements - Stopwatch
  const stopwatchSection = document.getElementById("stopwatch-section")
  const stopwatchDisplay = document.getElementById("stopwatch-display")
  const stopwatchStartBtn = document.getElementById("stopwatch-start-btn")
  const stopwatchClearBtn = document.getElementById("stopwatch-clear-btn")
  const stopwatchBackBtn = document.getElementById("stopwatch-back-btn")

  // DOM Elements - Countdown Setup
  const countdownSetupSection = document.getElementById(
    "countdown-setup-section"
  )
  const countdownSetupDisplay = document.getElementById(
    "countdown-setup-display"
  )
  const numberButtons = document.querySelectorAll(".number-btn")
  const countdownSetBtn = document.getElementById("countdown-set-btn")
  const countdownSetupClearBtn = document.getElementById(
    "countdown-setup-clear-btn"
  )
  const countdownSetupBackBtn = document.getElementById(
    "countdown-setup-back-btn"
  )

  // DOM Elements - Countdown
  const countdownSection = document.getElementById("countdown-section")
  const countdownDisplay = document.getElementById("countdown-display")
  const countdownStartBtn = document.getElementById("countdown-start-btn")
  const countdownClearBtn = document.getElementById("countdown-clear-btn")
  const countdownBackBtn = document.getElementById("countdown-back-btn")

  // All sections for transitions
  const allSections = [
    homepageSection,
    stopwatchSection,
    countdownSetupSection,
    countdownSection,
  ]

  // Stopwatch state variables
  let stopwatchInterval = null
  let stopwatchStartTime = 0
  let stopwatchElapsedTime = 0
  let isStopwatchRunning = false

  // Countdown state variables
  let countdownInterval = null
  let countdownTime = 0
  let countdownEndTime = 0
  let isCountdownRunning = false

  // Default time display
  const DEFAULT_TIME_DISPLAY = "00:00:00.000"

  /**
   * Shows a section with a right-to-left transition effect
   * @param {HTMLElement} section - The section to show
   */
  const showSection = (section) => {
    // First, position all sections
    allSections.forEach((s) => {
      // Reset any existing transitions
      s.style.transition = "none"
      s.style.transform = "translateX(0)"

      if (s !== section) {
        // Hide sections that aren't the target
        s.classList.add("hidden")
      }
    })

    // Force reflow to ensure the transition works
    void section.offsetWidth

    // Position the target section off-screen to the right
    section.classList.remove("hidden")
    section.style.transform = "translateX(100%)"

    // Force reflow again
    void section.offsetWidth

    // Add transition and slide in from right
    section.style.transition = "transform 0.5s ease-in-out"
    section.style.transform = "translateX(0)"
  }

  /**
   * Formats time in milliseconds to HH:MM:SS.mmm format
   * @param {number} timeInMs - Time in milliseconds
   * @returns {string} Formatted time string
   */
  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / 3600000)
      .toString()
      .padStart(2, "0")
    const minutes = Math.floor((timeInMs % 3600000) / 60000)
      .toString()
      .padStart(2, "0")
    const seconds = Math.floor((timeInMs % 60000) / 1000)
      .toString()
      .padStart(2, "0")
    const milliseconds = Math.floor(timeInMs % 1000)
      .toString()
      .padStart(3, "0")

    return `${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  /**
   * Stopwatch Functions
   */

  /**
   * Starts or pauses the stopwatch
   */
  const toggleStopwatch = () => {
    if (!isStopwatchRunning) {
      // Start the stopwatch
      isStopwatchRunning = true
      stopwatchStartTime = Date.now() - stopwatchElapsedTime
      stopwatchInterval = setInterval(updateStopwatch, 10)

      // Update button text and color
      stopwatchStartBtn.textContent = "Pause"
      stopwatchStartBtn.classList.remove("btn-blue")
      stopwatchStartBtn.classList.add("btn-green")
    } else {
      // Pause the stopwatch
      isStopwatchRunning = false
      clearInterval(stopwatchInterval)

      // Update button text and color
      stopwatchStartBtn.textContent = "Continue"
      stopwatchStartBtn.classList.remove("btn-green")
      stopwatchStartBtn.classList.add("btn-blue")
    }
  }

  /**
   * Updates the stopwatch display
   */
  const updateStopwatch = () => {
    const currentTime = Date.now()
    stopwatchElapsedTime = currentTime - stopwatchStartTime
    stopwatchDisplay.textContent = formatTime(stopwatchElapsedTime)
  }

  /**
   * Clears the stopwatch
   */
  const clearStopwatch = () => {
    // Stop the stopwatch if it's running
    if (isStopwatchRunning) {
      clearInterval(stopwatchInterval)
      isStopwatchRunning = false
    }

    // Reset time and display
    stopwatchElapsedTime = 0
    stopwatchDisplay.textContent = DEFAULT_TIME_DISPLAY

    // Reset button text and color
    stopwatchStartBtn.textContent = "Start"
    stopwatchStartBtn.classList.remove("btn-blue")
    stopwatchStartBtn.classList.add("btn-green")
  }

  /**
   * Countdown Setup Functions
   */

  /**
   * Handles number button clicks for countdown setup
   * @param {string} value - The number value to add
   */
  const handleNumberInput = (value) => {
    // Get current display value without colons and period
    const currentDisplay = countdownSetupDisplay.textContent
    const currentTime = currentDisplay.replace(/[:\.]/g, "")

    // Shift digits to the left and add new digit
    let newTime = currentTime.substring(1) + value

    // Format the new time string
    const hours = newTime.substring(0, 2)
    const minutes = newTime.substring(2, 4)
    const seconds = newTime.substring(4, 6)
    const milliseconds = newTime.substring(6, 9)

    countdownSetupDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  /**
   * Clears the countdown setup display
   */
  const clearCountdownSetup = () => {
    countdownSetupDisplay.textContent = DEFAULT_TIME_DISPLAY
  }

  /**
   * Sets the countdown time and navigates to countdown section
   */
  const setCountdownTime = () => {
    const timeString = countdownSetupDisplay.textContent
    const [hoursMinSec, ms] = timeString.split(".")
    const [hours, minutes, seconds] = hoursMinSec.split(":")

    // Calculate total milliseconds
    countdownTime =
      parseInt(hours) * 3600000 +
      parseInt(minutes) * 60000 +
      parseInt(seconds) * 1000 +
      parseInt(ms)

    // Update countdown display
    countdownDisplay.textContent = formatTime(countdownTime)

    // Navigate to countdown section
    showSection(countdownSection)
  }

  /**
   * Countdown Functions
   */

  /**
   * Starts or pauses the countdown
   */
  const toggleCountdown = () => {
    if (!isCountdownRunning) {
      // Only start if there's time to count down
      if (countdownTime <= 0) return

      // Start the countdown
      isCountdownRunning = true
      countdownEndTime = Date.now() + countdownTime
      countdownInterval = setInterval(updateCountdown, 10)

      // Update button text and color
      countdownStartBtn.textContent = "Pause"
      countdownStartBtn.classList.remove("btn-blue")
      countdownStartBtn.classList.add("btn-green")
    } else {
      // Pause the countdown
      isCountdownRunning = false
      clearInterval(countdownInterval)

      // Calculate remaining time
      countdownTime = countdownEndTime - Date.now()

      // Update button text and color
      countdownStartBtn.textContent = "Continue"
      countdownStartBtn.classList.remove("btn-green")
      countdownStartBtn.classList.add("btn-blue")
    }
  }

  /**
   * Updates the countdown display
   */
  const updateCountdown = () => {
    const currentTime = Date.now()
    const remainingTime = countdownEndTime - currentTime

    if (remainingTime <= 0) {
      // Countdown finished
      clearInterval(countdownInterval)
      countdownDisplay.textContent = DEFAULT_TIME_DISPLAY
      countdownTime = 0
      isCountdownRunning = false

      // Reset button text and color
      countdownStartBtn.textContent = "Start"
      countdownStartBtn.classList.remove("btn-blue")
      countdownStartBtn.classList.add("btn-green")

      return
    }

    countdownDisplay.textContent = formatTime(remainingTime)
  }

  /**
   * Clears the countdown
   */
  const clearCountdown = () => {
    // Stop the countdown if it's running
    if (isCountdownRunning) {
      clearInterval(countdownInterval)
      isCountdownRunning = false
    }

    // Reset time and display
    countdownTime = 0
    countdownDisplay.textContent = DEFAULT_TIME_DISPLAY

    // Reset button text and color
    countdownStartBtn.textContent = "Start"
    countdownStartBtn.classList.remove("btn-blue")
    countdownStartBtn.classList.add("btn-green")
  }

  /**
   * Event Listeners for Navigation
   */

  // Navigate to Stopwatch
  stopwatchFeature.addEventListener("click", () => {
    showSection(stopwatchSection)
  })

  // Navigate to Countdown Setup
  countdownFeature.addEventListener("click", () => {
    countdownSetupDisplay.textContent = DEFAULT_TIME_DISPLAY
    showSection(countdownSetupSection)
  })

  // Back buttons
  stopwatchBackBtn.addEventListener("click", () => {
    showSection(homepageSection)
  })

  countdownSetupBackBtn.addEventListener("click", () => {
    showSection(homepageSection)
  })

  countdownBackBtn.addEventListener("click", () => {
    showSection(homepageSection)
  })

  /**
   * Event Listeners for Stopwatch
   */
  stopwatchStartBtn.addEventListener("click", toggleStopwatch)
  stopwatchClearBtn.addEventListener("click", clearStopwatch)

  /**
   * Event Listeners for Countdown Setup
   */
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleNumberInput(button.dataset.value)
    })
  })

  countdownSetupClearBtn.addEventListener("click", clearCountdownSetup)
  countdownSetBtn.addEventListener("click", setCountdownTime)

  /**
   * Event Listeners for Countdown
   */
  countdownStartBtn.addEventListener("click", toggleCountdown)
  countdownClearBtn.addEventListener("click", clearCountdown)

  // Initialize the application
  showSection(homepageSection)
})
