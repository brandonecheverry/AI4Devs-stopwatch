
document.addEventListener('DOMContentLoaded', function() {
    // Screen elements
    const homeScreen = document.getElementById('home-screen');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownConfigScreen = document.getElementById('countdown-config-screen');
    const countdownTimerScreen = document.getElementById('countdown-timer-screen');
    
    // Navigation buttons
    const stopwatchOption = document.getElementById('stopwatch-option');
    const countdownOption = document.getElementById('countdown-option');
    const stopwatchBackBtn = document.getElementById('stopwatch-back-btn');
    const countdownConfigBackBtn = document.getElementById('countdown-config-back-btn');
    const countdownBackBtn = document.getElementById('countdown-back-btn');
    const setBtn = document.getElementById('set-btn');
    const reconfigureBtn = document.getElementById('reconfigure-btn');
    
    // Function to show a screen and hide others
    function showScreen(screen) {
        homeScreen.classList.remove('active');
        stopwatchScreen.classList.remove('active');
        countdownConfigScreen.classList.remove('active');
        countdownTimerScreen.classList.remove('active');
        
        screen.classList.add('active');
    }
    
    // Navigation event listeners
    stopwatchOption.addEventListener('click', function() {
        showScreen(stopwatchScreen);
    });
    
    countdownOption.addEventListener('click', function() {
        showScreen(countdownConfigScreen);
    });
    
    stopwatchBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    countdownConfigBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    countdownBackBtn.addEventListener('click', function() {
        showScreen(homeScreen);
    });
    
    setBtn.addEventListener('click', function() {
        showScreen(countdownTimerScreen);
    });
    
    reconfigureBtn.addEventListener('click', function() {
        showScreen(countdownConfigScreen);
    });
});