class Stopwatch {
  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.interval = null;
    this.mode = "stopwatch"; // 'stopwatch' o 'timer'
    this.isRunning = false;
    this.timerEndSound = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRA0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHgU2jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUuhM/z1YU2Bhxqvu7mnEYODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFYr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaRQ0PVqzl77BeGQc9ltvyxnUoBSh+zPDaizsIGGS56+mjTxELTKXh8bllHgU1jdT0z3wvBSJ1xe/glEILElyx6OyrWRUIRJve8sFuJAUug8/y1oU2Bhxqvu3mnEYODlOq5O+zYRsGPJPY88p3KgUme8rx3I4+CRVht+rqpVMSC0mh4PK8aiAFM4nU8tGAMQYfccPu45ZFDBFYr+ftrVwWCECY3PLEcSYGK4DN8tiIOQgZZ7zs56BODwxPpuPxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG/A7eSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnHgU1jdTy0HwvBSF1xe/glEQKElyx6OyrWRUJQ5vd88FwJAQug8/y1oU3Bhxqvu3mnEcND1Oq5O+zYRsGOpPX88p3KgUmfMrx3I4+CRVht+rqpVMSC0mh4PK8aiAFM4nU8tGAMQYfccLv45dGCxFYr+ftrVwXB0CY3PLEcSYGK4DN8tiIOQgZZ7vs56BODwxPpuPxtmQdBTiP1/PMeywGI3bH8d+RQQkUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG3A7uSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDwIF2S56+mjUREKTKPi8blnHwU1jdTy0H4wBiF1xe/glEQKElyx6OyrWRUJQ5vd88FwJAUtg87y1oY4Bhxqvu3mnEcND1Sp5PC0YRsGOpPX88p3LAUlfMrx3I4/CBVht+rqpVMSC0mh4PK8aiAFM4nU8tGAMQYfccLv45dGDBBYrujtrlwXB0CX2/PEciYGK4DN8tiKOQgZZ7vs56BOEQxPpuPxtmQdBTeP1/PMeywGI3bH8d+RQQsUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzUGHG3A7uSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDwIF2S56+mjUREKTKPi8blnHwU1jdTy0H4wBiF1xe/glEQKElyx6OyrWRUJQ5vd88FwJAUtg87y1oY4Bhxqvu3mnEcND1Sp5PC0YRsGOpPX88p3LAUlfMrx3I4/CBVht+rqpVMSC0mh4PK8aiAFMojU89GAMQYfccLv45dGDBBYrujtrlwXB0A="
    );

    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    // Display elements
    this.hoursDisplay = document.getElementById("hours");
    this.minutesDisplay = document.getElementById("minutes");
    this.secondsDisplay = document.getElementById("seconds");
    this.millisecondsDisplay = document.getElementById("milliseconds");

    // Control buttons
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");

    // Mode buttons
    this.stopwatchModeBtn = document.getElementById("stopwatchMode");
    this.timerModeBtn = document.getElementById("timerMode");

    // Timer inputs
    this.timerInput = document.getElementById("timerInput");
    this.hoursInput = document.getElementById("hoursInput");
    this.minutesInput = document.getElementById("minutesInput");
    this.secondsInput = document.getElementById("secondsInput");
  }

  setupEventListeners() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());

    this.stopwatchModeBtn.addEventListener("click", () =>
      this.setMode("stopwatch")
    );
    this.timerModeBtn.addEventListener("click", () => this.setMode("timer"));

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.isRunning ? this.pause() : this.start();
      }
      if (e.code === "KeyR") {
        e.preventDefault();
        this.reset();
      }
    });
  }

  setMode(mode) {
    this.mode = mode;
    this.reset();

    if (mode === "stopwatch") {
      this.stopwatchModeBtn.classList.add("active");
      this.timerModeBtn.classList.remove("active");
      this.timerInput.classList.add("hidden");
    } else {
      this.timerModeBtn.classList.add("active");
      this.stopwatchModeBtn.classList.remove("active");
      this.timerInput.classList.remove("hidden");
    }
  }

  start() {
    if (this.isRunning) return;

    if (this.mode === "timer") {
      const hours = parseInt(this.hoursInput.value) || 0;
      const minutes = parseInt(this.minutesInput.value) || 0;
      const seconds = parseInt(this.secondsInput.value) || 0;

      if (hours === 0 && minutes === 0 && seconds === 0) return;

      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.milliseconds = 0;
    }

    this.isRunning = true;
    this.startBtn.disabled = true;

    this.interval = setInterval(() => {
      if (this.mode === "stopwatch") {
        this.updateStopwatch();
      } else {
        this.updateTimer();
      }
    }, 10);
  }

  updateStopwatch() {
    this.milliseconds += 10;

    if (this.milliseconds === 1000) {
      this.milliseconds = 0;
      this.seconds++;

      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;

        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }

    this.updateDisplay();
  }

  updateTimer() {
    if (this.milliseconds === 0) {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          if (this.hours === 0) {
            this.timerEndSound.play();
            this.pause();
            return;
          }
          this.hours--;
          this.minutes = 59;
        } else {
          this.minutes--;
        }
        this.seconds = 59;
      } else {
        this.seconds--;
      }
      this.milliseconds = 990;
    } else {
      this.milliseconds -= 10;
    }

    this.updateDisplay();
  }

  pause() {
    this.isRunning = false;
    this.startBtn.disabled = false;
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;

    // Limpiar los campos de entrada del temporizador
    if (this.mode === "timer") {
      this.hoursInput.value = "";
      this.minutesInput.value = "";
      this.secondsInput.value = "";
    }

    // Habilitar el botón de inicio
    this.startBtn.disabled = false;

    // Actualizar la pantalla
    this.updateDisplay();
  }

  updateDisplay() {
    this.hoursDisplay.textContent = this.padNumber(this.hours);
    this.minutesDisplay.textContent = this.padNumber(this.minutes);
    this.secondsDisplay.textContent = this.padNumber(this.seconds);
    this.millisecondsDisplay.textContent = this.padNumber(
      Math.floor(this.milliseconds / 10)
    );
  }

  padNumber(number) {
    return number.toString().padStart(2, "0");
  }
}

// Inicializar el cronómetro cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  new Stopwatch();
});
