Herramienta utilizada: ChatGPT 4o

Prompt1 (adjuntando imagen de muestra proporcionada en el repo original)
Eres un ingeniero de software experimentado en html, css y javascript.
Te han encargado la tarea de desarrollar, de la manera más sencilla y estructurada posible, una herramienta basada en la imagen adjunta.
Los casos de uso a desarrollar son los siguientes:
- Cronómetro: tendrá un reloj que irá sumando el tiempo y dos botones, uno para iniciar y otro para parar.
- Cuenta atrás: tendrá un reloj que irá descontando el tiempo y todos los inputs necesarios para fijar el tiempo desde el que iniciar la cuenta atrás. También tendrá un botón para iniciar y otro para parar.
Tendremos un menú en la parte superior con dos botones, uno para activar cada una de las funcionalidades.
Las funcionalidades se mostrarán en el centro de la pantalla.
El estilo general debe ser moderno, utilizando clases CSS que aporten un resultado profesional a la solución.
El resultado debe mostrarse en tres ficheros separados: html, js y css

Prompt2
Vamos a hacer varias mejoras:
- La cabecera no debería tener un fondo negro. El fondo debería ser blanco, para que se integre lo mejor posible con el resto de la aplicación.
- El reloj, además de horas, minutos y segundos, también muestre los milisegundos.
- En función de que funciolidad esté activa, se deberá resaltar el botón del menú correspondiente, para que el usuario sepa que funcionalidad está activa en la zona central.
- Lo botones de iniciar y detener deberían estar debajo del reloj
Actualiza los tres archivos y muestramelos.

Prompt3
Vamos a seguir añadiendo mejoras:
- El fondo de la cabecera debería ser del mismo color que el resto de la página.
- Añadir un icono a los iconos de la cabecera para aportar un estilo más profesional.
- En el modo cronómetro, si ya he pulsado en el botón iniciar, este debe quedar desactivado, hasta que pulse en detener.
- En el modo cronómetro, necesito otro botón más para poner a cero el reloj. El botón tendrá un icono que indique que se va a resetear el contador.
Actualiza los tres archivos y muestramelos.

Prompt4
Los iconos no se ven

Prompt5
Vamos a añadir más mejoras:
- Hay que resaltar más el botón de la funcionalidad activa. Además, para dejarlo más claro, vamos a añadir un título a la funcionalidad, encima del reloj, que indique cual está activa.
- El icono de los botones de detener, no debe ser el icono de pause, sino el icono de stop.
- En la cuenta atrás, hay que posicionar los inputs del tiempo a seleccionar encima del reloj, y además vamos a darle un estilo más profesional.
- En la cuenta atrás, además, cuando le demos a iniciar, entre los inputs y el reloj, vamos a indicar el tiempo que hemos solicitado, para que el usuario lo tenga presente.
- En la cuenta atrás, necesitamos un botón de resetear, que borre la información de los inputs y que ponga a cero el contador.

Prompt6
Seguimos añadiendo mejoras
- Al cargar la página, si no hemos pulsado en ningún botón todavía, en la zona centro, donde mostramos la funcionalidad, mostraremos un mensaje de bienvenida. Hasta que no se pulse uno de los botones, no se activará ninguna funcionalidad.
- En el modo cronómetro, tras pulsar en iniciar, si pulsamos en detener, mientras no pulsemos en reiniciar, el botón de iniciar debe cambiar su nombre a Continuar.
- En el modo cuenta atrás falta un botón denominado "Establecer", a la derecha de los inputs para fijar el valor inicial del reloj, en base a los datos disponibles en los inputs.

Prompt7
Vamos a corregir lo siguiente:
- El icono del botón Iniciar, en el modo cronómetro, se ha perdido.
- En el modo cuenta atrás, el botón de establecer no carga la información en el reloj.

Prompt8
El modo cuenta atrás no funciona como se ha indicado.
El objetivo de este modo es que una vez que el usuario indique unos valores y pulse en el botón Establecer, estos valores se coloquen en el reloj, para que al pulsar en el botón Iniciar, empiece la cuenta atrás desde el valor del reloj hasta llegar a cero.
Si mientras está la cuenta atrás funcionando, se pulsa en el botón Detener, el reloj se parará. 
Si cuando está parado se vuelve a pulsar en el botón Iniciar, la cuenta atrás seguirá hasta llegar a cero.

Prompt9
Ahora hay algunos errores que solucionar:
- La funcionalidad del cronómetro ha dejado de funcionar.

Prompt10
Sigue habiendo problemas. Para que todo funcione bien, los elementos de cada una de las funcionalidades deben tener diferentes identificadores. Ahora se están mezclando elementos entre la funcionalidad del cronómetro y la de la cuenta atrás.

Prompt11
Voy a detallar las funcionalidades que funcionan correctamente y las que no funcionan, para que corrijas las que no funcionan.
Las que si funcionan son:
- Botón iniciar del cronómetro
- Botón reiniciar del cronómetro
Las que no funcionan son:
- Botón detener del cronómetro
- Botón establecer de la cuenta atrás
- Botón iniciar de la cuenta atrás
- Botón detener de la cuenta atrás
- Botón reiniciar de la cuenta atrás

--------------------- Corrección manual ---------------------
En este punto he tenido que corregir de forma manual lo siguiente:
- La funcionalidad de mostrar ocultar el cronómetro y la cuenta atrás se había perdido. La he rescado de un commit anterior.
- Al botón detener del cronómetro le había puesto un disabled. Lo he tenido que quitar manualmente.
- La sección de bienvenida, no la estaba recuperando bien en el script, y no podía interactuar con ella para ocultarla cuando correspondía.
- La funcionalidad del botón de reseteo de la cuenta atrás, se había perdido, la he recuperado.
--------------------- Corrección manual ---------------------