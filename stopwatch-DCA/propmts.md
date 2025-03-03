# Ejercicio Stopwatch

## Chatbot utilizado

DeepSeek (DeepThink R1)

## Prompt

Actuando como un desarrollador experto en FrontEnd, y en base a buenas prácticas de desarrollo, dame una web que al abrir el .html en um navegador muestre una web con un cronómetro o stopwatch con las siguientes características:

** Funcionalidad
[
  - Sigue como ejemplo la imagen adjunta
  - El título de la página debe ser, para el navegador también, 'Timer and Countdown'
  - Debe mostrar un reloj, encerrado en un recuadro con esquinas redondeadas, con el formato HH:MM:SS y más abajo, ajustado a través de CSS a la derecha y con un tamaño significativamente menor que los demás mmm, donde HH es horas, MM es minutos, SS es segundos y mmm es milisegundos
  - Debe tener dos botones, Start y Clear, el primero a la izquierda y en verde, y el segundo a la derecha y en rojo.
  - El botón Start se convertirá, al hacer click en él, por el botón Stop, en azul
  - El botón Stop se convertirá, al hacer click en él, por el botón Start, en verde
  - El botón Clear se deshabilitará mientras se vea el botón Stop
  - El botón Start empezará la cuenta del cronómetro, que irá actualizando los números mostrados en la parte superior
  - El botón Stop parará el cronómetro
  - Añade una animación cada vez que cambien los segundos, en azul, los minutos, en amarillo, y las horas, en rojo, algo simple pero distinto para cada evento, incluso un spinner que se mueva a la derecha, pequeñito, mientras el cronómetro está en funcionamiento
]
** Tecnología
[
  - Utiliza Vanilla JS y sus estándares, en un fichero llamado script.js
  - Utiliza HTML5 y sus estándares de accesibilidad, en un fichero llamado index.html
  - Utiliza CSS3 y prepara la página opara que sea responsive, en un fichero llamado styles.css
]
** Arquitectura
[
  - Debes estructurar el código para que sea mantenible
  - Dale un estilo amigable y sencillo siguiendo estándares de Bootstrap y buenas prácticas de accesibilidad
]
Si tienes alguna pregunta sobre lo requerido indícamelo para resolverlo antes de implementarlo

## Respuesta

**Implementación del Stopwatch**

1. **Estructura HTML (`index.html`):**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer and Countdown</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main class="container">
        <h1 class="sr-only">Stopwatch</h1>
        <div class="stopwatch-card">
            <div class="time-display">
                <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
                <div class="milliseconds" id="milliseconds">000</div>
            </div>
            <div class="controls">
                <button id="startStop" class="btn start">Start</button>
                <button id="clear" class="btn clear" disabled>Clear</button>
            </div>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>
```

2. **Estilos CSS (`styles.css`):**
```css
/* Reset y estilos base */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
}

.container {
    width: 100%;
    padding: 20px;
}

.stopwatch-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 400px;
    margin: 0 auto;
}

.time-display {
    text-align: center;
    font-family: 'Courier New', monospace;
    margin-bottom: 1.5rem;
    position: relative;
}

.time-display span {
    font-size: 3rem;
    color: #333;
}

.milliseconds {
    font-size: 1.2rem !important;
    color: #666 !important;
    position: absolute;
    right: 20px;
    bottom: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: opacity 0.3s;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.start {
    background-color: #4CAF50;
    color: white;
}

.stop {
    background-color: #2196F3;
    color: white;
}

.clear {
    background-color: #f44336;
    color: white;
}

/* Animaciones */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #2196F3;
    animation: spin 1s linear infinite;
    margin-left: 8px;
}

/* Responsive */
@media (max-width: 480px) {
    .time-display span {
        font-size: 2rem;
    }

    .btn {
        padding: 0.6rem 1rem;
    }
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
```

3. **Lógica JavaScript (`script.js`):**
```javascript
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
```

**Características implementadas:**
1. Diseño responsive con sombras y bordes redondeados.
2. Botones con estados interactivos (Start/Stop, Clear deshabilitado durante la ejecución).
3. Animaciones:
   - Parpadeo suave al cambiar segundos/minutos/horas.
   - Spinner giratorio durante el funcionamiento.
4. Formato de tiempo con padding ceros.
5. Estructura modular con clase `Stopwatch`.
6. Accesibilidad:
   - Etiqueta semántica `<main>`.
   - Texto oculto para lectores de pantalla.
   - Contraste de colores adecuado.