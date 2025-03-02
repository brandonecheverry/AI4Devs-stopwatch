Chat: Claude 3.7 Sonnet

Upload files tela-inicial.png, countdown.png and stopwatch.png
Prompt:

Persona
As a specialist in web development.

Context
I want to create a web system for a stopwatch and countdown, respecting the layout of the uploaded PNG images, best practices in web development. The file structure should be index.html, styles.css, and script.js.

Initial Screen
The image tela-inicial.png represents the initial screen of the system, where there are two buttons.
When clicking on the green arrow, the system should display a screen with the same layout as the image stopwatch.png.
When clicking on the red arrow, the system should display a screen with the same layout as the image countdown.png.

Countdown Page
Layout
The countdown screen (which should display a screen with the same layout as the image countdown.png) will have, at the top, a timer with a gray background showing hours, minutes, seconds, and hundredths of a second.
The countdown screen will have 10 buttons (0 to 9) in green.
The countdown screen will have a "Set" button.
The countdown screen will have a "Clear" button.

Countdown Screen Behavior
When clicking the number buttons (0 to 9), the system should fill in the timer information from left to right.
When clicking "Clear", the system should reset the timer.
When clicking "Set", the system should navigate to the stopwatch screen with the information already filled in from the countdown screen.
When clicking "Start" on the stopwatch screen, the timer should run in countdown (regressive) mode.

Stopwatch Page
Layout
The stopwatch screen (which should display a screen with the same layout as the image stopwatch.png) will have, at the top, a timer with a gray background showing hours, minutes, seconds, and hundredths of a second.
The stopwatch screen will have a "Start" button.
The stopwatch screen will have a "Clear" button.

Stopwatch Screen Behavior
When clicking "Start", the system should start the timer.
When clicking "Clear", the system should stop the timer and reset it.
When the stopwatch page is accessed from the initial screen (via the green arrow), upon clicking "Start", the timer should run in progressive mode.

Prompt 2:
Adjust behaviors:
Always when clicking on the clear button the stopwatch must be zeroed
Whenever you click on Start, click on Pause and click on Start again the stopwatch should continue from where it left off
When the timer runs on countdown (regressive), after clicking the Clear button and clicking Start the system needs to leave the timer zeroed