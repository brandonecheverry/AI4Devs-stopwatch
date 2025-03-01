document.addEventListener("DOMContentLoaded", function () {
	let timer;
	let time = 0;
	let running = false;
	let countdownMode = false;

	const displayHours = document.getElementById("display-hours");
	const displayMinutes = document.getElementById("display-minutes");
	const displaySeconds = document.getElementById("display-seconds");
	const displayMilliseconds = document.getElementById("display-milliseconds");

	const startPauseBtn = document.getElementById("startPause");
	const resetStopBtn = document.getElementById("resetStop");
	const modeToggle = document.getElementById("modeToggle");
	const pageTitle = document.getElementById("pageTitle");
	const countdownInput = document.getElementById("countdownTime");
	const errorMessage = document.getElementById("error-message");

	const countdownEndSound = new Audio("countdown-end.mp3");

	function updateDisplay() {
		let hours = Math.floor(time / 3600000);
		let minutes = Math.floor((time % 3600000) / 60000);
		let seconds = Math.floor((time % 60000) / 1000);
		let milliseconds = time % 1000;

		displayHours.textContent = String(hours).padStart(2, "0");
		displayMinutes.textContent = String(minutes).padStart(2, "0");
		displaySeconds.textContent = String(seconds).padStart(2, "0");
		displayMilliseconds.textContent = countdownMode ? "" : `.${String(milliseconds).padStart(3, "0")}`;
	}

	startPauseBtn.addEventListener("click", () => {
		if (running) {
			clearInterval(timer);
			startPauseBtn.textContent = "Continue";
			startPauseBtn.classList.replace("start-btn", "pause-btn");
		} else {
			if (countdownMode && time === 0) {
				let parts = countdownInput.value.split(":").map(num => parseInt(num, 10) || 0);
				time = (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
			}

			timer = setInterval(() => {
				if (countdownMode) {
					if (time > 0) {
						time -= 10;
					} else {
						clearInterval(timer);
						startPauseBtn.textContent = "Start";
						startPauseBtn.classList.replace("pause-btn", "start-btn");
						running = false;
						countdownEndSound.play();

						countdownInput.value = "00:00:00";
						startPauseBtn.disabled = true;
					}
				} else {
					time += 10;
				}
				updateDisplay();
			}, 10);

			startPauseBtn.textContent = "Pause";
			startPauseBtn.classList.replace("pause-btn", "start-btn");
		}
		running = !running;
	});

	resetStopBtn.addEventListener("click", () => {
		if (countdownMode) {
			clearInterval(timer);
			running = false;

			if (time > 0) {
				startPauseBtn.textContent = "Continue";
				startPauseBtn.classList.replace("pause-btn", "start-btn");
			}
		} else {
			clearInterval(timer);
			running = false;
			time = 0;
			updateDisplay();
			startPauseBtn.textContent = "Start";
			startPauseBtn.classList.replace("pause-btn", "start-btn");
		}
	});

	modeToggle.addEventListener("change", () => {
		countdownMode = modeToggle.checked;
		pageTitle.textContent = countdownMode ? "Countdown" : "Stopwatch";
		countdownInput.hidden = !countdownMode;
		countdownInput.value = "00:00:00";
		displayMilliseconds.style.display = countdownMode ? "none" : "inline";

		resetStopBtn.textContent = countdownMode ? "Stop" : "Clear"; 
		startPauseBtn.disabled = countdownMode;
		errorMessage.textContent = ""; // Clear error when switching modes
	});

	countdownInput.addEventListener("input", () => {
		const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // HH:MM:SS validation
		const inputValue = countdownInput.value;

		if (!timePattern.test(inputValue)) {
			startPauseBtn.disabled = true;
			errorMessage.textContent = "Invalid format! Use hh:mm:ss (23:59:59)";
			errorMessage.style.color = "red";
		} else {
			startPauseBtn.disabled = false;
			errorMessage.textContent = ""; // Clear error message
		}
	});
	
	function openReadme() {
		window.open("README.html", "_blank");
	}

	window.openReadme = openReadme;



	updateDisplay();
});
