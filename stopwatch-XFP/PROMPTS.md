# **Prompts Utilizados para Diseñar y Construir la WebApp de Cronómetro y Cuenta Atrás**

Este documento contiene todos los **prompts** utilizados durante el diseño y desarrollo de la **WebApp de Cronómetro y Cuenta Atrás**. Se incluyen desde las solicitudes iniciales hasta las correcciones y mejoras aplicadas.

Hemos iniciado con **03-mini-high** the CHATPT pero ha dejado de funcionar sin saber porque en el desarrollo. Así que pase al modelo 4o standard.

---

## **📌 Diseño Inicial**
### **1️⃣ Definición del Proyecto**
> Actúa como un Product Engineer. Tenemos que diseñar las especificaciones que nos ha requerido un cliente para construir una página web estática (HTML + JS) que permita a un usuario escoger si quiere una cuenta atrás o un cronómetro y en función de lo escogido accederá a otra pantalla donde implementaremos la funcionalidad de un cronómetro o la de un sistema de cuenta atrás en base a las horas, minutos y segundos que inserte en un teclado numérico el usuario. Necesito que me ayudes a generar la definición funcional que luego me permitirá iniciar la programación. Tómate el tiempo que sea necesario y quiero que sigas las mejores prácticas de diseño de producto.

---

## **📌 Desarrollo de la WebApp**
### **2️⃣ Implementación del Código Inicial**
> Actúa como un experimentado senior software developer con amplia experiencia en desarrollo de navegador para implementar la solución requerida. Usa buenas prácticas de desarrollo web y no comprometas la seguridad del sistema. Te incluyo el fichero `index.html` del que partimos. Pero piensa en separar toda la lógica en `script.js` y toda la parte de diseño en `styles.css`. En cuanto a diseño mira el screenshot con los colores y diseño que debes realizar. No te dejes ningún detalle.

---

## **📌 Correcciones y Mejoras**
Esta fase ha sido un poco random y he aprendido que no es bueno intentar corregir muchas cosas a la vez. Mucho mejor de una en una y que te vaya indicando donde tocar. Si hacías multiples el codigo rompia funcionalidad que ya funcionaba.

### **3️⃣ Corrección de Errores Iniciales**
> Hay un error, porque una vez vemos la pantalla inicial, el botón cronómetro y el botón cuenta atrás no hacen nada. Deberían ir a su sección determinada.

> En la funcionalidad de cuenta atrás falta que el botón back también esté en el momento que introducimos las horas, minutos y segundos. Y una vez seleccionado el SET, deben funcionar también los botones iniciar, pausa, clear y back.

> Tanto en el display del cronómetro como en el de cuenta atrás, añade los milisegundos. A nivel de diseño que se vean más pequeñitos.

---

### **4️⃣ Implementación de Pantalla Completa**
> Quiero que añadas un botón con un icono en la parte superior derecha del `container`. Este botón debe poder ampliar todo el widget a pantalla completa, dejando el display en grande en la parte central y los botones en la parte inferior izquierda. Apretando el `ESC` del teclado o haciendo click en un botón con un icono de una aspa, podrá volver a la medida normal.

> El botón con el icono debe estar en la esquina superior derecha pero dentro del `container` llamado `app-container`.

> Cuando estamos en `full screen mode` y le damos al botón `Back`, además de hacer la funcionalidad del botón `Back`, debemos salir del modo `Full Screen`.

---

### **5️⃣ Corrección de la Cuenta Atrás**
> Después de presionar `SET`, debe aparecer el botón `Iniciar`, no `Pausar`.

> El sonido `alarm.mp3` debe sonar solo **2 segundos**.

> El botón `Back` en el teclado virtual de la cuenta atrás **no sigue el mismo estilo**. Arréglalo.

> El botón `Back` del teclado virtual en la cuenta atrás sigue rojo y no sigue el estilo de otros botones como `SET` o `Reset`. Arréglalo.

---

## **📌 Documentación**
### **6️⃣ Generación de Documentación**
> Ahora quiero que me generes un `README.md` con toda la documentación de la webapp que hemos desarrollado. No te dejes detalles, tómate el tiempo que creas necesario. Los detalles son importantes para que quede clara la funcionalidad hecha.

> Genera un `PROMPTS.md` que contenga todos los prompts que he usado para diseñar y construir esta webapp.

---

🔥 **¡Ahora tienes un documento completo con todos los prompts utilizados en el desarrollo de la WebApp!** 🚀
