let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const clearBtn = document.getElementById("clear");

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = ms % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}<span class='milliseconds'>.${String(
    milliseconds
  ).padStart(3, "0")}</span>`;
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.innerHTML = formatTime(elapsedTime);
}

startPauseBtn.addEventListener("click", function () {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
  } else {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
  }
  running = !running;
});

clearBtn.addEventListener("click", function () {
  clearInterval(timer);
  elapsedTime = 0;
  running = false;
  display.innerHTML = "00:00:00<span class='milliseconds'>.000</span>";
  startPauseBtn.textContent = "Start";
});
