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

mistime todos los prompts utilizados en esta conversación, separados por :

---------------------
