document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Elementos del cronómetro
    const cronometroDisplay = document.getElementById('cronometro-display');
    const cronometroStartBtn = document.getElementById('cronometro-start');
    const cronometroClearBtn = document.getElementById('cronometro-clear');
    
    // Elementos del temporizador
    const temporizadorDisplay = document.getElementById('temporizador-display');
    const temporizadorStartBtn = document.getElementById('temporizador-start');
    const temporizadorClearBtn = document.getElementById('temporizador-clear');
    const setTimerBtn = document.getElementById('set-timer');
    const horasInput = document.getElementById('horas');
    const minutosInput = document.getElementById('minutos');
    const segundosInput = document.getElementById('segundos');
    
    // Variables para el cronómetro
    let cronometroInterval;
    let cronometroRunning = false;
    let cronometroSeconds = 0;
    let cronometroMilliseconds = 0;
    const cronometroMillisecondsDisplay = document.querySelector('#cronometro .milisegundos');
    
    // Variables para el temporizador
    let temporizadorInterval;
    let temporizadorRunning = false;
    let temporizadorSeconds = 8 * 60; // 8 minutos por defecto
    let temporizadorMilliseconds = 0;
    const temporizadorMillisecondsDisplay = document.querySelector('#temporizador .milisegundos');
    
    // Inicializar inputs del temporizador
    horasInput.value = "00";
    minutosInput.value = "08";
    segundosInput.value = "00";
    
    // Cambio de pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            
            // Activar botón de pestaña
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Mostrar contenido de pestaña
            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
    
    // Formatear tiempo (00:00:00)
    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    
    // Formatear milisegundos (000)
    function formatMilliseconds(ms) {
        return ms.toString().padStart(3, '0');
    }
    
    // CRONÓMETRO
    // Iniciar/Pausar cronómetro
    cronometroStartBtn.addEventListener('click', () => {
        if (!cronometroRunning) {
            // Iniciar
            cronometroRunning = true;
            cronometroStartBtn.textContent = 'Pause';
            
            // Intervalo principal (segundos)
            cronometroInterval = setInterval(() => {
                cronometroSeconds++;
                cronometroDisplay.textContent = formatTime(cronometroSeconds);
            }, 1000);
            
            // Intervalo para milisegundos
            cronometroMillisecondsInterval = setInterval(() => {
                cronometroMilliseconds = (cronometroMilliseconds + 10) % 1000;
                cronometroMillisecondsDisplay.textContent = formatMilliseconds(cronometroMilliseconds);
            }, 10);
        } else {
            // Pausar
            cronometroRunning = false;
            cronometroStartBtn.textContent = 'Start';
            clearInterval(cronometroInterval);
            clearInterval(cronometroMillisecondsInterval);
        }
    });
    
    // Reiniciar cronómetro
    cronometroClearBtn.addEventListener('click', () => {
        // Detener intervalos
        clearInterval(cronometroInterval);
        clearInterval(cronometroMillisecondsInterval);
        
        // Resetear variables
        cronometroRunning = false;
        cronometroSeconds = 0;
        cronometroMilliseconds = 0;
        
        // Actualizar UI
        cronometroStartBtn.textContent = 'Start';
        cronometroDisplay.textContent = formatTime(cronometroSeconds);
        cronometroMillisecondsDisplay.textContent = formatMilliseconds(cronometroMilliseconds);
    });
    
    // TEMPORIZADOR
    // Configurar temporizador
    setTimerBtn.addEventListener('click', () => {
        const horas = parseInt(horasInput.value) || 0;
        const minutos = parseInt(minutosInput.value) || 0;
        const segundos = parseInt(segundosInput.value) || 0;
        
        temporizadorSeconds = horas * 3600 + minutos * 60 + segundos;
        temporizadorDisplay.textContent = formatTime(temporizadorSeconds);
        temporizadorMillisecondsDisplay.textContent = '000';
    });
    
    // Iniciar/Pausar temporizador
    temporizadorStartBtn.addEventListener('click', () => {
        if (!temporizadorRunning && temporizadorSeconds > 0) {
            // Iniciar
            temporizadorRunning = true;
            temporizadorStartBtn.textContent = 'Pause';
            
            // Intervalo principal (segundos)
            temporizadorInterval = setInterval(() => {
                if (temporizadorSeconds > 0) {
                    temporizadorSeconds--;
                    temporizadorDisplay.textContent = formatTime(temporizadorSeconds);
                } else {
                    // Detener cuando llega a cero
                    clearInterval(temporizadorInterval);
                    clearInterval(temporizadorMillisecondsInterval);
                    temporizadorRunning = false;
                    temporizadorStartBtn.textContent = 'Start';
                    alert('¡Tiempo completado!');
                }
            }, 1000);
            
            // Intervalo para milisegundos (cuenta regresiva)
            temporizadorMillisecondsInterval = setInterval(() => {
                if (temporizadorMilliseconds <= 0) {
                    temporizadorMilliseconds = 990;
                } else {
                    temporizadorMilliseconds -= 10;
                }
                temporizadorMillisecondsDisplay.textContent = formatMilliseconds(temporizadorMilliseconds);
            }, 10);
        } else if (temporizadorRunning) {
            // Pausar
            temporizadorRunning = false;
            temporizadorStartBtn.textContent = 'Start';
            clearInterval(temporizadorInterval);
            clearInterval(temporizadorMillisecondsInterval);
        }
    });
    
    // Reiniciar temporizador
    temporizadorClearBtn.addEventListener('click', () => {
        // Detener intervalos
        clearInterval(temporizadorInterval);
        clearInterval(temporizadorMillisecondsInterval);
        
        // Resetear variables
        temporizadorRunning = false;
        
        // Configurar tiempo a los valores de entrada o por defecto
        const horas = parseInt(horasInput.value) || 0;
        const minutos = parseInt(minutosInput.value) || 8;
        const segundos = parseInt(segundosInput.value) || 0;
        
        temporizadorSeconds = horas * 3600 + minutos * 60 + segundos;
        temporizadorMilliseconds = 0;
        
        // Actualizar UI
        temporizadorStartBtn.textContent = 'Start';
        temporizadorDisplay.textContent = formatTime(temporizadorSeconds);
        temporizadorMillisecondsDisplay.textContent = formatMilliseconds(temporizadorMilliseconds);
    });
    
    // Inicializar pantallas
    cronometroDisplay.textContent = formatTime(cronometroSeconds);
    cronometroMillisecondsDisplay.textContent = formatMilliseconds(cronometroMilliseconds);
    temporizadorDisplay.textContent = formatTime(temporizadorSeconds);
    temporizadorMillisecondsDisplay.textContent = formatMilliseconds(temporizadorMilliseconds);
});