/**
 * Base Timer class that implements common timer functionality
 * @class Timer
 */
class Timer {
  constructor() {
    /** @type {boolean} - Indicates if the timer is currently running */
    this.isRunning = false;
    /** @type {number} - Start time in milliseconds */
    this.startTime = 0;
    /** @type {number} - Current time in milliseconds */
    this.currentTime = 0;
    /** @type {number|null} - Interval ID for the timer */
    this.intervalId = null;
  }

  /**
   * Starts the timer if it's not already running
   * @returns {void}
   */
  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.startTime = Date.now() - this.currentTime;
    this.run();
  }

  /**
   * Pauses the timer and cleans up the interval
   * @returns {void}
   */
  pause() {
    this.isRunning = false;
    this.clearInterval();
  }

  /**
   * Resets the timer to initial state
   * @returns {void}
   */
  reset() {
    this.isRunning = false;
    this.currentTime = 0;
    this.clearInterval();
    this.updateDisplay();
  }

  /**
   * Cleans up the interval
   * @private
   */
  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Disposes of timer resources
   * @returns {void}
   */
  dispose() {
    this.clearInterval();
  }

  /**
   * Abstract method to be implemented by child classes
   * @abstract
   */
  run() {
    throw new Error('Method run() must be implemented by child class');
  }

  /**
   * Abstract method to be implemented by child classes
   * @abstract
   */
  updateDisplay() {
    throw new Error('Method updateDisplay() must be implemented by child class');
  }
}

/**
 * Stopwatch implementation that extends Timer
 * @class Stopwatch
 * @extends Timer
 */
class Stopwatch extends Timer {
  constructor() {
    super();
    this.elapsedTime = 0;
  }

  run() {
    this.intervalId = setInterval(() => {
      this.currentTime = Date.now() - this.startTime;
      this.updateDisplay();
    }, 10);
  }

  updateDisplay() {
    const time = this.currentTime;
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, "0");
  }
}

/**
 * Modal Manager for displaying messages
 * @class Modal
 */
class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.messageElement = document.getElementById("modal-message");
    this.closeBtn = document.querySelector(".modal-close");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.closeBtn.addEventListener("click", () => this.hide());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });
  }

  /**
   * Shows the modal with a message
   * @param {string} message - Message to display
   */
  show(message) {
    this.messageElement.textContent = message;
    this.modal.classList.add("show");
    setTimeout(() => this.modal.querySelector(".modal-content").style.transform = "translateY(0)", 10);
  }

  /**
   * Hides the modal
   */
  hide() {
    this.modal.classList.remove("show");
    this.modal.querySelector(".modal-content").style.transform = "translateY(-20px)";
  }
}

/**
 * Countdown implementation that extends Timer
 * @class Countdown
 * @extends Timer
 */
class Countdown extends Timer {
  constructor() {
    super();
    this.targetTime = 0;
    this.modal = new Modal();
  }

  /**
   * Sets the countdown time
   * @param {number} hours - Hours to count down
   * @param {number} minutes - Minutes to count down
   * @param {number} seconds - Seconds to count down
   */
  setTime(hours, minutes, seconds) {
    this.targetTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    this.currentTime = this.targetTime;
    this.updateDisplay();
  }

  run() {
    this.startTime = Date.now() - (this.targetTime - this.currentTime);
    this.intervalId = setInterval(() => {
      this.currentTime = Math.max(0, this.targetTime - (Date.now() - this.startTime));
      this.updateDisplay();

      if (this.currentTime === 0) {
        this.pause();
        this.onComplete();
      }
    }, 10);
  }

  updateDisplay() {
    const time = this.currentTime;
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, "0");
  }

  /**
   * Handles countdown completion
   */
  onComplete() {
    this.modal.show(translationManager.getText("messages.countdownComplete"));
  }
}

/**
 * UI Controller that manages the application interface
 * @class UIController
 */
class UIController {
  constructor() {
    this.stopwatch = new Stopwatch();
    this.countdown = new Countdown();
    this.currentTimer = this.stopwatch;
    this.modal = new Modal();
    this.initializeEventListeners();
    this.updateCountdownTexts();
  }

  initializeEventListeners() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => this.handleTabSwitch(e));
    });

    document.getElementById("startBtn").addEventListener("click", () => this.handleStart());
    document.getElementById("pauseBtn").addEventListener("click", () => this.handlePause());
    document.getElementById("resetBtn").addEventListener("click", () => this.handleReset());
    document.getElementById("clearConfigBtn").addEventListener("click", () => this.handleClearConfig());

    const inputs = ["hoursInput", "minutesInput", "secondsInput"];
    inputs.forEach(id => {
      const input = document.getElementById(id);
      input.addEventListener("change", () => this.handleCountdownInputChange());
      input.addEventListener("focus", (e) => this.showInputHint(e.target));
      input.addEventListener("blur", (e) => this.hideInputHint(e.target));
    });
  }

  updateCountdownTexts() {
    document.querySelector(".countdown-description").textContent = translationManager.getText("inputs.description");

    const hintMap = {
      hoursInput: "inputs.hoursHint",
      minutesInput: "inputs.minutesHint",
      secondsInput: "inputs.secondsHint"
    };

    Object.entries(hintMap).forEach(([inputId, hintKey]) => {
      const input = document.getElementById(inputId);
      const hintSpan = input.parentElement.querySelector(".input-hint");
      hintSpan.textContent = translationManager.getText(hintKey);
    });

    document.getElementById("clearConfigBtn").textContent = translationManager.getText("controls.clearConfig");
  }

  showInputHint(input) {
    const hintSpan = input.parentElement.querySelector(".input-hint");
    hintSpan.style.opacity = "1";
    hintSpan.style.visibility = "visible";
  }

  hideInputHint(input) {
    const hintSpan = input.parentElement.querySelector(".input-hint");
    hintSpan.style.opacity = "0";
    hintSpan.style.visibility = "hidden";
  }

  handleTabSwitch(event) {
    const mode = event.target.dataset.mode;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    this.currentTimer.reset();
    this.currentTimer = mode === "stopwatch" ? this.stopwatch : this.countdown;

    const countdownSettings = document.getElementById("countdownSettings");
    countdownSettings.classList.toggle("hidden", mode === "stopwatch");

    if (mode === "countdown") {
      this.updateCountdownTexts();
    }
  }

  handleStart() {
    if (this.currentTimer === this.countdown) {
      const totalTime = this.getTotalConfiguredTime();
      if (totalTime === 0) {
        this.modal.show(translationManager.getText("messages.noTimeConfigured"));
        return;
      }
    }

    this.currentTimer.start();
    document.getElementById("startBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = false;
  }

  getTotalConfiguredTime() {
    const hours = parseInt(document.getElementById("hoursInput").value) || 0;
    const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  handlePause() {
    this.currentTimer.pause();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
  }

  handleReset() {
    if (this.currentTimer === this.countdown) {
      this.currentTimer.pause();
      const hours = parseInt(document.getElementById("hoursInput").value) || 0;
      const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
      const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
      this.countdown.setTime(hours, minutes, seconds);
    } else {
      this.currentTimer.reset();
    }

    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
  }

  handleCountdownInputChange() {
    if (this.currentTimer === this.countdown) {
      const hours = parseInt(document.getElementById("hoursInput").value) || 0;
      const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
      const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
      this.countdown.setTime(hours, minutes, seconds);
    }
  }

  handleClearConfig() {
    if (this.currentTimer === this.countdown) {
      const inputs = ["hoursInput", "minutesInput", "secondsInput"];
      inputs.forEach(id => {
        const input = document.getElementById(id);
        input.value = "0";
      });

      this.countdown.setTime(0, 0, 0);
      this.currentTimer.reset();

      document.getElementById("startBtn").disabled = false;
      document.getElementById("pauseBtn").disabled = true;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new UIController();
});
