# **WebApp de Cronómetro y Cuenta Atrás**

Este documento proporciona una **guía completa** sobre la aplicación web desarrollada, incluyendo su **funcionalidad, estructura, instrucciones de uso e implementación**.

---

## **📌 Descripción del Proyecto**
Esta es una **aplicación web** que permite al usuario utilizar **un cronómetro** o **una cuenta atrás**, con una interfaz moderna, responsiva y con una opción de **pantalla completa** para mayor visibilidad.

---

## **🚀 Funcionalidades Principales**

### **1️⃣ Pantalla de Selección Inicial**
🔹 Al iniciar la aplicación, el usuario verá una pantalla con **dos botones**:
- **"Cronómetro"**: Accede al módulo de cronómetro.
- **"Cuenta Atrás"**: Accede al módulo de cuenta atrás.

🔹 **Botón Back**: En cualquier momento, el usuario puede regresar a la pantalla de selección utilizando el botón **"Back"**.

---

### **2️⃣ Modo Cronómetro**
✅ **Funcionalidades:**
- **Iniciar**: Comienza la medición del tiempo.
- **Pausar**: Detiene temporalmente el cronómetro.
- **Clear**: Reinicia el cronómetro a `00:00:00.00`.
- **Full Screen (`⛶`)**: Expande el cronómetro a pantalla completa.
- **Salir de Full Screen (`×` o `ESC`)**: Vuelve a la vista normal.
- **Back**: Regresa a la pantalla de selección y reinicia el cronómetro.

✅ **Formato del tiempo:**
- **Horas:Minutos:Segundos.Milisegundos** (`00:00:00.00`).
- **Los milisegundos se actualizan en intervalos de 10 ms** para mayor precisión.

---

### **3️⃣ Modo Cuenta Atrás**
✅ **Funcionalidades:**
- **Teclado Virtual**: Permite ingresar `Horas:Minutos:Segundos` (`HH:MM:SS`).
- **SET**: Confirma el tiempo ingresado y oculta el teclado virtual.
- **Iniciar**: Comienza la cuenta atrás.
- **Pausar**: Detiene temporalmente la cuenta atrás.
- **Clear**: Reinicia la cuenta atrás a `00:00:00.00` y vuelve al teclado virtual.
- **Full Screen (`⛶`)**: Expande la cuenta atrás a pantalla completa.
- **Salir de Full Screen (`×` o `ESC`)**: Vuelve a la vista normal.
- **Back**: Regresa a la pantalla de selección y reinicia la cuenta atrás.

✅ **Sonidos y Efectos:**
- **Últimos 3 segundos**: Se reproduce un sonido de **beep (`beep.mp3`)** y la pantalla **parpadea (`blink`)**.
- **Al llegar a 0**: Se reproduce una **alarma (`alarm.mp3`)** durante **2 segundos** y la cuenta atrás finaliza en `00:00:00.00`.

✅ **Formato del tiempo:**
- **Horas:Minutos:Segundos.Milisegundos** (`00:00:00.00`).
- **Los milisegundos se actualizan en intervalos de 10 ms**.

---

## **📂 Estructura del Proyecto**

```
/mi-proyecto/
│── index.html          # Estructura de la aplicación
│── script.js           # Lógica de funcionalidad
│── styles.css          # Diseño y estilos
│── audio/
│   │── beep.mp3        # Sonido de cuenta atrás en los últimos 3 segundos
│   │── alarm.mp3       # Sonido de alarma cuando la cuenta atrás finaliza
```

---

## **💻 Instrucciones de Instalación y Uso**

### **1️⃣ Requisitos Previos**
📌 Se necesita un navegador moderno como **Google Chrome, Firefox, Edge o Safari**.  
📌 No requiere servidor, funciona **directamente en el navegador**.

---

### **2️⃣ Instrucciones de Uso**

1️⃣ **Descargar o clonar el proyecto**
```bash
git clone https://github.com/usuario/mi-proyecto.git
cd mi-proyecto
```

2️⃣ **Abrir el archivo `index.html`** en un navegador
- Doble clic en `index.html` o
- Ejecutar en terminal:
  ```bash
  open index.html   # Para macOS
  start index.html  # Para Windows
  ```

---

## **🛠 Tecnologías Utilizadas**
- **HTML5**: Estructura de la aplicación.
- **CSS3**: Estilos y diseño responsivo con efectos visuales.
- **JavaScript (ES6+)**: Lógica de funcionalidad, cronómetro, cuenta atrás y pantalla completa.

---

## **📜 Documentación Técnica**

### **📌 1️⃣ `index.html` (Estructura HTML principal)**
Define la interfaz de usuario con tres secciones principales:
- **Pantalla de selección inicial**
- **Pantalla de cronómetro**
- **Pantalla de cuenta atrás con teclado numérico virtual**

### **📌 2️⃣ `styles.css` (Estilos y diseño visual)**
📌 Diseño futurista con colores oscuros y acentos tecnológicos.  
📌 Botones con efectos de hover y presión.  
📌 Adaptación responsiva para dispositivos móviles.  
📌 Estilos específicos para pantalla completa.  

### **📌 3️⃣ `script.js` (Lógica y funcionalidad)**
📌 **Cronómetro y cuenta atrás con milisegundos**.  
📌 **Pantalla completa (`⛶`) y salida (`×` o `ESC`)**.  
📌 **Gestión del botón `Back` en todas las pantallas**.  
📌 **Parpadeo (`blink`) y sonidos (`beep.mp3` y `alarm.mp3`) en la cuenta atrás**.  

---

## **🛠 Mejoras Futuras**
✨ **Añadir opción para personalizar los sonidos**.  
✨ **Guardar la última configuración ingresada en el localStorage**.  
✨ **Diseño adaptable a más tamaños de pantalla con mejor accesibilidad**.  

---

## **📝 Contribuciones**
¡Las contribuciones son bienvenidas! Para colaborar:
1️⃣ **Fork** el repositorio  
2️⃣ Crea una nueva rama: `git checkout -b mi-mejora`  
3️⃣ Realiza los cambios y haz un **commit**  
4️⃣ Envía un **pull request** 🚀  

---

## **📄 Licencia**
📌 Este proyecto está bajo la **Licencia MIT**. Puedes usarlo, modificarlo y compartirlo libremente.
