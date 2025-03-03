eres un experto programador web:
* CSS
* HTML
* Principios SOLID
* Arquitectura hexagonal.
* Seguridad

Necesito que generes un cronometro. Te entrego la primera version del proyecto vacío:
index.html:
'''
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>
'''

script.js:
'''

'''

Necesitamos crear una web con 3 pantallas:
* Pantalla principal Con dos botones que te permitan elegir entre cronometro y cuenta atrás.
* Pantalla de cronometro con los siguientes componentes:
  ** reloj: HH:MM:SS. mucho mas pequeño, bajo los segundos 3 dígitos de milésimas
  ** Bajo el reloj, los botones de Start y Stop
  ** Boton Back para volver a la pagina de inicio
* Pantalla de cuanta atras, se trata de una pantalla igual de la anterior pero bajo el reloj también tenemos botones con los números del 0 al 10 para establecer el valor desde el que hacer la cuenta atrás.

Realiza una primera aproximación, pero no te inventes nada, pregúntame lo que necesites.

--------------

1. Prefiero una unica pagina

2. Refinaremos mas adelante

3. correcto.

4. Si, ya iteraremos con algunas particularidades

5. tengo algunas ideas pero vamos a iterar sobre ello después. En cuanto a las validaciones lo dejo en tus manos siempre y cuando me comuniques la decision tomada.

----------------

* Cambios en la distribución de los botones: El botón back esta en una fila aparte.

* Cambios en la cuenta atras:
  ** no es necesario el botón 10.
  ** funcionamiento, el valor de los botones se acumulan. Ejemplo: 2 + 4 + 6 + 9 = 00:24:69

Necesitas aclaraciones?

----------------

1. el ultimo botón pulsádo representa la unidad de segundos
2. El usuario puede pulsár tantos botones como quiera, los valores pulsados se formatean como sigue:
   Pulso el 1: Se muestra en el reloj 00:00:01.000
   Pulso el 3: Resultado 00:00:13:.000
   Pulso 5 veces el 2: Resultado 32:22:22.000

3. La visualización es correcta

4. Confirmado

Crea también un botón set junto a los números. Al pulsarlo formatea el cronometro a un tiempo valido. Ejemplo: 00:90:33 --> 01:30:33

--------------

estas son las instrucciones mejor explicadas:

* Pulso el 1 → "000001" → 00:00:01
* Pulso 1 y luego 3 → "000013" → 00:00:13
* Pulso 1 y luego y luego pulso 5 veces el 2 → "1322222" se rellenaría como "322222" → 32:22:22
------------

tenemos unos cambios de comportamiento de la cuenta atras.

* bajo el reloj distribuye los botones de la siguiente forma:
  Fila uno: 5, 6, 7, 8, 9 y "Set"
  Fila dos: 1, 2, 3, 4, 5 y "Clear"

Los Botones Start y Stop son invisibles

* Al pulsar el botón set, ademas del funcionamiento actual:
  ** Vuelve invisibles todos los botones de las dos filas descritas en el punto anterior.
  ** Vuelve visibles los botones Start y Stop
  *Al pulsar el botón clear el reloj se actualiza a 00:00:00.000
---------------

puedes añadir una alarma cuando la cuenta atras llegue a 0?

--------------

Ajustes en la cuenta atras.

El botón Start al pulsarse Se sustituye por un botón pause,se sustituye por un botón Continue que al pulsarse vuelve a ser Pause.
El botón Stop se convierte en Clear

El comportamiento de cada botón es:
Start: comienza la cuenta atras
Pause: Para el conteo del reloj
Continue: Continua la cuenta atras
Stop: Vuelve al poner el valor inicial que hemos fijado al pulsar el botón set.

-----------------

Al llegar a 0 el botón el botón Pause desaparece.
Al pulsar el botón Stop: La alarma deja de sonar, el tiempo se reina a lo seseado y el botón Start reaparece
----------
pasamos ahora a refinar el comportamiento del cronometro.

* El Botón Start al pulsarlo se transforma en el boton Pause que se transforma al ser pulsado en el Boton Continue
  *El botón Stop Pasa a llamarse Clear.

Comportamiento de los botones:
Start--> Inicia el Cronometro
Pause--> Pausa el cronometro
Continue --> Vuelve a activar el cronometro sin reiniciarlo
Clear --> Reinicia el cronometro a 00:00:00.000. Hace visible el botón Start
--------------
el comportamiento es excelente. Necesitamos ahora ajustar los estilos. Puedo adjuntar una imagen de como lo quiero o necesitas descripciónes?
---------------
probemos con una imagen para el cronometro

-----------

intenta hacer ajustes similares en las otras dos paginas y devuélveme todo el código.

-------------
Los tres paneles (Inicio, cronometro y cuenta atras) aparecen visibles a la vez. Puedes repasar el código para ajustarlo a las especificaciones?

-------------

tenemos un problema con las visibilidad de cada panel, pese a los estilos aplicados todos los paneles aparecen visibles. Puedes buscar una solución?

-------------

ajusta el css para la apariencia de algunos colores Color de fondo:

Cronometro:
* Continue: Verde
* Pause: Azul
* Clear: Rojo
  Cuenta Atras
* Botones de Numeros y Boton de Set: Verde
* Clear: Gris
--------------

en la cuenta atras también necesito el botón Pause de fondo azul

-----------

te adjunto una captura para modificar el estilo de la pagina de inicio

------------

dame siempre el código completo

------------

te paso el div correspondiente a la pagina principal:

<div id="screen-main" class="screen active main-container">
    <!-- Columna Izquierda: Stopwatch -->
    <div id="btn-timer" class="half half-stopwatch">
        <img src="Stopwatch.png" alt="Green arrow pointing up" class="arrow-icon" />
    </div>

    <!-- Columna Derecha: Countdown -->
    <div id="btn-countdown" class="half half-countdown">
        <img src="Countdown.png" alt="Red arrow pointing down" class="arrow-icon" />
    </div>
</div>

Necesito que los iconos sean mas grandes y que ambos estén en la misma fila.

--------------

podemos estructurar el condiga en archivos diferentes? Diferentes .js o html sin cambiar funcionalidad?

----------

hora necesito que los botones de Back sean una row completa de color azul oscuro y un icono con una flecha verde hacia la izquierda y la palabra back en letras blancas.

--------

encapsula las pantallas para que no ocupen toda la pantalla y se vean centradas

------------

ahora necesito ajustar el tamaño del reloj para que se ajuste al tamaño de los números, también me gustaría que alinearas los milisegundos debajo de los segundos

------------

* Revierte el ultimo cambio
* Alinea a la derecha los milisegundos
* Aumenta el tamaño del texto del reloj en cuanto a horas minutos y segundos (HH:MM:SS)
* Manten los milisegundos mas pequeños

-----------

como podemos mover los milisegundos para que se alineen con el resto de la hora por su parte derecha?

----------

revierte el ultimo cambio. Te explico nuevamente la alineación del reloj

HH:MM:SS centrado
milisegundos, debajo de HH:MM:SS, alineado de manera que HH:MM:SS y los milisegundos terminen en la misma coordenada x

------------

a partir de ahora quiero que solo me presentes los archivos que han sufrido variaciones pero completos

-------------

haremos unos cambios de estilo:

* añade un degradado a todos los botones de números, set y clear de la cuenta atras. Tendran la parte de arriba ligeramente mas clara que ahora. Al pasar el cursor sobre estos botones, el degradado cambiara, pasando a ser mas clara la parte de abajo

* Da un poco de espacio entre el reloj y los botones

* En Timer, los botones Start y Clear deben compartir fila, la fila debe ocupar el mismo ancho que el reloj.

* En la pagina principal los iconos de cronometro y cuenta atras deberían estar uno al lado del otro. Ahora esta uno debajo del otro
---------------

* añade algo de espacio entre la fila de botones 5, 6, 7, 8, 9, Set
  y la fila de los demás botones.

*El texto de los botones pasado a negro

--------------

### me sentia atascado, asi que cambie de hilo:

eres un programador web experto en javascript y css.

Tengo un proyecto con estos archivos:

index.html:
'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Timer and Countdown</title>
    <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
<h1>Timer and Countdown</h1>

<!-- Contenedor principal centrado -->
<div class="app-container">
    <!-- Pantalla Principal -->
    <div id="screen-main" class="screen active main-container">
        <!-- Columna Izquierda: Stopwatch -->
        <div id="btn-timer" class="half half-stopwatch">
            <img src="Stopwatch.png" alt="Stopwatch" class="arrow-icon" />
        </div>
        <!-- Columna Derecha: Countdown -->
        <div id="btn-countdown" class="half half-countdown">
            <img src="Countdown.png" alt="Countdown" class="arrow-icon" />
        </div>
    </div>

    <!-- Pantalla de Cronómetro -->
    <div id="screen-timer" class="screen">
        <div class="time-display">
            <span id="timer-time">00:00:00</span>
            <span id="timer-ms" class="milliseconds">000</span>
        </div>
        <!-- Controles en fila; el contenedor tiene clase "row" -->
        <div class="controls row">
            <button id="timer-toggle" class="big-button cron-start-continue-button">Start</button>
            <button id="timer-clear" class="big-button cron-clear-button">Clear</button>
        </div>
        <div class="back-row">
            <button id="timer-back" class="back-button">
                <img src="back-arrow-green.png" alt="Back Icon" class="back-icon" />
                <span>Back</span>
            </button>
        </div>
    </div>

    <!-- Pantalla de Cuenta Atrás -->
    <div id="screen-countdown" class="screen">
        <div class="time-display">
            <span id="countdown-time">00:00:00</span>
            <span id="countdown-ms" class="milliseconds">000</span>
        </div>
        <div class="controls">
            <div id="digit-rows">
                <div class="digit-row">
                    <button class="countdown-digit digit-button ca-green-button" data-value="5">5</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="6">6</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="7">7</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="8">8</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="9">9</button>
                    <button id="countdown-set" class="big-button ca-green-button">Set</button>
                </div>
                <div class="digit-row">
                    <button class="countdown-digit digit-button ca-green-button" data-value="1">1</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="2">2</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="3">3</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="4">4</button>
                    <button class="countdown-digit digit-button ca-green-button" data-value="5">5</button>
                    <button id="countdown-clear" class="big-button ca-gray-button">Clear</button>
                </div>
            </div>
            <div id="action-buttons" class="hidden">
                <button id="countdown-toggle" class="big-button ca-green-button">Start</button>
                <button id="countdown-stop-button" class="big-button red-button">Stop</button>
            </div>
            <div class="back-row">
                <button id="countdown-back" class="back-button">
                    <img src="back-arrow-green.png" alt="Back Icon" class="back-icon" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    </div>
</div>

<script src="js/stopwatch.js"></script>
<script src="js/countdown.js"></script>
<script src="js/main.js"></script>
</body>
</html>
'''

styles.css
'''
/* ====== RESET BÁSICO ====== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

body {
font-family: sans-serif;
text-align: center;
background-color: #fff;
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
padding: 20px;
}

h1 {
margin-bottom: 30px;
}

/* ====== CONTENEDOR PRINCIPAL ====== */
.app-container {
width: 100%;
max-width: 800px;
margin: 0 auto;
padding: 20px;
background-color: #fefefe;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

/* ====== MOSTRAR/OCULTAR PANTALLAS ====== */
.screen {
display: none !important;
}

.screen.active {
display: block !important;
}

/* ====== PANTALLA PRINCIPAL ====== */
.main-container {
display: flex;
width: 100%;
height: 60vh;
box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

.half {
flex: 1;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: background-color 0.3s;
}

.half-stopwatch {
background-color: #ffffff;
}

.half-countdown {
background-color: #f0fff0;
}

.half:hover {
filter: brightness(95%);
}

/* Íconos */
.arrow-icon {
width: 200px;
height: auto;
}

/* ====== CRONÓMETRO Y CUENTA ATRÁS ====== */
#screen-timer, #screen-countdown {
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
margin-bottom: 20px;
}

/* Reloj */
.time-display {
padding: 10px 20px;
background-color: #e9ecff;
border: 3px solid #666;
border-radius: 30px;
box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
text-align: center;
}

/* El tiempo principal (HH:MM:SS) centrado */
#timer-time, #countdown-time {
display: block;
font-size: 4.5rem;
font-weight: bold;
text-align: center;
}

/* Los milisegundos se muestran debajo, alineados a la derecha */
.milliseconds {
display: block;
font-size: 1.2rem;
text-align: right;
margin-top: 5px;
}

/* Espacio adicional entre filas de botones en cuenta atrás */
.digit-row + .digit-row {
margin-top: 20px;
}

/* Espacio entre el reloj y los botones */
.controls {
margin-top: 20px;
display: flex;
flex-direction: column;
gap: 20px;
}

/* Para Timer, los botones en fila (ocupan el ancho del reloj) */
#screen-timer .controls.row {
display: inline-flex;
justify-content: space-between;
width: 100%;
max-width: 100%;
}

/* ====== CONTROLES Y BOTONES (comunes) ====== */
.digit-row {
display: flex;
justify-content: center;
gap: 10px;
}

/* Botones grandes de acción */
.big-button {
min-width: 120px;
min-height: 50px;
font-size: 1.2rem;
border-radius: 15px;
border: 3px solid #333;
cursor: pointer;
box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

/* ----- CRONÓMETRO ----- */
.cron-start-continue-button {
background-color: green;
color: black;
}
.cron-pause-button {
background-color: blue;
color: black;
}
.cron-clear-button {
background-color: red;
color: black;
}

/* ----- CUENTA ATRÁS ----- */
.ca-green-button {
background: linear-gradient(to bottom, #a8e6a3, #66cc66);
color: black;
}
.ca-green-button:hover {
background: linear-gradient(to bottom, #66cc66, #a8e6a3);
}
.ca-gray-button {
background: linear-gradient(to bottom, #d3d3d3, #a9a9a9);
color: black;
}
.ca-gray-button:hover {
background: linear-gradient(to bottom, #a9a9a9, #d3d3d3);
}
.ca-pause-button {
background-color: blue;
color: black;
}
.red-button {
background-color: red;
color: black;
}

/* Botones de dígitos */
.digit-button {
min-width: 60px;
min-height: 50px;
font-size: 1.2rem;
border-radius: 10px;
border: 2px solid #333;
cursor: pointer;
box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
background: linear-gradient(to bottom, #a8e6a3, #66cc66);
color: black;
}
.digit-button:hover {
background: linear-gradient(to bottom, #66cc66, #a8e6a3);
}

/* ====== BOTÓN BACK (fila completa) ====== */
.back-row {
width: 100%;
background-color: #00008B;
padding: 10px 0;
margin-top: 20px;
}

.back-button {
background: none;
border: none;
color: white;
font-size: 1.2rem;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
cursor: pointer;
}

.back-button:hover {
opacity: 0.9;
}

.back-icon {
height: 24px;
width: auto;
margin-right: 8px;
}

/* ====== OCULTAR ELEMENTOS ====== */
.hidden {
display: none !important;
}
'''
y tres archivos.js.

el problema es que necesito hacer unos cambios a nivel de estilo y distribución de los elementos.

Cambio 1:
btn-timer y btn-countdown deberian aparecer uno al lado del otro, actualmente aparecen uno debajo del otro.

---------

* Alinea el contenido del  botón Back a la izquierda.

* En Cronometro: Los botones Start y Clear deberian estar uno junto al otro. Actualmente están uno debajo del otro
---------

Configura los botones start y clear para que ocupen todo el espacio posible de la linea en la que están situados

---------

necesto que countdown-time y countdown-ms se alineen de la siguiente forma:

00:00:00
000

Como puedes comprobar ambos campos terminan en la misma coordenada x

-----------

necesito cambiar la transición entre pantallas, haciendo que deslicen lateralmente entre unos y otras. Especificaciones
*La transición debe durar un segundo
* la situación espacial de las paginas es: Cronometro - Main - Cuenta Atras
* Aplica el comportamiento también en los botones Back.