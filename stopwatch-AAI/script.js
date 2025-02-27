// Variables para gestionar el estado del temporizador y la cuenta atrás
let timer; // Variable para almacenar el intervalo del temporizador
let running = false; // Estado del temporizador (en marcha o detenido)
let time = 0; // Tiempo acumulado del cronómetro en segundos
let countdownTime = 60; // Tiempo inicial para la cuenta atrás (en segundos)
let countdownInterval; // Variable para almacenar el intervalo de la cuenta atrás

// Referencias a los elementos del DOM que se usan en la interfaz
const timerDisplay = document.getElementById("timer"); // Elemento que muestra el tiempo en el HTML
const startStopButton = document.getElementById("startStop"); // Botón de inicio/detención del cronómetro
const countdownButton = document.getElementById("countdown"); // Botón de inicio de la cuenta atrás
const resetButton = document.getElementById("reset"); // Botón para reiniciar el cronómetro
const countdownInput = document.getElementById("countdownTime"); // Campo de entrada para definir los segundos de la cuenta atrás

// Sonidos para las diferentes acciones del temporizador
const startSound = new Audio("start.mp3"); // Sonido cuando se inicia el cronómetro o la cuenta atrás
const endSound = new Audio("end.mp3"); // Sonido cuando la cuenta atrás termina
const beepSound = new Audio("beep.mp3"); // Sonido de "beep" que se reproduce durante los últimos 5 segundos de la cuenta atrás

// Función que formatea el tiempo de segundos a formato HH:MM:SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0"); // Calcula las horas y las formatea
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0"); // Calcula los minutos y los formatea
    const secs = (seconds % 60).toString().padStart(2, "0"); // Calcula los segundos y los formatea
    return `${hrs}:${mins}:${secs}`; // Retorna el tiempo formateado como un string
}

// Función para iniciar o detener el cronómetro
function startStopwatch() {
    if (running) {
        clearInterval(timer); // Detiene el temporizador si ya está en marcha
        running = false; // Cambia el estado a detenido
    } else {
        startSound.play(); // Reproduce el sonido al iniciar el cronómetro
        // Inicia el temporizador con un intervalo de 1 segundo
        timer = setInterval(() => {
            time++; // Incrementa el tiempo cada segundo
            timerDisplay.textContent = formatTime(time); // Actualiza el display con el tiempo formateado
        }, 1000);
        running = true; // Cambia el estado a en marcha
    }
}

// Función para iniciar la cuenta atrás
function startCountdown() {
    clearInterval(countdownInterval); // Detiene cualquier cuenta atrás previa
    countdownTime = parseInt(countdownInput.value) || 60; // Obtiene el tiempo de cuenta atrás del input o usa 60 segundos por defecto
    timerDisplay.textContent = formatTime(countdownTime); // Muestra el tiempo inicial en el display
    
    startSound.play(); // Reproduce el sonido al iniciar la cuenta atrás
    // Inicia la cuenta atrás con un intervalo de 1 segundo
    countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--; // Decrementa el tiempo de la cuenta atrás
            timerDisplay.textContent = formatTime(countdownTime); // Actualiza el display con el tiempo restante
        } else {
            clearInterval(countdownInterval); // Detiene la cuenta atrás cuando llega a cero
            endSound.play(); // Reproduce el sonido cuando la cuenta atrás termina
            // Reproduce el sonido de "beep" cada segundo durante los últimos 5 segundos
            let beepInterval = setInterval(() => beepSound.play(), 1000);
            setTimeout(() => clearInterval(beepInterval), 5000); // Detiene el sonido de "beep" después de 5 segundos
        }
    }, 1000);
}

// Función para reiniciar el temporizador y la cuenta atrás
function resetTimer() {
    clearInterval(timer); // Detiene el cronómetro
    clearInterval(countdownInterval); // Detiene la cuenta atrás
    running = false; // Cambia el estado a detenido
    time = 0; // Reinicia el tiempo acumulado
    timerDisplay.textContent = "00:00:00"; // Restablece el display al valor inicial
}

// Añade los controladores de eventos para los botones
startStopButton.addEventListener("click", startStopwatch); // Al hacer clic en el botón "Iniciar/Detener", se ejecuta la función startStopwatch
countdownButton.addEventListener("click", startCountdown); // Al hacer clic en el botón "Cuenta Atrás", se ejecuta la función startCountdown
resetButton.addEventListener("click", resetTimer); // Al hacer clic en el botón "Reiniciar", se ejecuta la función resetTimer
