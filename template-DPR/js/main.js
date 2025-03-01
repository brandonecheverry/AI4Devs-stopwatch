// main.js: Funciones de navegación e inicialización
document.addEventListener('DOMContentLoaded', function() {
    const screenMain = document.getElementById('screen-main');
    const screenTimer = document.getElementById('screen-timer');
    const screenCountdown = document.getElementById('screen-countdown');
    const btnTimer = document.getElementById('btn-timer');
    const btnCountdown = document.getElementById('btn-countdown');

    window.showScreen = function(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    };

    btnTimer.addEventListener('click', function() {
        showScreen(screenTimer);
    });

    btnCountdown.addEventListener('click', function() {
        showScreen(screenCountdown);
    });
});
