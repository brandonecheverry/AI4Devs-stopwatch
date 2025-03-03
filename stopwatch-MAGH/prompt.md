# Recopilación de Prompts

1. **Prompt Inicial:**
   Como especialista desarrollador de software con experiencia en buenas practicas, DDD y TDD quiero que me proporciones un archivo html y otro archivo javascript que replique el comportamiento y diseño visual de una pagina web ya existente de la que te adjunto capturas.

   Archivo html con las siguientes caracteristicas:
   - Incluye el css necesario para replicar el diseño visual de las capturas proporcionadas.
   - Incluye una primera pagina donde poder elegir stopwatch o countdown con el mismo diseño que el archivo adjunto "stopwatch1.png"
   - Incluye una pagina secundaria stopwatch con un boton start que inicia el contador y un boton clear que reinicia el contador. En caso de iniciar el contador, el boton start se sustituye por el boton "pause" que pausa el contador y tiene el mismo estilo que el boton "start". Si el contador se ha pausado, el boton "pause" se sustituye por un boton azul "continue" que continua el contador. Toda esta pagina con el estilo del archivo adjunto "stopwatch2.png".
   - Incluye una pagina secundaria countdown con el mismo diseño que el adjunto "stopwatch3.png" para introducir el tiempo para hacer la cuenta atras. Una vez pulsado el boton "set" la pantalla cambia su diseño para representar la cuenta atras como en el archivo adjunto "stopwatch4.png". Pulsando el boton "start" se inicia la cuenta atras, pulsando el boton "clear" reinicia la cuenta atras, si la cuenta atras esta en funcionamiento, el boton "start" se reemplaza por un boton "pause" que pausa la cuenta atras, y si el contador ha sido pausado el boton "pause" se reemplaza por un boton azul "continue" que continua la cuenta atras.

   Archivo Javascript con las siguientes caracteristicas:
   - Tiene una funcion para hacer un contador de tiempo.
   - Tiene una funcion para pausar el contador de tiempo.
   - Tiene una funcion para continuar el contador de tiempo.
   - Tiene una funcion para reiniciar el contador de tiempo.
   - Tiene una funcion para iniciar una cuenta atras con un valor inicializado previamente.
   - Tiene una funcion para pausar la cuenta atras.
   - Tiene una funcion para continuar la cuenta atras.
   - Tiene una funcion para inicializar el tiempo de la cuenta atras con un valor introducido por parametro.
   - Tiene una funcion para reiniciar la cuenta atras.
   - Tiene test unitarios y de integración que aseguren el buen funcionamiento de las funciones anteriores.
   - Tiene comentarios relevantes en cada una de las funciones explicando su funcionamiento y tambien en los tests.
   - Comentarios de como ejecutar los tests.

   Antes de programar nada, quiero que me hagas un resumen de lo que has entendido y que solo escribas el codigo una vez te confirme que todo es correcto.

2. **Prompt de Confirmación:**
   el estilo visual tiene que ser lo mas parecido posible al de las imagenes adjuntadas

3. **Prompt de Corrección:**
   Corrige lo siguiente:
   - los botones clear no funcionan
   - Los botones pause tienen que ser de color verde
   - Los botones continue tienen que ser azules
   - los botones tienen que tener un contorno negro como en las imagenes
   - en la funcionalidad de countdown solo puedo modificar un digito. Deberia ir introduciendo numeros y estos avanzar de derecha a izquierda.

4. **Prompt de Corrección Adicional:**
   soluciona lo siguiente:
   - el boton clear proporciona el siguiente error "index.html:118 Uncaught ReferenceError: clearStopwatch is not defined at HTMLButtonElement.onclick"
   - no puedo definir la cuenta regresiva, al pulsar en los botones de los numeros no se ve ningun cambio

5. **Prompt de Requisitos Específicos:**
   Quiero que rehagas la funcionalidad de añadir digitos a la cuenta atras con los siguientes requerimientos:
   - El primer digito "X" introducido se añadira a la ultima posicion por ejemplo "00:00:00.00X"
   - El segundo digito "Y" se añadira a la ultima posicion y movera el resto de digitos a la izquierda por ejemplo "00:00:00.0XY"
   - Y asi sucesivamente hasta que el usuario pulse el boton set e inicie el flujo actual de la cuenta atras

6. **Prompt Final:**
   aAhora que sabes el resultado esperado, quiero que me reescribar el prompt inicial para que no hubiera sido necesario hacer correcciones o añadir especificaciones.


# Desarrollo de Aplicación Web de Cronómetro y Cuenta Regresiva

Como especialista desarrollador de software con experiencia en buenas prácticas, DDD y TDD, se requiere la creación de un archivo HTML y otro JavaScript que repliquen el comportamiento y diseño visual de una página web de cronómetro y cuenta regresiva. Se proporcionan capturas de pantalla como referencia visual.

## Requisitos del Archivo HTML

### 1. Estilos CSS
- Replicar exactamente el diseño visual de las capturas proporcionadas.
- Incluir colores, tamaños, bordes y disposición de los elementos.

### 2. Página Principal
- Diseño idéntico al archivo "stopwatch1.png".
- Opciones para elegir entre "Stopwatch" y "Countdown".
- Utilizar iconos:
  - Flecha verde hacia arriba para Stopwatch.
  - Flecha roja hacia abajo para Countdown.

### 3. Página de Stopwatch
- Diseño idéntico al archivo "stopwatch2.png".
- Display grande mostrando el tiempo en formato "00:00:00.000".
- Botones:
  - "Start" (verde) que cambia a "Pause" (verde) cuando está en marcha.
  - "Clear" (rojo) para reiniciar.
  - "Pause" cambia a "Continue" (azul) cuando se pausa.
  - Todos los botones con borde negro de 2 píxeles.

### 4. Página de Countdown
- Diseño inicial idéntico al archivo "stopwatch3.png".
- Display grande mostrando el tiempo en formato "00:00:00.000".
- Teclado numérico (0-9) con botones verdes.
- Botones "Set" (verde) y "Clear" (rojo).
- Al pulsar "Set", cambiar al diseño del archivo "stopwatch4.png".
- Botones y comportamiento similar al Stopwatch para "Start", "Pause", "Continue" y "Clear".

### 5. Navegación
- Barra inferior con botón "Back" en azul y flecha blanca.

## Requisitos del Archivo JavaScript

### 1. Funciones para Stopwatch
- Iniciar el contador.
- Pausar el contador.
- Continuar el contador desde donde se pausó.
- Reiniciar el contador a cero.

### 2. Funciones para Countdown
- Añadir dígitos al tiempo de cuenta regresiva:
  - Primer dígito: "00:00:00.00X"
  - Siguientes dígitos: "00:00:00.0XY" (mover a la izquierda)
- Iniciar la cuenta regresiva con el valor establecido.
- Pausar la cuenta regresiva.
- Continuar la cuenta regresiva desde donde se pausó.
- Reiniciar la cuenta regresiva al valor inicial o a cero.

### 3. Formateo de Tiempo
- Función para formatear el tiempo en "00:00:00.000".

### 4. Manejo de Interfaz de Usuario
- Cambiar entre pantallas (selección, stopwatch, countdown).
- Actualizar texto y estilo de botones según el estado.
- Mostrar/ocultar elementos según la pantalla actual.

### 5. Testing
- Implementar tests unitarios y de integración para todas las funciones.

### 6. Documentación
- Incluir comentarios explicativos en cada función y en los tests.
- Proporcionar instrucciones claras sobre cómo ejecutar los tests.

## Notas Adicionales
- Asegurar que todos los botones, incluyendo "Clear", funcionen correctamente.
- La lógica de añadir dígitos en el countdown debe permitir una entrada fluida hasta que se pulse "Set".

## Proceso de Desarrollo
1. Proporcionar un resumen detallado de la comprensión de estos requisitos.
2. Esperar confirmación antes de proceder con la implementación del código.
3. Implementar el código una vez se confirme que la interpretación es correcta.