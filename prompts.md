# Prompt 1 Claude Sonnet 3.7 Stopwatch

Como un desarrollador experto en front-end, crea una aplicación web con dos funcionalidades principales elegibles desde un menú principal mediante dos *botones*:

- **Botón 1 Stopwatch**: cronómetro de tiempo que puede pararse en cualquier instante y reanudarse al pulsar sobre un botón. 
- **Botón 2 Countdown**: cronómetro de cuenta atrás en el que se puede establecer la cuenta con horas, minutos, segundos y milésimas. Esta funcionalidad la desarrollaré más adelante.

## Estilo de código general

- Debes aplicar las mejores prácticas de código limpio y patrones de diseño front-end.
- El código debe estar separado por responsabilidades:

1. El template o HTML que añadas debe residir en el fichero semilla adjunto *index.html*. 
2. El código de la lógica de la aplicación debes añadirlo en un fichero llamado *script.js* referenciado desde el fichero *index.html*.
3. Lo mismo para los estilos. Crea un fichero *styles.css* e impórtalo desde el fichero *index.html*, donde residan los estilos de la app.

- Reutiliza todo el código que sea posible y evita duplicar código. Es decir, si el modo *countdown* tiene lógica, estilos o marcado HTML similar al *stopwatch*, no dupliques código e intenta estructurarlo bien y con funciones reutilizables.

## Requisitos funcionales para el modo Stopwatch

- Deberá visualizarse en un rectángulo las horas transcurridas con el siguiente formato: *HH:mm:ss:SSS*. 
- Se rellenan los dígitos con ceros por la izquierda y no se permiten valores negativos. Este es el *estado inicial* o *Reset*.
- Existe un botón "Start" para iniciar la cuenta. Cuando se pulsa, el título del botón debe cambiar a "Pause", y cuando se pulsa en estado "Pause", debe cambiar a "Start". 
- Existe un botón "Atrás" que permite navegar al menú principal desde el stopwatch. Cuando se pulsa este botón, el estado del stopwatch debe ser el inicial o reset.

Si tienes alguna pregunta para afinar los resultados de tu trabajo, puedes hacerlas antes de continuar.

# Prompt 2 Claude Sonnet 3.7 Countdown

Vamos a continuar con el desarrollo de la función *Countdown* pulsando sobre el botón *Countdown* del menú principal. Los requisitos son los siguientes:

- Deberá visualizarse en una sección con las horas, minutos, segundos y milésimas de segundo transcurridos con el siguiente formato: *HH:mm:ss:SSS*.
- Debajo de la sección de horas, minutos, segundos y milésimas de segundo habrá otra sección con los siguientes elementos:
  1. Dígitos del 0 al 9.
  2. Botón de "Set" que, al pulsarse, guarda las horas, minutos y segundos de la sección anterior. Las milésimas de segundo siempre son 000 al pulsar el botón de "Set".
  3. Botón "Clear" que resetea las horas, minutos y segundos de la sección anterior y las variables internas.
- Existe un botón "Atrás" que vuelve al menú principal y reinicia el estado del "Countdown" por completo.
- Al pulsar los botones de *dígitos*, se van reflejando en la pantalla, empezando por el dígito más a la derecha de los *ss*, luego los minutos *MM* y así hasta llegar a las *HH*. No se permite alterar las milésimas de segundo *SSS*.

Si tienes alguna pregunta para afinar los resultados de tu trabajo, puedes hacerlas antes de continuar.

# Prompt 3 Claude Sonnet 3.7 Correcciones

Veo los siguientes problemas para que los corrijas:

- Los dígitos no reflejan su pulsación.
- El botón de atrás no funciona en Countdown.
- El botón de atrás no existe en Stopwatch.

# Prompt 4 Claude Sonnet 3.7 Correcciones

He detectado los siguientes errores en el funcionamiento:

- Al pulsar los dígitos, debe rellenarse de derecha a izquierda, empezando por las unidades de los segundos hasta llegar a las decenas de las horas y desplazándose de unidades a decenas hasta que se completen las horas, minutos y segundos o se pulse "Set" para guardar.

# Prompt 5 Claude Sonnet 3.7 Correcciones

La entrada numérica no funciona correctamente. Arregla el código para que se comporte de esta manera:

1. Primero se rellenan las unidades de la parte de los segundos. Si se pulsa una segunda tecla, las unidades pasan a las decenas de la parte de los segundos y este último número son las unidades.
2. Repite el comportamiento anterior para la parte de los minutos y las horas.

# Prompt 6 Claude Sonnet 3.7 Correcciones

Añade el siguiente comportamiento:

- Al pulsar el botón de "Set", desaparecen todos los dígitos, el botón de "Set" y el botón de "Clear".
- Aparece el botón "Start" para comenzar la cuenta atrás, que, al pulsarlo otra vez, permite "pausar" la cuenta atrás y reanudarla.
- Aparece el botón "Reset", que resetea el estado de la cuenta atrás, pero se mantienen los valores de horas, minutos y segundos cuando se pulsó el botón "Set".

# Prompt 7 Claude Sonnet 3.7 Mejoras UX/UI

Modifica los ficheros adjuntos *index.html*, *styles.css* y *script.js* para que la sección de *Countdown* y *Stopwatch* cumplan los siguientes criterios de usabilidad y diseño:

- Un diseño, colores y disposición de elementos moderno y minimalista, con un enfoque alegre que invite a usarse con mucha frecuencia.
- Debe aplicar un diseño web *responsive*. Por ejemplo, se debe visualizar correctamente los elementos en un móvil estrecho, una pantalla de escritorio o en una televisión. Si esto requiere algún ajuste de la disposición o tamaños, siéntete libre de ajustarlos para la pantalla mediante *media queries de CSS*. Te dejo un [link de ejemplo](https://developer.mozilla.org/es/docs/Web/CSS/CSS_media_queries/Using_media_queries).


# Website

[ai4devs-chronometer](https://ai4devs-chronometer.netlify.app/)