# IA utilizada: v0 (Vercel) - https://v0.dev/

# Prompt:

```markdown
# Stopwatch

Actúa como un experto desarrollador front-end especializado en JavaScript. Tengo un proyecto que consta de dos ficheros:

## 1. index.html

Este fichero debe incluir la interfaz completa para un cronómetro (timer) y una cuenta atrás (countdown). La interfaz debe estar diseñada con **TailwindCSS** para que sea visualmente atractiva e inspirarse en el estilo y funcionalidades del sitio [online-stopwatch.com](https://www.online-stopwatch.com/).

La estructura base del fichero HTML debe ser la siguiente:

```html
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
```

## 2. script.js

Este fichero debe contener toda la funcionalidad en JavaScript para que:

- El cronómetro cuente hacia adelante.
- La cuenta atrás funcione de forma regresiva.
- El código debe estar dividido en funciones claramente definidas (por ejemplo, funciones para iniciar, detener y reiniciar cada funcionalidad) e incluir comentarios explicativos para facilitar la comprensión.

# Requisitos Generales

- Modularidad: La solución debe estar dividida en funciones bien definidas y modularizadas.
- Estética: Utiliza TailwindCSS en el fichero index.html para lograr una interfaz visualmente atractiva.
- Comentarios: Incluye comentarios en el código para explicar las funcionalidades.
- Formato de Salida: La salida final debe consistir únicamente en el contenido completo de ambos ficheros (index.html y script.js), sin explicaciones adicionales.
```