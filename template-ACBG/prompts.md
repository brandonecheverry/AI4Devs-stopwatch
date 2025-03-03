# chatbot utilizado: ChatGPT

# PRIMER PROMPT
# Eres un experto desarrollador de software y desde muy joven vienes creando repositorios en GuitHub, de una compañía de innovación tecnológica y desarrollo de productos relacionados con software para relojes digitales. 

Como Desarollador y experto programador, debe desarrollar la **Actividad1** en su totalidad cumpliendo con cada uno de los pasos a seguir.

# Pasos a seguir y contexto de la ”Actividad_1”:

* crear un cronómetro y cuenta atrás.

* Referencia: [Referencia:](https://www.online-stopwatch.com/) 

* Hazlo apoyado en el seed index.html + script.js que proporcionamos.

'''index.html

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


**Consejo: si permite el análisis de imágenes, puedes subirla para obtener fácilmente un diseño similar al de referencia.**

* Para entregar, haz una pull request que incluya una carpeta copiada de template, con el nombre (stopwatch-ACBG ). Debe incluir no solo el código generado, sino también, fundamental, el prompt utilizado y el chatbot utilizado en . Si has usado más de un prompt hasta llegar a una solución adecuada, añade todos en orden. 


3. Como se dice en la parte final de las instrucciones, esperamos tu entrega como un pull request en el repositorio.
Para ello, debes seguir los siguientes pasos:

	3.1 Hacer un fork del repositorio (botón arriba a la derecha)
	3.2 Clonar (Descargar) el fork, que será un proyecto con el mismo nombre pero bajo tu usuario
	3.3 Completar el ejercicio: rellenar el prompt y los archivos en tu carpeta
	3.4 Crear una nueva rama para la feature del tipo solved-stopwatch
	3.5 Hacer commit
	3.6 Empuje de Git
	3.7 En la interfaz de tu repositorio te saldrá un aviso arriba para hacer Pull request.



/// Desarrollar un paso a paso, para crear un repositorio en GuitHub y desarrollar la **Actividad1** con las buenas practicas de programación que esperarías que los Aprendices presentaran. 



- Este paso a  paso se generará en formato Markdown para abrir en Jupyter Notebook de Colab, por lo tanto debes generarme un archivo en formato "Json"


#Por último te comparto la imagen de referencia "stopwatch.png", para que tengas el contexto general del resultado final del MVP (Producto Mínimo Viable), y así logres adecuar los Archivos "index.html", "script.js" y el "style.css". Tener muy presente que el Archivo "style.css" debe ser incorporado junto con el archivo "index.html". Gracias!

# Otras Consideraciones importantes:
* El Reloj digital cuenta con la visualización de la Hora en formato "hh : mn : seg".
    - hh = corresponde a los dígitos de Hora.
    - mm = corresponde a los dígitos de minutos.
    - seg = corresponde a los dígitos de segundos.
    -los milisegundos "ms" se mostrará en la parte inferior derecha del segundero "seg"  y con una   fuente más pequeña.
    - El botón de START debe tener un delineado grueso de color negro y un fondo Verde lima, la Palabra "Start" centrada y de color Negro.
    - El botón de "Clear" debe tener un delineado grueso de color Negro y un fondo de color Rojo escarlata, la Palabra "Clear" centrada y de color Negro.

# SEGUNDO PROMPT

<!-- El archivo "style.css", se puede incluir en el "index.html"? -- >

# TERCER PROMPT "Razonar"

Hola el código no se parece a la imagen compartida. además no funciona, no inicia el conteo.
1- Debemos delimitar un recuadro principal en donde se observara los números del cronometro.
2- Debemos crear los dos botones ("Start" y "Clear").
3- Debemos iniciar el cronometro en 8 minutos (00:08:00)
4- Al presionar el botón "Start", debe iniciar el conteo hacia atrás (Decreciendo hasta llegar a "cero" , 00:00:00).
5- Al presionar el botón "Clear" se debe borrar cualquier cifra y volver al tiempo predefinido (00:08:00) y que tenga un sonido de "Alerta" de finalización.
6- Debemos tener la forma en que el usuario reprograme el conteo antes de pulsar el botón "Start".


Te comparto de nuevo la imagen de referencia, para que analices como esta distribuido los botones y el recuadro de visualización de los números.

Si tienes dudas, por favor preguntarme.

# CUARTO PROMPT "Razonar"

Ayúdame por favor incorporando al botón "Start" las siguientes funciones adicionales:
1- Si lo presiono cuando esta funcionando el cronometro. El conteo quede pausado hasta que vuelva a presionar de nuevo el botón "Start". y mientras tanto en la parte superior derecha de la palabra "Start", aparezca el símbolo de "pausado".
2- Si vuelvo y presiono el botón "Start" para que continué el conteo, el símbolo de "pausado" desaparezca.
3- El botón "Clear" si se presiona mientras el conteo esta pausado, seguirá funcionando igual, reiniciara el conteo e iniciara en el valor programado por defecto.

Pregúntame si no entiendes algo, o si me quieres dar alguna sugerencia?

Respuesta con pregunta del ChatBot

'''ChatGpt
Para asegurarme de que entiendo bien lo que necesitas, tengo algunas preguntas:

¿Confirmas que el botón Start debe funcionar como un botón de "toggle"? Es decir, al presionarlo cuando el cronómetro está en ejecución, se pausa (mostrando un ícono de pausa, por ejemplo “⏸”, en la esquina superior derecha del texto "Start") y, al presionarlo de nuevo, se reanuda el conteo (y el ícono de pausa desaparece).

¿Quieres que el símbolo de pausa se muestre dentro del mismo botón, por ejemplo agregándolo al texto (como “Start ⏸” o usando un elemento extra posicionado en la esquina superior derecha del botón)?

En cuanto al botón Clear, entiendo que debe funcionar de la misma forma tanto si el cronómetro está en ejecución como si está pausado: al presionarlo se reinicia el tiempo al valor por defecto (o al reprogramado) y se cancela cualquier estado en pausa.

Si confirmas o deseas ajustar algo, por favor avísame. ¿Tienes alguna sugerencia o preferencia adicional sobre el diseño o el comportamiento del ícono de pausa?

'''

# Quinto Prompt 

1.  Confirmo. Así es.
2.  Confirmo que Quiero que el símbolo de pausa se muestre dentro del mismo botón.
3. Confirmo. Así es.


# Sexto Prompt "Razonar"

Excelente!
Ya tenemos la tarea realizada. Muchas Gracias!

Ahora si te queda fácil, podríamos adecuar unos detalles por favor:

1- Aumentar el tamaño de los números casi que al doble del tamaño actual, que sea proporcional al tamaño del recuadro delimitado.

2- Que los milisegundos estén ubicados debajo del digito de unidad del segundero.

3- Que mientras el cronometro este funcionando el fondo de pantalla tenga alguna animación de este tipo [universe](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmpxYXZhMDZ1aTY5aGFpbHh6ZW5xczRoM3dndjBtaW50dWxtdWc0OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2jmma5yWrWUF6uaBkw/giphy.gif).

Lo crees posible?, en especial el punto "3". Que no vayamos a romper el programa?

pregúntame lo que no entiendas y si tienes sugerencias, se lo agradezco.


# Septimo Prompt "Razonar"

1- fíjate bien en la imagen de muestra para que dimensiones los tamaños y posición de los números del cronometro para que no queden desalineados.

2- El color y la fuente del string "Reprogramar (min):" debemos modificarlo de un tono más visible al momento de aplicar la animación al fondo.
