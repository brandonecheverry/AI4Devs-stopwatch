document.addEventListener('DOMContentLoaded', function() {
    // Referencias a las pantallas
    const screenMain = document.getElementById('screen-main');
    const screenTimer = document.getElementById('screen-timer');
    const screenCountdown = document.getElementById('screen-countdown');

    // Referencias a los botones de navegación de la pantalla principal
    const btnTimer = document.getElementById('btn-timer');
    const btnCountdown = document.getElementById('btn-countdown');

    // Botones Back de cada pantalla
    const timerBack = document.getElementById('timer-back');
    const countdownBack = document.getElementById('countdown-back');

    /**
     * Función para realizar la transición entre pantallas.
     * @param {HTMLElement} fromScreen - Pantalla que se oculta.
     * @param {HTMLElement} toScreen - Pantalla que se mostrará.
     * @param {string} direction - Dirección de salida de la pantalla actual ('left' o 'right').
     */
    function showScreen(fromScreen, toScreen, direction) {
        // Según la dirección, movemos la pantalla saliente:
        if (direction === 'left') {
            // Ejemplo: de Main a Cronómetro. Main se desliza hacia la izquierda.
            fromScreen.style.transform = 'translateX(100%)';
        } else if (direction === 'right') {
            // Ejemplo: de Main a Cuenta Atrás. Main se desliza hacia la derecha.
            fromScreen.style.transform = 'translateX(-100%)';
        }

        // La pantalla entrante se coloca en el centro.
        toScreen.style.transform = 'translateX(0%)';

        // Actualizamos las clases 'active' para llevar el control de la pantalla visible.
        fromScreen.classList.remove('active');
        toScreen.classList.add('active');
    }

    // Evento: Al hacer clic en el botón de Cronómetro (btn-timer)
    btnTimer.addEventListener('click', function() {
        // Desde Main a Cronómetro: Main se desliza a la izquierda y Timer entra desde la derecha.
        showScreen(screenMain, screenTimer, 'left');
    });

    // Evento: Al hacer clic en el botón de Cuenta Atrás (btn-countdown)
    btnCountdown.addEventListener('click', function() {
        // Desde Main a Cuenta Atrás: Main se desliza a la derecha y Countdown entra desde la izquierda.
        showScreen(screenMain, screenCountdown, 'right');
    });

    // Botón Back en la pantalla de Cronómetro: regresa a Main
    timerBack.addEventListener('click', function() {
        // Cronómetro se desliza a la derecha para salir y Main se restablece en el centro.
        screenTimer.style.transform = 'translateX(-100%)';
        screenMain.style.transform = 'translateX(0%)';
        screenTimer.classList.remove('active');
        screenMain.classList.add('active');
    });

    // Botón Back en la pantalla de Cuenta Atrás: regresa a Main
    countdownBack.addEventListener('click', function() {
        // Cuenta Atrás se desliza a la izquierda para salir y Main se restablece en el centro.
        screenCountdown.style.transform = 'translateX(100%)';
        screenMain.style.transform = 'translateX(0%)';
        screenCountdown.classList.remove('active');
        screenMain.classList.add('active');
    });
});
