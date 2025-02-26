class Stopwatch {
  constructor() {
      this.isRunning = false;
      this.startTime = 0;
      this.elapsedTime = 0;
      this.timerInterval = null;
      this.animationInterval = null;

      this.startStopBtn = document.getElementById('startStop');
      this.clearBtn = document.getElementById('clear');
      this.bindEvents();
  }

  bindEvents() {
      this.startStopBtn.addEventListener('click', () => this.toggle());
      this.clearBtn.addEventListener('click', () => this.clear());
  }

  toggle() {
      this.isRunning ? this.stop() : this.start();
  }

  start() {
      if (!this.isRunning) {
          this.startTime = Date.now() - this.elapsedTime;
          this.timerInterval = setInterval(() => this.updateTime(), 10);
          this.animationInterval = setInterval(() => this.addSpinner(), 1000);
          this.isRunning = true;
          this.startStopBtn.textContent = 'Stop';
          this.startStopBtn.classList.replace('start', 'stop');
          this.clearBtn.disabled = true;
      }
  }

  stop() {
      if (this.isRunning) {
          clearInterval(this.timerInterval);
          clearInterval(this.animationInterval);
          this.isRunning = false;
          this.startStopBtn.textContent = 'Start';
          this.startStopBtn.classList.replace('stop', 'start');
          this.clearBtn.disabled = false;
          this.removeSpinner();
      }
  }

  clear() {
      this.elapsedTime = 0;
      this.updateDisplay(0, 0, 0, 0);
  }

  updateTime() {
      this.elapsedTime = Date.now() - this.startTime;
      const milliseconds = Math.floor(this.elapsedTime % 1000);
      const seconds = Math.floor((this.elapsedTime / 1000) % 60);
      const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
      const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);

      this.updateDisplay(hours, minutes, seconds, milliseconds);
      this.triggerAnimations(seconds, minutes, hours);
  }

  updateDisplay(hours, minutes, seconds, milliseconds) {
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(3, '0').slice(0, 2);
  }

  triggerAnimations(seconds, minutes, hours) {
      const timeElements = {
          seconds: document.getElementById('seconds'),
          minutes: document.getElementById('minutes'),
          hours: document.getElementById('hours')
      };

      timeElements.seconds.style.animation = 'pulse 0.5s';
      if (seconds === 0) timeElements.minutes.style.animation = 'pulse 0.5s';
      if (minutes === 0 && seconds === 0) timeElements.hours.style.animation = 'pulse 0.5s';

      setTimeout(() => {
          Object.values(timeElements).forEach(el => el.style.animation = '');
      }, 500);
  }

  addSpinner() {
      if (!document.querySelector('.spinner')) {
          const spinner = document.createElement('div');
          spinner.className = 'spinner';
          this.startStopBtn.appendChild(spinner);
      }
  }

  removeSpinner() {
      const spinner = document.querySelector('.spinner');
      if (spinner) spinner.remove();
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => new Stopwatch());