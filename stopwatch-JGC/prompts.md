# Chatbot utilizado
Claude 3.7 Sonnet

# Prompts
## Prompt 1 (único)
Eres un ingeniero de software experto en el desarrollo de aplicaciones web. 

Quiero crear una aplicación web que tenga dos grandes funcionalidades: 
1. Cronómetro 
2. Cuenta atrás 

Toda la funcionalidad debe residir en dos ficheros: por un lado, el código HTML en un fichero de nombre index.html, y por otro, el código javascript en otro fichero de nombre script.js, referenciado en el .html. 

Haz uso de todas las buenas prácticas que conoces de desarrollo web con HTML+Javascript, adopta un estilo gráfico visualmente atractivo para la interfaz e inspírate para ello en la imagen adjunta. 

Los requisitos funcionales que se deben cumplir son los siguientes: 
### Cronómetro
 - La funcionalidad de Cronómetro contará en primer lugar con un contador de tiempo, inicializado a 0 (00:00:00), en el que se irán mostrando las horas, los minutos, los segundos y los milisegundos transcurridos desde que se activa. 
 - Existirán varios botones: 
   - Uno para comenzar, de nombre "Start", que al pulsarlo iniciará el cronómetro, momento a partir del cual se contabilizará el tiempo transcurrido, y éste deberá reflejarse en el contador de tiempo, en tiempo real. 
   - Uno para pausar el contador, de nombre "Pause". Deberá aparecer en el mismo lugar que estaba el botón "Start" una vez se ha iniciado el cronómetro. 
   - Uno para continuar con la medición del tiempo, que aparecerá en el lugar del botón Pause, siempre que se haya pausado el contador. Su funcionalidad será reanudar la funcionalidad del contador, volviendo a medir el tiempo. 
   - Otro para resetear el contador, de nombre "Clear", que al pulsarlo, pone el contador de tiempo a 0, al igual que estaba al inicio. Este botón deberá estar siempre visible en todo momento. En el momento en que se pulse, todo volverá al estado inicial, es decir, el contador de tiempo estará a 0, al igual que al inicio, y volverá a aparecer el botón "Start" 
 
### Cuenta atrás 
- La funcionalidad de la cuenta atrás también contará con un contador de tiempo, como en la funcionalidad anterior, con horas, minutos, segundos y milisegundos, solo que en este caso, primero debe permitir al usuario configurar cuánto tiempo quiere descontar hacia atrás. 
- Existirán varios botones:
  - 10 botones numéricos, que representen del 0 al 9, y que servirán para configurar los segundos, minutos y horas (en ese orden) del tiempo a descontar. 
  - Un botón, de nombre "Set", que permita confirmar que el tiempo establecido mediante los botones numéricos es el deseado. Una vez pulsado, se mostrará una imagen como la de la funcionalidad del cronómetro, y aplicará la misma funcionalidad, solo que en lugar de contar hacia adelante en el tiempo, lo hará hacia atrás, descontando el tiempo configurado hasta llegar a 0, momento en el cual sonará un sonido a modo de alarma. 
  - Un botón, de nombre "Clear" que permitirá resetear la configuración de tiempo establecida mediante los botones numéricos, reseteando el contador a 0. 
 
### Selección de funcionalidad 
  - Al entrar a la página index.html, en el centro de la página, deberá existir un gran menú que permita seleccionar una de las dos funcionalidades anteriores: Cronómetro y Cuenta atrás. Al pulsarlas, deberá aparecer la funcionalidad correspondiente comentada anteriormente, sin recargar la página. 
  - Además, en cada una de las funcionalidades de Cronómetro y Cuenta atrás, también aparecerá un botón o link que llevará al usuario al menú principal de selección de funcionalidades.
