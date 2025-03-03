// script.js
let hours = 0, minutes = 0, seconds = 0;
let interval;
let running = false;
let countingDown = true; // Variable para definir si cuenta hacia atrás o adelante

function updateDisplay() {
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    
    // Deshabilitar ajustes en modo cronómetro
    const adjustButtons = document.querySelectorAll(".adjust");
    adjustButtons.forEach(btn => btn.disabled = !countingDown);
    
    // Desactivar el botón iniciar si no hay tiempo en cuenta atrás
    document.getElementById("start").disabled = countingDown && hours === 0 && minutes === 0 && seconds === 0;
}

function changeBackgroundColor() {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
}

function flashScreen() {
    let flashes = 0;
    let flashInterval = setInterval(() => {
        document.body.style.backgroundColor = flashes % 2 === 0 ? "red" : "white";
        flashes++;
        if (flashes === 6) {
            clearInterval(flashInterval);
        }
    }, 500);
}

document.getElementById("hour-plus").addEventListener("click", () => {
    if (hours < 24) hours++;
    updateDisplay();
});

document.getElementById("hour-minus").addEventListener("click", () => {
    if (hours > 0) hours--;
    updateDisplay();
});

document.getElementById("minute-plus").addEventListener("click", () => {
    if (minutes < 59) minutes++;
    updateDisplay();
});

document.getElementById("minute-minus").addEventListener("click", () => {
    if (minutes > 0) minutes--;
    updateDisplay();
});

document.getElementById("second-plus").addEventListener("click", () => {
    if (seconds < 59) seconds++;
    updateDisplay();
});

document.getElementById("second-minus").addEventListener("click", () => {
    if (seconds > 0) seconds--;
    updateDisplay();
});

document.getElementById("start").addEventListener("click", () => {
    if (!running) {
        running = true;
        let elapsedSeconds = 0;
        interval = setInterval(() => {
            elapsedSeconds++;
            if (elapsedSeconds % 30 === 0 && !countingDown) {
                changeBackgroundColor();
            }

            if (countingDown) { // Contador hacia atrás
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    running = false;
                    flashScreen();
                } else {
                    if (seconds > 0) {
                        seconds--;
                    } else {
                        if (minutes > 0) {
                            minutes--;
                            seconds = 59;
                        } else if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
            } else { // Contador hacia adelante
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                        if (hours === 24) {
                            hours = 0;
                        }
                    }
                }
            }
            updateDisplay();
        }, 1000);
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(interval);
    running = false;
});

document.getElementById("clear").addEventListener("click", () => {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    running = false;
    updateDisplay();
});

// Evento para alternar entre contar hacia adelante o atrás
document.getElementById("toggle-count").addEventListener("click", () => {
    countingDown = !countingDown;
    document.getElementById("toggle-count").textContent = countingDown ? "Modo Cuenta Atrás" : "Modo Cronómetro";
    updateDisplay();
});

updateDisplay();