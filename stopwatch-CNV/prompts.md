Chatbot: ChatGPT o3-mini

Asume el rol de experto en desarrollo de aplicaciones web en la parte de frontend.

Se necesita crear una aplicación web que consiste en representar un cronómetro.
El cronómetro dispondrá de 2 funciones, la de contar hacia adelante que en la aplicación irá identificada como "Stopwatch" y la de cuenta regresiva que en la aplicación ira identificada como "Countdown".
Como pantalla inicial mostrara las 2 opciones mencionadas en el centro de la pantalla con un fondo blanco, una al lado de la otra representadas por un botón grande y cuadrado por cada opción. El botón Stopwatch a la izquierda y el botón Countdown a la derecha. Los botones no han de ocupar toda la pantalla, deben de estar en el centro de la misma ocupando un tercio de la pantalla.
Cuando se seleccione una opción, ira a la pantalla asociada a esa opción.

1.	Pantalla Stopwatch
Al seleccionar la opción de StopWatch la vista cambiará dejando de mostrar la pantalla inicial y mostrando un cronometro dentro de un recuadro con el estilo 00:00:00 (hh:mm:ss) y 3 ceros más pequeños en forma de subíndice justo debajo de los dígitos que representan los segundos que indicarán los milisegundos.
Debajo del cronometro tendremos 2 grandes botones uno a la izquierda y otro a la derecha. El botón de la izquierda estará identificado como “Start” y su función será iniciar el cronómetro.
El botón de la derecha estará identificado como “Clear” y su función será resetear el cronómetro a 0. 
1.1	Botón Start
En el momento que se inicie el cronómetro el texto de dicho botón cambiará a “Pause” y su función será la de detener el cronómetro. Cuando el cronómetro esté detenido, el texto del botón cambiará a “Continue” y su función será reanudar el cronómetro desde el tiempo en el que se había pausado. Cuando el cronometro ha sido reanudado, el texto del botón volverá a ser “Pause”.

1.2	Botón Clear
Cuando el botón clear realiza su función, el botón de la izquierda (Funcion Start) debe quedar en su estado inicial de “Start”.
1.3	Botón Back

Debajo de estos 2 botones, en la parte izquierda alineado con la parte izquierda del recuadro, tendremos un botón en forma de flecha hacia la izquierda seguida del texto “Back”. La función de este botón es la de volver a la pantalla inicial de opciones.


2.	Pantalla Countdown
Al seleccionar la opción de Countdown la vista cambiará dejando de mostrar la pantalla inicial y mostrando un cronometro dentro de un recuadro con el estilo 00:00:00 (hh:mm:ss) exactamente igual que el cronómetro de la función Stopwatch.
Debajo del cronómetro, podremos configurar el tiempo a partir del cual se realizará la cuenta atrás. Para ello dispondremos de 10 botones que se representarán los dígitos del 0 al 9, de un botón “Set” y otro botón “Clear”.
2.1	Botones de dígitos de 0 a 9

Al clicar en cualquiera de estos botones, rellenará la cifra representada por el botón en la parte del digito de las unidades de los segundos en el cronómetro, desplazando el resto de dígitos que están a la izquierda de las unidades de los segundos una posición hacia la izquierda. Los dígitos de las milésimas de segundo no se verán afectadas.
2.2	Botón Set
Al clicar en el botón “Set” nos llevará una pantalla similar en apariencia a la de “StopWatch”, a esta pantalla le llamaremos “Downwatch”. En esta pantalla el valor del cronómetro inicial será el que hemos definido con los dígitos de 0 a 9 en la pantalla de “CountDown”. El comportamiento de estados del botón serán los mismos que los de la pantalla de StopWatch a diferencia que la funcionalidad del botón Start iniciará la cuenta atrás a partir del valor establecido en el cronómetro. También podremos pausar la cuenta atrás y reanudarla de la misma forma que se hacía con el cronómetro normal en la función “Stopwatch”.
La diferencia del botón “Clear” es que en este caso reestablecerá el cronómetro al valor que establecimos previamente en la pantalla “Countdown” mediante los dígitos del 0 al 9
2.3	Botón Clear
Cuando el botón clear dejará el cronómetro todo a 0.

2.4	Botón Back

Debajo de estos 2 botones, en la parte izquierda alineado con la parte izquierda del recuadro, tendremos un botón en forma de flecha hacia la izquierda seguida del texto “Back” exacamente con el mismo estilo de la pantalla de StopWatch. La función de este botón es la de volver a la pantalla inicial de opciones.

Visualización pantalla inicial:
Para la visualización tendremos que el botón de stopwatch irá representado por una flecha verde con un contorno ligeramente más oscuro, apuntando hacia arriba. La flecha tiene un efecto de degradado, de un tono de verde más claro en la parte central a un verde algo más oscuro en los bordes. Se mostrará el texto StopWatch encima de la flecha. 
Para el botón countdown será la misma representación y mismo estilo sólo que la flecha será de color rojo y estará apuntando hacia abajo.
Visualizacion Pantalla Stopwatch:
En la pantalla se mostrará una interfaz de cronómetro con un diseño de estilo sencillo y colores llamativos. En la parte superior aparece una barra azul con el texto “www.online-stopwatch.com” en blanco. Debajo de esta barra, se ve un recuadro grande y redondeado en las esquinas que muestra el tiempo en formato “00:00:00” con dígitos grandes y en color negro, y a la derecha de los segundos se aprecian “000” en un tamaño menor, representando los milisegundos.
En la zona inferior del recuadro principal, hay dos botones grandes y rectangulares: uno de color verde a la izquierda, etiquetado como “Start”, y otro de color rojo a la derecha, etiquetado como “Clear”. En la parte inferior izquierda de la imagen se observa un botón con una flecha verde apuntando hacia la izquierda y el texto “Back”, sobre un fondo azul.
El cronómetro debe de ser exactamente de la siguiente manera:
En la zona central de la interfaz se encuentra el cronómetro, que se presenta dentro de un recuadro grande de esquinas redondeadas y con fondo de un tono azul grisáceo claro. Los números se deben de ver grandes.
. Dentro de este recuadro, se muestran tres pares de dígitos grandes en color negro (formato “00:00:00”), los cuales indican horas, minutos y segundos. Justo a la derecha de esos dígitos, en un tamaño más pequeño, aparecen tres dígitos adicionales (representados como “000”) que muestran los milisegundos.
El Boton start y clear deben de ser exactamente de la siguiente manera:
El botón Start aparece debajo del recuadro del cronómetro, hacia la parte izquierda. Es un botón de forma rectangular con esquinas ligeramente redondeadas, de color verde intenso, y tiene la palabra “Start” escrita en color negro en su centro. Su tamaño es grande. El botón clear será del mismo estilo, pero en la parte derecha y de color rojo. Cuando el botón start este con el texto “Continue” el color debe de ser un azul degradado de claro a oscuro.
El botón back será de la siguiente manera:
El botón Back se encuentra en la parte inferior izquierda de la interfaz. Tiene un fondo azul y, sobre él, se ve una flecha verde apuntando hacia la izquierda, seguida de la palabra “Back” en color blanco (o en un tono claro). Su diseño es más alargado horizontalmente y se distingue claramente de los botones de la sección central por su ubicación y sus colores.
Visualizacion de la pantalla Countdown:
La pantalla mostrará una interfaz con un estilo similar a un cronómetro o temporizador:
1.	En la parte superior, se ve una barra azul con el texto “www.online-stopwatch.com” en color blanco.
2.	Justo debajo, hay un recuadro grande con esquinas redondeadas y fondo claro, donde se muestra el formato de tiempo “00:00:00” en dígitos grandes de color negro, seguido a la derecha de tres dígitos más pequeños (000) para representar milisegundos. Exactamente el mismo que el de la pantalla StopWatch.
3.	Bajo ese recuadro, aparecen diez botones de color verde, cada uno con un dígito (5, 6, 7, 8, 9 en la fila superior y 0, 1, 2, 3, 4 en la fila inferior).
4.	A la derecha de esos botones numéricos, se observan dos botones adicionales: uno verde con el texto “Set” y otro de color gris con el texto “Clear”.
5.	En la esquina inferior izquierda, hay un botón azul que muestra una flecha verde apuntando a la izquierda, acompañada de la palabra “Back”.
Los botones serán exactamente de la siguiente manera:
En la zona inferior de la interfaz, justo debajo del recuadro del cronómetro, se observa un conjunto de botones dispuestos en dos filas. La mayoría de estos botones son cuadrados de color verde y en cada uno figura un dígito numérico (por ejemplo, 5, 6, 7, 8, 9 en la primera fila y 0, 1, 2, 3, 4 en la segunda). A la derecha de este bloque de dígitos, se hallan dos botones adicionales:
1.	Botón “Set”:
o	También es verde, similar en forma y color a los botones numéricos.
o	Lleva el texto “Set” en color negro en su interior.
2.	Botón “Clear”:
o	Se diferencia por su color gris, en contraste con los otros botones verdes.
o	Lleva el texto “Clear” en color negro en su interior.
Estos dos botones se ubican en la parte derecha de los dígitos, uno encima del otro, completando la sección de configuración y borrado para el cronómetro.
El botón back es como el de la pantalla StopWatch
Visualización pantalla Downwatch:
Idem que la pantalla StopWatch

La solución se deberá implementar en HTML + JavaScript, generando un archivo index.html para la parte de HTML y un archivo script.js para la parte de JavaScript.
También asegurarse de que la nomenclatura de IDs (y la forma de mostrar/ocultar pantallas) coincida entre la especificación, el HTML y el JavaScript.
De momento no crees el código sólo analiza la solución que se pide. Una vez lo tengas te pasaré los ejemplos visuales de cómo se tiene que ver la aplicación

procedamos con la fase de desarrollo.
