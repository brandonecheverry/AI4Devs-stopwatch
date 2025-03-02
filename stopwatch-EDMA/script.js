/***************************************************
 * 1. Variables y referencias a elementos del DOM
 ***************************************************/

// Secciones
const manual = document.getElementById('manual');
const cronometroSection = document.getElementById('cronometroSection');
const temporizadorSection = document.getElementById('temporizadorSection');

// Botones para alternar secciones
const btnCronometro = document.getElementById('btnCronometro');
const btnTemporizador = document.getElementById('btnTemporizador');

// Cronómetro
const cronometroHoras = document.getElementById('cronometroHoras');
const cronometroMinutos = document.getElementById('cronometroMinutos');
const cronometroSegundos = document.getElementById('cronometroSegundos');
const cronometroMilisegundos = document.getElementById('cronometroMilisegundos');
const btnIniciarPausarCrono = document.getElementById('btnIniciarPausarCrono');
const btnResetCrono = document.getElementById('btnResetCrono');

// Temporizador
const horasInput = document.getElementById('horasInput');
const minutosInput = document.getElementById('minutosInput');
const tempHoras = document.getElementById('tempHoras');
const tempMinutos = document.getElementById('tempMinutos');
const tempSegundos = document.getElementById('tempSegundos');
const btnIniciarTemporizador = document.getElementById('btnIniciarTemporizador');
const btnReiniciarTemporizador = document.getElementById('btnReiniciarTemporizador');

// Control de intervalos
let cronometroInterval = null;
let temporizadorInterval = null;

// Estados
let cronometroCorriendo = false;
let tiempoTranscurrido = 0; // milisegundos
let tiempoRestante = 0;     // segundos
let ultimoFrame = 0;
let temporizadorCorriendo = false;
let tiempoRestanteMs = 0;     // Tiempo restante en milisegundos
let temporizadorLastFrame = 0; // Para calcular el delta entre frames

// Clave para Local Storage
const userConfigKey = 'userConfig';

// Sonidos (URLs de ejemplo, reemplázalos con los que desees de fesliyanstudios.com)
const clickSounds = [
    'https://www.fesliyanstudios.com/play-mp3/387', // Ejemplo
    'https://www.fesliyanstudios.com/play-mp3/388', // Ejemplo
    'https://www.fesliyanstudios.com/play-mp3/389'  // Ejemplo
];

// Sonido de alarma suave
const alarmSoundUrl = 'https://www.fesliyanstudios.com/play-mp3/4383'; // Ejemplo

/***************************************************
 * 2. Funciones de utilidad
 ***************************************************/

/**
 * Reproduce un sonido aleatorio de la lista clickSounds.
 */
function playRandomClickSound() {
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const audio = new Audio(clickSounds[randomIndex]);
    audio.play();
}

/**
 * Reproduce el sonido de alarma al terminar el temporizador.
 */
function playAlarmSound() {
    const audio = new Audio(alarmSoundUrl);
    audio.play();
}

/**
 * Formatea un número a dos dígitos.
 * @param {number} num
 * @returns {string}
 */
function twoDigits(num) {
    return num < 10 ? '0' + num : num;
}

/***************************************************
 * Funciones para el Cronómetro
 ***************************************************/

/**
 * Actualiza la visualización del cronómetro en la pantalla.
 */
function actualizarCronometro() {
    // tiempoTranscurrido está en milisegundos
    const horas = Math.floor(tiempoTranscurrido / 3600000);
    const minutos = Math.floor((tiempoTranscurrido % 3600000) / 60000);
    const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
    const milisegundos = Math.floor((tiempoTranscurrido % 1000) / 10);

    cronometroHoras.textContent = twoDigits(horas);
    cronometroMinutos.textContent = twoDigits(minutos);
    cronometroSegundos.textContent = twoDigits(segundos);
    cronometroMilisegundos.textContent = twoDigits(milisegundos);
}

/**
 * Bucle de animación usando requestAnimationFrame.
 * Calcula el tiempo transcurrido desde el último frame y actualiza el cronómetro.
 */
function bucleCronometro(timestamp) {
    if (!cronometroCorriendo) return;

    // Si es la primera vez, inicializamos ultimoFrame
    if (!ultimoFrame) {
        ultimoFrame = timestamp;
    }

    const delta = timestamp - ultimoFrame; // milisegundos entre frames
    ultimoFrame = timestamp;

    // Acumulamos el tiempo transcurrido
    tiempoTranscurrido += delta;

    // Actualizamos la interfaz
    actualizarCronometro();

    // Solicitamos el siguiente frame
    requestAnimationFrame(bucleCronometro);
}

/**
 * Inicia o pausa el cronómetro.
 */
function iniciarPausarCronometro() {
    playRandomClickSound();

    if (!cronometroCorriendo) {
        // Iniciar
        cronometroCorriendo = true;
        btnIniciarPausarCrono.textContent = 'Pausar';

        // Reiniciamos el último frame para que el delta se calcule correctamente
        ultimoFrame = 0;

        // Lanzamos el bucle de animación
        requestAnimationFrame(bucleCronometro);

    } else {
        // Pausar
        cronometroCorriendo = false;
        btnIniciarPausarCrono.textContent = 'Iniciar';
    }
}

/**
 * Resetea el cronómetro a 0.
 */
function resetearCronometro() {
    playRandomClickSound();

    cronometroCorriendo = false;
    btnIniciarPausarCrono.textContent = 'Iniciar';
    tiempoTranscurrido = 0;
    ultimoFrame = 0; // Reiniciamos
    actualizarCronometro();
}

/***************************************************
 * 4. Lógica para Temporizador
 ***************************************************/

/**
 * Actualiza la visualización del temporizador usando milisegundos.
 * @param {number} ms - Tiempo restante en milisegundos.
 */
function actualizarTemporizador(ms) {
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const milis = Math.floor((ms % 1000) / 10);

    tempHoras.textContent = twoDigits(hrs);
    tempMinutos.textContent = twoDigits(mins);
    tempSegundos.textContent = twoDigits(secs);
    tempMilisegundos.textContent = twoDigits(milis);
}

/**
 * Inicia el temporizador basado en las horas y minutos ingresados.
 */
function iniciarTemporizador() {
    playRandomClickSound();

    const horas = parseInt(horasInput.value) || 0;
    const minutos = parseInt(minutosInput.value) || 0;

    // Validar que no se ingresen valores negativos
    if (horas < 0 || minutos < 0) {
        alert("No se permiten valores negativos en horas o minutos.");
        return;
    }

    // Validar que al menos uno de los valores sea mayor a cero
    if (horas === 0 && minutos === 0) {
        alert("Por favor, ingrese un valor mayor a cero en horas o minutos para iniciar el temporizador.");
        return;
    }

    // Convertir el tiempo ingresado a milisegundos
    tiempoRestanteMs = (horas * 3600 + minutos * 60) * 1000;

    // Reiniciar variables de control
    temporizadorLastFrame = 0;
    temporizadorCorriendo = true;

    requestAnimationFrame(bucleTemporizador);
}

/**
 * Reinicia el temporizador y limpia los campos de entrada.
 */
function reiniciarTemporizador() {
    playRandomClickSound();

    temporizadorCorriendo = false;
    horasInput.value = '';
    minutosInput.value = '';
    tiempoRestanteMs = 0;
    actualizarTemporizador(tiempoRestanteMs);
}

/**
 * Bucle de animación para el temporizador.
 * Resta el tiempo transcurrido y actualiza la interfaz.
 */
function bucleTemporizador(timestamp) {
    if (!temporizadorCorriendo) return;

    if (!temporizadorLastFrame) {
        temporizadorLastFrame = timestamp;
    }

    const delta = timestamp - temporizadorLastFrame; // Tiempo transcurrido desde el último frame
    temporizadorLastFrame = timestamp;

    tiempoRestanteMs -= delta;

    if (tiempoRestanteMs <= 0) {
        tiempoRestanteMs = 0;
        actualizarTemporizador(tiempoRestanteMs);
        playAlarmSound(); // Reproducir alarma al llegar a 0
        temporizadorCorriendo = false;
        return;
    }

    actualizarTemporizador(tiempoRestanteMs);
    requestAnimationFrame(bucleTemporizador);
}

/***************************************************
 * 5. Manejo de la Interfaz y Manual
 ***************************************************/

/**
 * Muestra el manual para el cronómetro.
 */
function mostrarManualCronometro() {
    manual.innerHTML = `
    <h4>Manual de Uso - Cronómetro</h4>
    <p>
      1. Presiona <strong>Iniciar</strong> para comenzar la cuenta.<br>
      2. El botón <strong>Iniciar</strong> cambiará a <strong>Pausar</strong> mientras el cronómetro corre.<br>
      3. Presiona <strong>Pausar</strong> para detener la cuenta temporalmente.<br>
      4. El botón <strong>Resetear</strong> reinicia el cronómetro a 00:00:00.00.<br>
      5. Cada clic emite un sonido suave.
    </p>
  `;
}

/**
 * Muestra el manual para el temporizador.
 */
function mostrarManualTemporizador() {
    manual.innerHTML = `
    <h4>Manual de Uso - Temporizador</h4>
    <p>
      1. Ingresa las <strong>horas</strong> y <strong>minutos</strong> deseados.<br>
      2. Presiona <strong>Iniciar</strong> para comenzar la cuenta regresiva.<br>
      3. El botón <strong>Reiniciar</strong> detiene el temporizador y limpia los campos.<br>
      4. Cuando el tiempo llega a 0, se reproduce un <strong>sonido de alarma suave</strong>.<br>
      5. Cada clic emite un sonido suave.
    </p>
  `;
}

/**
 * Alterna la vista entre Cronómetro y Temporizador.
 * @param {string} seccion - "cronometro" o "temporizador"
 */
function mostrarSeccion(seccion) {
    if (seccion === 'cronometro') {
        cronometroSection.classList.remove('d-none');
        temporizadorSection.classList.add('d-none');
        mostrarManualCronometro();
    } else {
        cronometroSection.classList.add('d-none');
        temporizadorSection.classList.remove('d-none');
        mostrarManualTemporizador();
    }
}

/***************************************************
 * 6. Event Listeners
 ***************************************************/

// Al cargar la página, mostrar primero el cronómetro
window.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('cronometro');
});

// Botones para alternar secciones
btnCronometro.addEventListener('click', () => {
    playRandomClickSound();
    mostrarSeccion('cronometro');
});

btnTemporizador.addEventListener('click', () => {
    playRandomClickSound();
    mostrarSeccion('temporizador');
});

// Cronómetro
btnIniciarPausarCrono.addEventListener('click', iniciarPausarCronometro);
btnResetCrono.addEventListener('click', resetearCronometro);

// Temporizador
btnIniciarTemporizador.addEventListener('click', iniciarTemporizador);
btnReiniciarTemporizador.addEventListener('click', reiniciarTemporizador);


/***************************************************
 * 7. Panel de Configuración
 ***************************************************/

// Variable global para sonidos
let soundsEnabled = true;

// Referencias al botón de configuración y panel
const configBtn = document.getElementById('configBtn');
const configPanel = document.getElementById('configPanel');
const closeConfigBtn = document.getElementById('closeConfigBtn');
const toggleSounds = document.getElementById('toggleSounds');

// Referencias a los radio buttons para template
const designRadios = document.getElementsByName('designTemplate');

/**
 * Abre el panel de configuración.
 */
function abrirConfigPanel() {
    configPanel.classList.add('active');
}

/**
 * Cierra el panel de configuración.
 */
function cerrarConfigPanel() {
    configPanel.classList.remove('active');
}

// Event listeners para abrir y cerrar el panel
configBtn.addEventListener('click', abrirConfigPanel);
closeConfigBtn.addEventListener('click', cerrarConfigPanel);

// Escuchar cambios en el toggle de sonidos
toggleSounds.addEventListener('change', function() {
    soundsEnabled = this.checked;
});

// Modificar la función playRandomClickSound para respetar el toggle de sonidos
function playRandomClickSound() {
    if (!soundsEnabled) return;
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const audio = new Audio(clickSounds[randomIndex]);
    audio.play();
}

// Escuchar cambios en los radio buttons de diseño
designRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        const templateValue = this.value;
        aplicarTemplate(templateValue);

        // Guardar en Local Storage
        const config = loadUserConfig();
        config.selectedTemplate = templateValue;
        saveUserConfig(config);
    });
});

/**
 * Aplica el template seleccionado al body.
 * @param {string} template - El valor del template (default, azul, verde, rojo, oscuro, claro).
 */
function aplicarTemplate(template) {
    // Remover cualquier clase de template previamente aplicada
    document.body.classList.remove('template-azul', 'template-verde', 'template-rojo', 'template-oscuro', 'template-claro');

    // Si el template no es 'default', se agrega la clase correspondiente
    if (template !== 'default') {
        document.body.classList.add('template-' + template);
    }
}

/**************************************************
* 8. Local Storage
***************************************************/

/**
 * Carga la configuración del usuario desde Local Storage.
 * Si no existe, retorna valores por defecto.
 */
function loadUserConfig() {
    const storedConfig = localStorage.getItem(userConfigKey);
    if (storedConfig) {
        return JSON.parse(storedConfig);
    }
    // Valores por defecto
    return {
        soundsEnabled: true,
        selectedTemplate: 'default'
    };
}

/**
 * Guarda la configuración actual del usuario en Local Storage.
 * @param {Object} config
 */
function saveUserConfig(config) {
    localStorage.setItem(userConfigKey, JSON.stringify(config));
}

// Al cargar la página, cargar la configuración guardada
window.addEventListener('DOMContentLoaded', () => {
    const config = loadUserConfig();

    // 1. Aplicar estado de sonidos
    soundsEnabled = config.soundsEnabled;
    toggleSounds.checked = soundsEnabled; // Para que el checkbox refleje el estado

    // 2. Aplicar template
    aplicarTemplate(config.selectedTemplate);

    // 3. Mostrar sección por defecto (por ejemplo, cronómetro)
    mostrarSeccion('cronometro');
});

toggleSounds.addEventListener('change', function() {
    soundsEnabled = this.checked;

    // Cargar configuración actual
    const config = loadUserConfig();
    config.soundsEnabled = soundsEnabled;
    saveUserConfig(config);
});
