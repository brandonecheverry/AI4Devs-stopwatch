##Stopwatch and Countdown

###Chatbot used
ChatGPT-4

###Prompts
####Prompt 1
You are an expert software developer. I need a web in javascript and html to do a **stopwatch and countdown**. You can do with an interface like de image I show you. 
* You can see a reference for this in the example: [https://www.online-stopwatch.com/](https://www.online-stopwatch.com/) 
* The files must be separated in html, js and css

####Prompt 2
Give me the three files separately

###Prompt 3
**Functionall Requirements**
1. It should have the title: "Stopwatch" by default. 
2. If the user check the Countdown Mode, it must change the title to: "Countdown"
3. In the Stopwatch mode, the button Start must be green, and the button Reset must been Red and change the name to Clear
4. In the stopwatch mode, if the users click the Pause button, the name of the button must change to Continue, and the button must be blue

**Look and Feel requirements**
1. It must be more colored
2. Show the time in a box, with a light color background
3. Add border to time box and buttons
4. Add milliseconds to time
5. Do this like an expert frontend

**Arquitecture and best practices**
1. Make sure it's responsive 

####Prompt 4 
show mi the three files separately
<!-- No sé por qué no me mostraba los archivos separados -->

####Prompt 5
* The buttons must have a fixed with, and the same with, aligned with the time box, and with some space between them
* The design of all the application must be bigger: the texts and buttons, and the time. The text color of buttons must be black
* You can add some effect in the app
* When is active the countdown mode, the user can input directly the time into the time box, and the app must only let him to edit the hours data, the minutes data, and the seconds data. The ":" separators must be fixed. The milliseconds must desapear

####Prompt 6
I will show you more design settings:
1. Change the background color of the page to light grey
2. Make the time box wider until it fits all the content, also in stopwatch mode
3. Delete the container effect, and keep the effect of the buttons

####Prompt 7
* Put a container with a light border in black color, to contain the functionallity
* The background of the page must be white

####Prompt 8
* When is checked the countdown mode:
1. Put focus in time box
2. Add a time validate to the time input
3. Disable start button until the user indicates a valid time

####Prompt 9
For the countdown mode, mantain the "00:00:00" format, and let the user overwrite the time input. When one part get focus (hours, minutes, seconds), when the user inputs something, overwrite the contect, like a time input type

####Prompt 10
Let's do some functional changes:
1. The time box is not editable
2. The time of countdown mode must be indicated by a time input near the countdown check: the user can indicates hours, minutes and seconds with this format: "00:00:00"
3. The time bos in the stopwatch mode must include milliseconds

####Prompt 11
* The stopwatch mode must be the option by default, so the start button must be enabled
* The time input for the countdown mode must be hidden until countdown mode is active
* The start button for the countdown mode must be disabled until the user indicates a time value in the time input
* You can add a favicon for the app

###Prompt 12
* when the countdown time box has finished, so it's "00:00:00", the button Pause must change to Start so the user can start again the countdown
* A soft sound should sound when the countdown ends.

###Prompt 13
Use this audio file for the countdown end alarm
<!-- He añadido el mp3 a chatGPT -->


####Prompt 14
* In  countdown mode, the button Clear should be STOP
* When user click stop button y countdown mode, the countdown timer should pause, and if time doesn´t finish, the button Start should change to Continue
* Only when time has finished in countdown mode, the input to determine time, returns to initial value: "00:00:00", and the button Start is diabled again 

####Prompt 15
There are things that have stopped working. This error is displayed in the console about the file script.js: Uncaught TypeError: resetStopBtn is null
<!-- Había un error: en el js estaba haciendo referencia a un elemento con id resetStop, que no existe. He cambiado el id de ese elemento para que se llame así -->

####Prompt 16
The input type time must only support hours, minutes, and seconds format according to this pattern: "00:00:00". That is, "00:65:78" is not valid.


####Propmp 17
when validation input time is not correct, show a message to indicate the error type

####promp 18
Change the error message to: "Invalid format! Use hh:mm:ss (23:59:59)"

####prompt 19
I want to create a readme file with instrucions of use in english and spanish. this file is accesible through an info icon, in the top right corner of the container element, and this file should open in a new window

####Prompt 20
In the readme file, title should hacve center aligment, but the rest of content should be left aligment


<!-- Creo que he usado demasiados prompts -->
<!-- Ha habido un momento en el he tenido un error y no he sabido volver a la versión anterior en chatGPT, porque no se me cargaba, así que le he dicho que tome de referencia los archivos tal y como los tenía yo guardados con la versión buena -->




