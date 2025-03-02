# Prompts utilizados en el desarrollo con ChatGPT o1

## 1era iteracion Input
```md
### Prompt estructurado para desarrollo de software

## Rol

Experto en **prompt engineering** enfocado al desarrollo de software en entornos web

## Objetivo

Realizar un prompt robusto, que utilice la estructura que te voy a compartir, el prompt sera usado para desarrollar un stopwatch, se compartiran los detalles de como sera implementado

## Expected Output

El prompt debe estar escrito en Markdown y debe incluir los siguientes puntos:

- Rol (La respuesta debe ser enfocada a la alta experticia en el desarrollo de software con tecnologias web)
- Objetivo: Ser directo y claro con la tarea
-Tono: debe incluir una seccion para el tono, el tono debe ser muy especializado, con alta experticia en los aspectos tecnicos, debe ser claro y preciso
- Contexto: Te comparto algo de context dump:

cronómetro y cuenta atrás.
Referencia: 🔗Online Stopwatch  (ver res/stopwatch.png, referencia de diseño)

- Formato de salida: especificaremos que sera en 3 archivos: index.html, index.js y styles.css

- Feedback: al final del prompt, añaderas esta seccion de feedback, y usaras una frase que invite al modelo hacer las preguntas pertinentes para asegurar la calidad de las resputas

## Formato de salida

Markdown

## Contexto

Espcificar dentro del resultado que el cronometro sera realizado utilizando JS, favoreciendo la compatibilidad del mismo con distintos navegadores, la accesibilidad sera un tema muy importante, permite que puedan existir interacciones con el teclado que activen las opciones que se incluyan en el cronometro, el css sera completamente propio, pero debe utilizar un look & feel similar al de TailwindCSS, adicionalmente el cronometro incluira un historial de detenciones, de una forma similar a como iPhone lo realiza

El codigo mantendra una estructura funcional que sea legible y que use los mas altos estandares de desarrollo de software 
```
## 1era iteracion Ouput

```md
## Rol
Eres un experto en el desarrollo de software para entornos web, con amplio dominio de JavaScript, HTML, CSS y mejores prácticas de accesibilidad.

## Objetivo
Desarrollar un cronómetro con funcionalidades de registro de detenciones (similar al cronómetro del iPhone). Se espera que el proyecto se estructure en **tres archivos**: `index.html`, `index.js` y `styles.css`.

## Tono
Tu respuesta será altamente especializada, demostrando dominio técnico. Deberá ser clara y precisa, enfocándose en estándares de calidad de código, legibilidad y buenas prácticas en accesibilidad.

## Contexto
- El cronómetro incluirá **funciones básicas** como Iniciar, Pausar, Continuar y Limpiar, además de un **historial de detenciones** estilo iPhone.  
- Se implementará en **JavaScript** para máxima compatibilidad con distintos navegadores.  
- El diseño CSS será propio, inspirándose visualmente en **TailwindCSS** pero sin utilizar ninguna dependencia externa.  
- Se considerará la **accesibilidad**, permitiendo control mediante el teclado (ej. teclas para iniciar/pausar).  
- Referencia de diseño: [Online Stopwatch](https://example.com/stopwatch.png), incorporando un look & feel sencillo y moderno.

## Formato de Salida
La solución debe dividirse en **tres archivos**:
1. **index.html**: Estructura principal del documento.
2. **index.js**: Lógica del cronómetro y funciones de manejo de eventos.
3. **styles.css**: Estilos personalizados, manteniendo coherencia con los principios de diseño de TailwindCSS.

## Feedback
Por favor, revisa este planteamiento y **pregunta cualquier duda adicional** que consideres necesaria para garantizar la calidad y completitud de la solución.
```

## 2nda iteracion Input

El resultado tiene la estructura que me gusta, sin embargo quiero que el prompt sea mas especifico, si necesitas hacerme preguntas para mejorarlo puedes hacerlo

## 2nda iteracion Output

Razonado durante unos segundos
Yoberty, para afinar aún más el prompt y que sea lo bastante específico, te propongo algunas preguntas clave:
```md
## Resolución y Precisión:

- ¿Quieres que el cronómetro mida milisegundos, o es suficiente con segundos?
- ¿Necesitas un límite máximo de conteo (por ejemplo, hasta 24 horas) o se dejará correr indefinidamente?

## Control por Teclado:

- ¿Deseas atajos de teclado específicos para Iniciar/Pausar, Continuar y Limpiar?
- ¿Debe haber atajos para registrar las “vueltas” o marcas de tiempo?
- Historial de Detenciones (o “vueltas”):

- ¿Cuántos registros se deben mostrar a la vez en pantalla?
- ¿Necesitas que cada vuelta se muestre en orden cronológico inverso (la última primero) o en orden de ocurrencia (la primera primero)?

## Diseño CSS y Aspecto Visual:

- ¿Existe alguna restricción de color o paleta que quieras respetar?
- ¿Deseas botones con transiciones, hover, etc. o mantener un estilo minimalista?
- Accesibilidad Ampliada:

- ¿Necesitas soporte especial para lectores de pantalla (etiquetas aria, roles)?
- ¿Quieres mensajes audibles o alertas cuando se alcance cierto tiempo?

## Compatibilidad de Navegadores:

-¿Hay que asegurar compatibilidad con navegadores antiguos (IE11) o basta con los modernos (Chrome, Firefox, Edge, Safari)?


## Pruebas e Integración:

- ¿Será necesaria alguna suite de testing automatizado (p. ej., Jest) para validar la funcionalidad?
- ¿Cómo se integrará en tu workflow: como un proyecto independiente o embebido en otro?

### Despliegue y Entorno:

- ¿Se requiere algún pipeline de build/transpilación (p. ej., Babel, Webpack) o es suficiente un HTML/JS/CSS puro?

- ¿Tienes alguna preferencia en la estructura de carpetas?

Con tus respuestas podré refinar cada sección (Objetivo, Contexto, Formato de Salida, etc.) y ajustar el prompt para que sea lo más preciso y completo posible. ¡Quedo atento!
```
## 3ra Iteracion Input

```md
## Resolución y Precisión:

- ¿Quieres que el cronómetro mida milisegundos, o es suficiente con segundos?
R: Si, milisegundos
- ¿Necesitas un límite máximo de conteo (por ejemplo, hasta 24 horas) o se dejará correr indefinidamente?
R: Que corra indefinido


## Control por Teclado:

- ¿Deseas atajos de teclado específicos para Iniciar/Pausar, Continuar y Limpiar?
R: Para iniciar, pausar y continuar la barra espaciadora, para limpiar la letra l
- ¿Debe haber atajos para registrar las “vueltas” o marcas de tiempo?
R: Las vueltas tambien tendran un boton al lado de iniciar/pausar/continuar, y tambien tendran un atajo llamado: Vuelta


## Historial de Detenciones (o “vueltas”):

- ¿Cuántos registros se deben mostrar a la vez en pantalla?
R: solo 10 registros
- ¿Necesitas que cada vuelta se muestre en orden cronológico inverso (la última primero) o en orden de ocurrencia (la primera primero)?
R: La primera primero

## Diseño CSS y Aspecto Visual:

- ¿Existe alguna restricción de color o paleta que quieras respetar?

R: Usa una paleta minimalista, dark y con tonos de acento amarillos, rojos y verdes, todos los colores deben ser ligeramente pastel 

- ¿Deseas botones con transiciones, hover, etc. o mantener un estilo minimalista?
R: Minimalista en cuanto al UI, pero la UX que provean las transiciones debe estar presente

## Accesibilidad Ampliada:

- ¿Necesitas soporte especial para lectores de pantalla (etiquetas aria, roles)?
R: Si

- ¿Quieres mensajes audibles o alertas cuando se alcance cierto tiempo?
R: No

## Compatibilidad de Navegadores:

¿Hay que asegurar compatibilidad con navegadores antiguos (IE11) o basta con los modernos (Chrome, Firefox, Edge, Safari)?
R: Soporte moderno

##Pruebas e Integración:

R: ¿Será necesaria alguna suite de testing automatizado (p. ej., Jest) para validar la funcionalidad?
- No
R: ¿Cómo se integrará en tu workflow: como un proyecto independiente o embebido en otro?
- Es un proyecto independiente

## Despliegue y Entorno:

- ¿Se requiere algún pipeline de build/transpilación (p. ej., Babel, Webpack) o es suficiente un HTML/JS/CSS puro?
R: Suficiente que sea vanilla

- ¿Tienes alguna preferencia en la estructura de carpetas?
R: Si, estara dentro de la carpeta stopwatch-YAG
```

## 3ra Iteracion Output
```md
# Rol
Eres un experto en el desarrollo de software para entornos web, con amplio dominio de JavaScript, HTML, CSS y mejores prácticas de accesibilidad.

# Objetivo
Desarrollar un cronómetro con:
- Conteo en milisegundos (sin límite máximo, puede correr indefinidamente).
- Funcionalidad para iniciar, pausar, continuar y limpiar.
- Un historial de detenciones (o vueltas) que muestre como máximo 10 registros, presentados en orden de ocurrencia (la primera vuelta va primera).

# Tono
Adopta un nivel de especialización alto, utilizando términos y enfoques técnicos de manera clara y precisa. La prioridad recae en la calidad del código, la legibilidad y el cumplimiento de estándares modernos de accesibilidad y usabilidad.

# Contexto
- **Atajos de teclado**:
  - Barra espaciadora para Iniciar/Pausar/Continuar.
  - Tecla “L” para limpiar.
  - Además, un botón (y atajo) para capturar vueltas.
- **Diseño y Estilos**:
  - Paleta minimalista en modo oscuro, con tonos pastel en amarillo, rojo y verde.
  - Estilo general inspirado en TailwindCSS (sin dependencias externas).
  - Se aceptan pequeñas animaciones o transiciones para mejorar la experiencia de usuario.
- **Accesibilidad**:
  - Se requieren etiquetas `aria` y `role` apropiadas para lectores de pantalla.
  - No se necesitan mensajes de audio.
- **Compatibilidad de Navegadores**:  
  - Solo navegadores modernos (Chrome, Firefox, Edge, Safari).
- **Estructura del Proyecto**:
  - Proyecto independiente, dentro de la carpeta `stopwatch-YAG`.
  - No se implementarán pruebas automatizadas.
  - Sin pipeline de build: basta con HTML, JS y CSS puros.

Referencia visual: Cronómetro similar a [Online Stopwatch](https://example.com/stopwatch.png). El diseño debe contar con un estilo limpio y moderno, y con interacciones similares a la app de cronómetro del iPhone para los registros de vueltas.

# Formato de Salida
La solución debe dividirse en **tres archivos**:
1. **index.html**: Estructura principal del documento.
2. **index.js**: Lógica del cronómetro, eventos de teclado y manejo del historial de vueltas.
3. **styles.css**: Estilos personalizados con un look & feel minimalista y oscuro, empleando toques pastel en amarillo, rojo y verde para elementos relevantes.

# Feedback
Por favor, revisa esta especificación y **plantea cualquier duda adicional** que consideres necesaria para garantizar la completitud y calidad de la implementación.

```

## 4ta Iteracion Input

```md
# Rol
Eres un experto en el desarrollo de software para entornos web, con amplio dominio de JavaScript, HTML, CSS y mejores prácticas de accesibilidad.

# Objetivo
Desarrollar un cronómetro con:
- Conteo en milisegundos (sin límite máximo, puede correr indefinidamente).
- Funcionalidad para iniciar, pausar, continuar y limpiar.
- Un historial de detenciones (o vueltas) que muestre como máximo 10 registros, presentados en orden de ocurrencia (la primera vuelta va primera).

# Tono
Adopta un nivel de especialización alto, utilizando términos y enfoques técnicos de manera clara y precisa. La prioridad recae en la calidad del código, la legibilidad y el cumplimiento de estándares modernos de accesibilidad y usabilidad.

# Contexto
- **Atajos de teclado**:
  - Barra espaciadora para Iniciar/Pausar/Continuar.
  - Tecla “L” para limpiar.
  - Además, un botón (y atajo) para capturar vueltas.
- **Diseño y Estilos**:
  - Paleta minimalista en modo oscuro, con tonos pastel en amarillo, rojo y verde.
  - Estilo general inspirado en TailwindCSS (sin dependencias externas).
  - Se aceptan pequeñas animaciones o transiciones para mejorar la experiencia de usuario.
- **Accesibilidad**:
  - Se requieren etiquetas aria y role apropiadas para lectores de pantalla.
  - No se necesitan mensajes de audio.
- **Compatibilidad de Navegadores**:  
  - Solo navegadores modernos (Chrome, Firefox, Edge, Safari).
- **Estructura del Proyecto**:
  - Proyecto independiente, dentro de la carpeta stopwatch-YAG.
  - No se implementarán pruebas automatizadas.
  - Sin pipeline de build: basta con HTML, JS y CSS puros.

Referencia visual: Cronómetro similar a [Online Stopwatch](https://www.online-stopwatch.com/). El diseño debe contar con un estilo limpio y moderno, y con interacciones similares a la app de cronómetro del iPhone para los registros de vueltas.

# Formato de Salida
La solución debe dividirse en **tres archivos**:
1. **index.html**: Estructura principal del documento.
2. **index.js**: Lógica del cronómetro, eventos de teclado y manejo del historial de vueltas.
3. **styles.css**: Estilos personalizados con un look & feel minimalista y oscuro, empleando toques pastel en amarillo, rojo y verde para elementos relevantes.

# Feedback
Por favor, revisa esta especificación y **plantea cualquier duda adicional** que consideres necesaria para garantizar la completitud y calidad de la implementación.
```

## 4ta Iteracion Ouput

```md
Razonado sobre el diseño del cronómetro durante 4 segundos

¡Hola Yoberty! Antes de ponernos manos a la obra con el código, me gustaría aclarar algunos puntos para asegurar que todo quede bien definido y que alcancemos la mejor solución posible. Aquí tienes algunas preguntas y consideraciones que, como Tech Lead, me parecen clave:

## Formato de tiempo

- ¿Está bien representar el tiempo como hh:mm:ss:ms o prefieres un formato más corto (por ejemplo mm:ss:ms) hasta alcanzar la hora?
- ¿Deseas algún comportamiento especial cuando supere cierta cantidad de horas?


## Almacenamiento de vueltas

- Mencionas que se requiere mostrar un histórico máximo de 10 vueltas. ¿Deseas que el onceavo registro “desplace” al primero o simplemente se ignore cualquier adicional?
- ¿Necesitas que se persistan las vueltas en el navegador (con localStorage), o basta con un historial efímero que se limpia al recargar la página?

## Detalles de accesibilidad

- ¿Tienes alguna preferencia sobre los roles y aria-labels que deberían usarse, o esperas que nos basemos en las guías de WAI-ARIA para botones e inputs?
- ¿Es necesario un texto alternativo (por ejemplo, sr-only) describiendo la función de cada botón para usuarios de lectores de pantalla?

## Diseño responsive

- ¿Se desea un layout que se adapte al 100% del ancho en móviles, y se centre en pantallas más grandes?
- ¿Necesitas algún breakpoint específico o integración con “mobile-first” vs. “desktop-first”?

## Estilos y animaciones

- Para el “modo oscuro” con tonos pastel en amarillo, rojo y verde, ¿hay algún matiz o saturación en particular que desees conservar?
- ¿Consideras útil alguna pequeña transición en el cambio de estado del botón (Start → Pause → Continue)?
- ¿Te gustaría un efecto de “parpadeo” o “resaltar” en el registro de la vuelta recién capturada?
Comportamiento de los atajos de teclado

- Al pulsar la barra espaciadora, si el cronómetro está detenido, debe iniciar; si está en marcha, debe pausar; y si está pausado, debe continuar, ¿correcto?
- Al presionar “L” (o “l”), se limpia el cronómetro y se borra el historial, ¿verdad?
- ¿Deseas un atajo para registrar la “vuelta” o con un botón dentro de la interfaz es suficiente? (Mencionas un atajo para vueltas, quizá la letra “V” o algo similar).

## Precisión y rendimiento

- ¿Hay alguna preferencia sobre el método de conteo interno? (Por ejemplo, requestAnimationFrame vs. setInterval con una lógica para corregir derivas de tiempo).
- Si el cronómetro “corre indefinidamente”, podemos apoyarnos en timestamps (performance.now()) para mantener precisión. ¿Te parece apropiado?

## Mensajes o feedback en caso de error

- ¿Existe algún escenario de error/edge-case que debamos manejar (p. ej., cronómetro ya limpio y se pulsa “Limpiar” otra vez, o se registran vueltas si el cronómetro está detenido)?

Con estas aclaraciones, podemos asegurarnos de que la implementación final se ajuste exactamente a lo que necesitas y que cubra todas las aristas del proyecto. ¡Quedo atento a tu feedback, Yoberty, para avanzar con la definición final del desarrollo!
```

## 5ta Iteracion Input

```md
## Formato de tiempo

- ¿Está bien representar el tiempo como hh:mm:ss:ms o prefieres un formato más corto (por ejemplo mm:ss:ms) hasta alcanzar la hora?
R: Formato mas corto hasta alcanzar la hora

- ¿Deseas algún comportamiento especial cuando supere cierta cantidad de horas?
R: No

## Almacenamiento de vueltas

- Mencionas que se requiere mostrar un histórico máximo de 10 vueltas. ¿Deseas que el onceavo registro “desplace” al primero o simplemente se ignore cualquier adicional?
R: Debe existir el desplace

- ¿Necesitas que se persistan las vueltas en el navegador (con localStorage), o basta con un historial efímero que se limpia al recargar la página?
R: Debe mantenerse en el localStorage


## Detalles de accesibilidad

- ¿Tienes alguna preferencia sobre los roles y aria-labels que deberían usarse, o esperas que nos basemos en las guías de WAI-ARIA para botones e inputs?
R: WAI-ARIA
- ¿Es necesario un texto alternativo (por ejemplo, sr-only) describiendo la función de cada botón para usuarios de lectores de pantalla?
R: Si

## Diseño responsive

- ¿Se desea un layout que se adapte al 100% del ancho en móviles, y se centre en pantallas más grandes?
R: Si

- ¿Necesitas algún breakpoint específico o integración con “mobile-first” vs. “desktop-first”?
R: Mobile First

## Estilos y animaciones

Para el “modo oscuro” con tonos pastel en amarillo, rojo y verde, ¿hay algún matiz o saturación en particular que desees conservar?
R: No tengo preferencia

- ¿Consideras útil alguna pequeña transición en el cambio de estado del botón (Start → Pause → Continue)?
R: Si

- ¿Te gustaría un efecto de “parpadeo” o “resaltar” en el registro de la vuelta recién capturada?
R: Si

## Comportamiento de los atajos de teclado

- Al pulsar la barra espaciadora, si el cronómetro está detenido, debe iniciar; si está en marcha, debe pausar; y si está pausado, debe continuar, ¿correcto?
R: Si
-Al presionar “L” (o “l”), se limpia el cronómetro y se borra el historial, ¿verdad?
R: Si
- ¿Deseas un atajo para registrar la “vuelta” o con un botón dentro de la interfaz es suficiente? (Mencionas un atajo para vueltas, quizá la letra “V” o algo similar).
R: la letra v

## Precisión y rendimiento

- ¿Hay alguna preferencia sobre el método de conteo interno? (Por ejemplo, requestAnimationFrame vs. setInterval con una lógica para corregir derivas de tiempo).
R: No tengo preferencia

- Si el cronómetro “corre indefinidamente”, podemos apoyarnos en timestamps (performance.now()) para mantener precisión. ¿Te parece apropiado?
R: Si

## Mensajes o feedback en caso de error

¿Existe algún escenario de error/edge-case que debamos manejar (p. ej., cronómetro ya limpio y se pulsa “Limpiar” otra vez, o se registran vueltas si el cronómetro está detenido)?
R: No se registran vueltas si el cronometro esta detenido, si pulsa limpiar nuevamente no importa

## Leyendas de shortcuts

Añadir leyendas de lo shortcuts en la pantalla
```

## 5ta iteracion ouput

```md
Razonado sobre cronómetro y especificaciones durante 19 segundos

¡Perfecto, Yoberty! Con estas respuestas ya tenemos un panorama muy claro de los requerimientos. En resumen:

- Formato de tiempo: Se mostrará mm:ss:ms hasta que llegue a 60 min (entonces pasamos a hh:mm:ss:ms), pero sin comportamiento especial más allá de eso.
- Historial de vueltas: Hasta 10 registros, donde el onceavo desplaza al primero (FIFO). Debemos persistirlos en localStorage para que permanezcan tras recargar.
- Accesibilidad: Emplear roles y atributos WAI-ARIA adecuados, además de texto oculto (sr-only) describiendo cada botón.
- Diseño:
    - Modo oscuro (Mobile First).
    - Tonos pastel en amarillo, rojo y verde para lo relevante.
    - Pequeña transición en el cambio de estado (Start → Pause → Continue).
    - Efecto de parpadeo al registrar una nueva vuelta.
- Atajos de teclado:
    - Barra espaciadora: iniciar / pausar / continuar.
    - L: limpiar cronómetro e historial.
    - V: registrar vuelta (si el cronómetro está en marcha).
- Leyendas en pantalla: Mostrar claramente los atajos para que el usuario sepa que existen.
- Precisión: Podemos usar performance.now() o un setInterval ajustado para corregir la deriva.
- Comportamiento esperado:
    - No registrar vueltas si el cronómetro está detenido.
    - Al pulsar Limpiar varias veces, simplemente se ignora si ya está en cero.
    - No veo más huecos de especificación: con esto podemos implementar el cronómetro tal como se requiere. Si surge algún detalle adicional mientras codificamos (por ejemplo, qué colores pastel exactos usar o cuánta duración debe tener el parpadeo), podremos ajustarlo sin problema.

¿Queda alguna otra duda o tema pendiente antes de pasar a la implementación? ¡Quedo atento!
```
## 6ta Iteracion Input

Continuemos con la implementacion

## 6ta iteracion ouput
```md
Razonado sobre implementación del cronómetro durante 4 segundos

¡Perfecto, Yoberty! Aquí te comparto una implementación completa, dividida en los tres archivos solicitados: index.html, index.js y styles.css. He agregado comentarios en cada sección para detallar la lógica y cumplir con todas tus especificaciones. Puedes colocar estos archivos dentro de la carpeta stopwatch-YAG/.
```

index.tml
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Cronómetro YAG</title>
  <link rel="stylesheet" href="./styles.css" />
  <!-- Meta viewport para Mobile-First -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body class="dark-bg text-base">
  <!-- Contenedor principal -->
  <main class="container" role="main">
    
    <!-- Título / Encabezado -->
    <header class="header">
      <h1>Cronómetro</h1>
      <p class="shortcuts-info">
        <span>Presiona <strong>Barra espaciadora</strong> para Iniciar / Pausar / Continuar</span> •
        <span>Presiona <strong>L</strong> para Limpiar</span> •
        <span>Presiona <strong>V</strong> para Capturar Vuelta</span>
      </p>
    </header>

    <!-- Display del tiempo -->
    <section class="time-display" aria-live="polite" aria-atomic="true">
      <span id="timer" class="timer" aria-label="Tiempo transcurrido">00:00.000</span>
    </section>

    <!-- Botones de acción -->
    <section class="controls">
      <button id="startPauseBtn" class="btn btn-green" 
        aria-label="Iniciar cronómetro" role="button">
        <span class="sr-only">Iniciar o Pausar cronómetro</span>
        <span id="startPauseText">Iniciar</span>
      </button>

      <button id="lapBtn" class="btn btn-yellow" aria-label="Capturar vuelta" role="button">
        <span class="sr-only">Capturar vuelta</span>
        Vuelta
      </button>

      <button id="clearBtn" class="btn btn-red" aria-label="Limpiar cronómetro" role="button">
        <span class="sr-only">Limpiar cronómetro y restablecer historial</span>
        Limpiar
      </button>
    </section>

    <!-- Listado de vueltas -->
    <section class="laps-section">
      <h2 class="laps-title">Vueltas</h2>
      <ul id="lapsList" class="laps-list" aria-live="polite"></ul>
    </section>

  </main>

  <!-- Script de la lógica del cronómetro -->
  <script src="./index.js"></script>
</body>
</html>
```

index.js

```js
/***********************************************
 * index.js
 * Lógica del Cronómetro
 **********************************************/

// Variables de control
let startTime = 0;         // Timestamp (performance.now()) en el que se inició el cronómetro
let elapsedTime = 0;       // Tiempo total acumulado mientras está pausado
let requestId = null;      // ID de rAF para animar/actualizar
let isRunning = false;     // Estado del cronómetro

// Elementos del DOM
const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const startPauseText = document.getElementById("startPauseText");
const lapBtn = document.getElementById("lapBtn");
const clearBtn = document.getElementById("clearBtn");
const lapsList = document.getElementById("lapsList");

// Límite de vueltas
const MAX_LAPS = 10;

// Almacenamiento en localStorage
// Clave usada para persistir historial de vueltas
const STORAGE_KEY_LAPS = "yag_stopwatch_laps";

// Se cargan las vueltas almacenadas en localStorage
let laps = loadLapsFromLocalStorage();
renderLaps();

// ------------------------------------------------------
// Eventos: Botones
// ------------------------------------------------------

// Iniciar / Pausar / Continuar
startPauseBtn.addEventListener("click", toggleStartPause);

// Capturar vuelta
lapBtn.addEventListener("click", captureLap);

// Limpiar cronómetro
clearBtn.addEventListener("click", clearAll);

// ------------------------------------------------------
// Eventos: Teclado
// ------------------------------------------------------
document.addEventListener("keydown", (e) => {
  // Prevenir scroll con la barra espaciadora, si fuera necesario
  if (e.code === "Space") {
    e.preventDefault();
  }
  
  if (e.code === "Space") {
    toggleStartPause();
  } else if (e.key === "l" || e.key === "L") {
    clearAll();
  } else if (e.key === "v" || e.key === "V") {
    captureLap();
  }
});

// ------------------------------------------------------
// Funciones principales
// ------------------------------------------------------

/**
 * toggleStartPause
 * Cambia el estado del cronómetro:
 * - Si está detenido, iniciar.
 * - Si está en marcha, pausar.
 * - Si está pausado, continuar.
 */
function toggleStartPause() {
  if (!isRunning) {
    // Iniciar / Reanudar
    isRunning = true;
    startTime = performance.now() - elapsedTime;
    requestId = requestAnimationFrame(updateTimer);

    startPauseText.textContent = "Pausar";
    startPauseBtn.setAttribute("aria-label", "Pausar cronómetro");
  } else {
    // Pausar
    isRunning = false;
    elapsedTime = performance.now() - startTime;
    cancelAnimationFrame(requestId);

    startPauseText.textContent = "Continuar";
    startPauseBtn.setAttribute("aria-label", "Continuar cronómetro");
  }
}

/**
 * updateTimer
 * Utiliza requestAnimationFrame para actualizar el display cada frame.
 */
function updateTimer(timestamp) {
  if (!isRunning) return; // protección en caso de desincronización

  const currentTime = performance.now();
  const totalTime = currentTime - startTime;
  displayTime(totalTime);

  // Continuar requestAnimationFrame
  requestId = requestAnimationFrame(updateTimer);
}

/**
 * captureLap
 * Registra una vuelta en el historial, si el cronómetro está activo.
 */
function captureLap() {
  if (!isRunning) {
    // No capturar vueltas si está detenido o pausado
    return;
  }
  
  // El tiempo actual
  const currentTime = performance.now() - startTime;
  const formattedTime = formatTime(currentTime);

  // Insertar al final del array
  laps.push(formattedTime);

  // Controlar el desplazamiento (si excede 10)
  if (laps.length > MAX_LAPS) {
    laps.shift(); // Remueve el primero
  }

  // Persistir
  saveLapsToLocalStorage(laps);

  // Renderizar
  renderLaps(true); // true -> aplicar efecto de parpadeo a la última vuelta
}

/**
 * clearAll
 * Limpia el cronómetro y el historial de vueltas.
 */
function clearAll() {
  // Detener y resetear variables
  isRunning = false;
  cancelAnimationFrame(requestId);
  startPauseText.textContent = "Iniciar";
  startPauseBtn.setAttribute("aria-label", "Iniciar cronómetro");

  // Resetear tiempo
  startTime = 0;
  elapsedTime = 0;
  displayTime(0);

  // Limpiar historial
  laps = [];
  saveLapsToLocalStorage(laps);
  renderLaps();
}

/**
 * displayTime
 * Actualiza el elemento de tiempo con el formato mm:ss.ms
 */
function displayTime(milliseconds) {
  timerDisplay.textContent = formatTime(milliseconds);
}

/**
 * formatTime
 * Devuelve una cadena en formato mm:ss.mmm o hh:mm:ss.mmm
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Si no llega a la hora, se usa mm:ss.mmm
  // Si llega/hay horas, se usa hh:mm:ss.mmm
  if (hours > 0) {
    return (
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + "." +
      String(Math.floor(milliseconds)).padStart(3, "0")
    );
  } else {
    return (
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + "." +
      String(Math.floor(milliseconds)).padStart(3, "0")
    );
  }
}

// ------------------------------------------------------
// Manejo de Laps en la Interfaz
// ------------------------------------------------------

/**
 * renderLaps
 * Vuelca el array de vueltas en la lista <ul>.
 */
function renderLaps(highlightLast = false) {
  lapsList.innerHTML = "";

  laps.forEach((lapTime, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${lapTime}`;
    li.classList.add("lap-item");
    
    // En la última vuelta, opcionalmente aplicamos animación de parpadeo
    if (highlightLast && index === laps.length - 1) {
      li.classList.add("highlight");
      // Remover la clase después de un breve tiempo (para que parpadee solo una vez)
      setTimeout(() => {
        li.classList.remove("highlight");
      }, 1500);
    }

    lapsList.appendChild(li);
  });
}

// ------------------------------------------------------
// localStorage utils
// ------------------------------------------------------
function saveLapsToLocalStorage(lapsArray) {
  localStorage.setItem(STORAGE_KEY_LAPS, JSON.stringify(lapsArray));
}

function loadLapsFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY_LAPS);
  return stored ? JSON.parse(stored) : [];
}
```

styles.css

```css
/***********************************************
 * styles.css
 * Estilos para el Cronómetro (Mobile-First)
 **********************************************/

/* Modo oscuro base */
:root {
  --dark-bg-color: #121212;
  --text-color: #ffffff;
  --pastel-yellow: #fae1a4;
  --pastel-green: #baf8cd;
  --pastel-red: #f7bcb7;
  
  /* Ajuste de tipografía base */
  --font-size-base: 16px;
}

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Texto oculto para lectores de pantalla */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Body principal */
body.dark-bg {
  background-color: var(--dark-bg-color);
  color: var(--text-color);
  font-family: sans-serif;
  font-size: var(--font-size-base);
  line-height: 1.5;
}

/* Contenedor principal (centrado en pantallas grandes, full en móviles) */
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 1rem;
}

.header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Info de shortcuts */
.shortcuts-info {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Display del tiempo */
.time-display {
  text-align: center;
  margin: 1rem 0;
}

.timer {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.05em;
}

/* Sección de botones de control */
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  cursor: pointer;
  font: inherit;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  transition: transform 0.15s ease, background-color 0.3s ease;
}

.btn:hover {
  transform: scale(1.02);
}

/* Colores pastel */
.btn-green {
  background-color: var(--pastel-green);
  color: #000;
}

.btn-red {
  background-color: var(--pastel-red);
  color: #000;
}

.btn-yellow {
  background-color: var(--pastel-yellow);
  color: #000;
}

/* Sección de vueltas */
.laps-section {
  margin-top: 1rem;
}

.laps-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.laps-list {
  list-style: none;
  padding-left: 0;
}

/* Elemento individual de vuelta */
.lap-item {
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Efecto de parpadeo para nueva vuelta */
.highlight {
  animation: highlightFlash 1.5s ease;
}

/* Keyframes para parpadeo */
@keyframes highlightFlash {
  0% { background-color: var(--pastel-yellow); }
  50% { background-color: transparent; }
  100% { background-color: var(--pastel-yellow); }
}
```

```md
## Descripción de estilos

- Mobile-First: El contenedor tiene max-width: 480px, se ve bien en pantallas pequeñas y se centra en pantallas más grandes.
- Modo oscuro: color de fondo #121212 con texto blanco.
- Botones: Pasteles (amarillo, verde, rojo). Se les aplica un hover sutil y una transición para el escalado.
- Animación de parpadeo: Al añadir la clase .highlight, se aplica la animación highlightFlash, que alterna entre el color pastel y transparente.

## Observaciones finales

- LocalStorage:

Se cargan las vueltas en cada carga de la página y se muestran automáticamente.
Si se limpian (botón o tecla “L”), se vacía tanto en la interfaz como en localStorage.

- Accesibilidad:

Uso de aria-label en botones, aria-live en el timer y la lista de vueltas para notificar de cambios.
Uso de sr-only para la descripción interna de cada botón.
Precisión:

- Se emplea performance.now() y requestAnimationFrame.
- Mientras esté en marcha, el cronómetro se actualiza en cada frame, sin depender de intervals que puedan “derivar” en el tiempo.
Shortcuts en la UI:

- Los atajos de teclado (espacio, L, V) están mencionados en el <header>.

Con esto cumplimos los requerimientos de diseño, funcionalidad y accesibilidad. ¡Espero que te sea útil, Yoberty! Cualquier ajuste adicional (colores pastel específicos o transición más larga/corta) se puede modificar fácilmente en el CSS.

¡Éxitos con tu cronómetro!
```