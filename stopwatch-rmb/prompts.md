** ChatGPT 4o **

**Prompt 1**
Eres un desarrollador fullstack con más de 10 años de expriencia.

Tenemos un nuevo proyecto muy emocionante con *dos funciones*:
- cronómetro
- cuenta atrás

El proyecto a nivel de estructura tiene que tener 2 ficheros:
- index.html
- script.js

El lenguaje de la interfaz tiene que ser ingles.

A nivel de diseño te adjunto una imagen para que veas como tiene que ser.

También para que veas un ejemplo te adjunto el siguiente recurso: https://www.online-stopwatch.com/

Recuerda utilitzar buenas prácticas de código, buenas prácticas de seguridad OWASP.

Si tienes alguna duda por favor pregúntamelo.

**Prompt 2**

1. ahora sí que te lo adjunto
2. En dos pestañas. Evidentemente quiero que haya un sonido cuando termine.
3. Sí el usuario tiene que poder ingresar un tiempo personalizado.
A nivel de tiempos predefinidos me parece bien tus ejemplos.
4. Sí
5. Sí

**Prompt 3**
Veo que no has generado el style.css


**Prompt 4**

La interfaz del input del countdown no funciona


**Prompt 5**
no me has facilitado el fichero mp3


**Prompt 6**
puedes hacer la introduccion del cuntdown como en el ejemplo de la web que te he pasado? sin preseleccion de tiempo.


**Prompt 7**
y el html?


**Prompt 8**
en el html, en la parte de countdown hay dos inputs. Además no estás haciendo caso del ejemplo. En el ejemplo que te he pasado hay un *teclado numerico en pantalla* para poder introducir los números


**Prompt 9**
me enseñas el js?


**Prompt 10**
de la pestaña de countdown, solo funciona cuando clicas 1 vez. Luego ya no funciona.


**Prompt 11**
seguimos con el mismo problema. Te cuento:
1. Clico countdown
2. Cualquier tecla numerica. Va bien. Lo pone en el display.
3. Clico cualquier otra tecla numerica y ya no la pone en el display de arriba.

Lo puedes arreglar?


**Prompt 12**
sigue sin funcionar.

En el js hay un error:
countdownInputValue.length < 6

esta condicion solo se cumple la primera vez. Luego siempre tiene longuitd 6 ya que haces esto en las siguientes lineas:
countdownInputValue = countdownInputValue.padStart(6, "0");


Va lo arreglas?


**Prompt 13**
mas errores:
- al hacer clear no para la alarma si esta sonando.
- al utiltizar el boton de pausa, luego no puedes decirle que continue.


**Prompt 14**
Ok, me sirve. Un detalle, si el boton start luego sirve para continuar, cuando este pausado el botón "start" tendria que cambiar el literal a "continue".


**Prompt 15**
el botón de continue solo tiene que aparecer cunado se haya pulsado el botón de pausa.


**Prompt 16**
el boton de pause tendria que estar oculto hasta que se empiece en ambas pantallas

