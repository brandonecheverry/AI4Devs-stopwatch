const translations = {
    es: {
        title: 'Cronómetro y Cuenta Regresiva',
        tabs: {
            stopwatch: 'Cronómetro',
            countdown: 'Cuenta Regresiva'
        },
        controls: {
            start: 'Iniciar',
            pause: 'Pausar',
            clear: 'Limpiar',
            clearConfig: 'Limpiar Configuración'
        },
        inputs: {
            hours: 'Horas',
            minutes: 'Minutos',
            seconds: 'Segundos',
            description: 'Configura el tiempo para la cuenta regresiva:',
            hoursHint: 'Ingresa las horas (0-99)',
            minutesHint: 'Ingresa los minutos (0-59)',
            secondsHint: 'Ingresa los segundos (0-59)'
        },
        messages: {
            countdownComplete: '¡Cuenta regresiva completada!',
            noTimeConfigured: 'Por favor, configura un tiempo antes de iniciar la cuenta regresiva'
        }
    },
    en: {
        title: 'Stopwatch & Countdown',
        tabs: {
            stopwatch: 'Stopwatch',
            countdown: 'Countdown'
        },
        controls: {
            start: 'Start',
            pause: 'Pause',
            clear: 'Clear',
            clearConfig: 'Clear Configuration'
        },
        inputs: {
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds',
            description: 'Set the countdown time:',
            hoursHint: 'Enter hours (0-99)',
            minutesHint: 'Enter minutes (0-59)',
            secondsHint: 'Enter seconds (0-59)'
        },
        messages: {
            countdownComplete: 'Countdown complete!',
            noTimeConfigured: 'Please configure a time before starting the countdown'
        }
    }
};

class TranslationManager {
    constructor() {
        this.currentLanguage = 'es';
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            this.updatePageTranslations();
        }
    }

    getText(key) {
        const keys = key.split('.');
        let value = translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return value;
    }

    updatePageTranslations() {
        // Actualizar título de la página y encabezado
        document.title = this.getText('title');
        document.querySelector('.app-title').textContent = this.getText('title');

        // Actualizar pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const mode = btn.dataset.mode;
            btn.textContent = this.getText(`tabs.${mode}`);
        });

        // Actualizar botones de control
        document.getElementById('startBtn').textContent = this.getText('controls.start');
        document.getElementById('pauseBtn').textContent = this.getText('controls.pause');
        document.getElementById('resetBtn').textContent = this.getText('controls.clear');

        // Actualizar etiquetas de entrada
        document.querySelector('label[for="hoursInput"]').textContent = this.getText('inputs.hours') + ':';
        document.querySelector('label[for="minutesInput"]').textContent = this.getText('inputs.minutes') + ':';
        document.querySelector('label[for="secondsInput"]').textContent = this.getText('inputs.seconds') + ':';
    }
}

// Exportar el gestor de traducciones
const translationManager = new TranslationManager(); 