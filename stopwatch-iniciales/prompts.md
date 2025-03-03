> Iteración 1.

# Stopwatch
## Requisitos previos
Eres un programador web experto en html, javascript y css con experiencia en maquetación. Ten en cuenta buenas prácticas, principios SOLID, arquitectura BEM y principios de usabilidad. 


## Requisitios técnicos. 

- Debes generar un fichero html y un fichero javascript teniendo en cuenta las siguientes plantilla html.

```
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

- Los estilos css agregalos en el fichero html. 

## Requisitos funcionales.
- Definir un cronómetro que pueda ser ascendente o descendente. 
- Se debe permitir pausar y coninuar el cronómetro. 
- Siempre se podrá elegir que tipo de cronómetro se quiere utilizar. 
### Ascendente. 
- Se debe permitir limpiar y, por lo tanto, parar el cronómetro.
- Mostrar las horas, minutos, segundos y milisegundos del cronómetro.  
### Descendente. 
- Se debe indicar el tiempo que se se quiere definir. 
- El tiempo se puede definir el horas, minutos y segundos. 
- Una vez elegido hay que pulsar un botón para establecer el tiempo. 
- Agregar botón para limpiar el tiempo. 
- Cuando esté configurado el tiempo se dispondrá del botón aceptar y limpiar. 



> Iteraccion 2

Deber seguir la siguiente validaciones para los datos
- El mayor número que se puede introducir en horas, minutos y segundos es 59. 
- La validacion la debes hacer tanto en html como en javascript.
- El botón de Start se debe deshabilitar si el cronómetro está funcionando. 
- El botón de Pause se debe deshabilitar si el cronómetro está pausado. 
- El botón de Reset se debe deshabilitar si el cronómetro está a 0. 


> Iteracción 3. 

- El botón de Pause tiene que estar activado mientra el cronómetro está funcionando y deshabilitado mientra está parado. 