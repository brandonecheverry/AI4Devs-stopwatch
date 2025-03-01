----------------------------
CHATBOT
----------------------------
Claude 3.7 Sonnet
----------------------------
PROMPT #1
----------------------------
#ROLE
You are a Senior Web Development, with high tech skills using HTML, CSS and Javascript. 
#INSTRUCTION
I need a website to show two different stopwatchers that works independently, and they are started by a user: 
* One called "Stopwatch" starting from a value of zero, and increasing during time when the user starts the stopwatch.
* The other called "Countdown", starting from a value of zero, the user can set the timer, and when the user starts the countdown, the stopwatch will decrease during time until the timer is zero.
#CONTEXT
1. Create a solid, clean, recursive and optimized logic for both stopwatchers working to increase and decrease during time following the next features:
## For both stopwatchers
- Consider a structure called "Timer", with integer variables of hours, minutes, seconds, and milliseconds.
- Consider the timer behavior to translate values and restart them:
EG: 1000 milliseconds = 1 second, 60 seconds = 1 minute, 60 minutes = 1 hour.
- Stopwatchers have two variables: Initial Timer and Current Timer.
- Always start the Initial Timer value in zero, means all variables in the structure are equal to zero.
- User can start the current timer, which means the current timer value will change depending on the Timer behavior
- User can pause the current timer.
- User can continue the current timer.
- User can clear the current timer, restarting the current timer value to the initial timer value.
## For "Stopwatch":
- The timer behavior is: Increase. The timer will increase during time.
- The initial timer value by default is zero.
## For "Countdown":
- The timer behavior is: Decrease. The timer will decrease during time.
- The initial timer value by default is zero.
- User can set a new initial timer value, in a new variable called "temp_initialTimerValue", choosing numbers between 0 to 9. - The numbers choosen by the user, are being added from right lo left, starting in the seconds value. Milliseconds are not modifiable.
EJ: If user presses "9" the timer will be set as "00:00:09:000". Then, if user presses "7" the timer will be set as "00:00:97:000". Consider when the two digits of Hours has received a number, user can't choose more digits.
- After choose a digit, user can clear the "temp_initialTimerValue", to set  it again in Zero.
- User can confirm the "temp_initialTimerValue", which means the value set, now is the initial timer value.
- After set the Initial Timer value, the user can use the general functions: start, pause, continue and clear.
2. Create a clean UI for both stopwatchers. Use the image attached just as a reference but create a unique and user friendly UI.
- Consider the Timer structure in format "00:00:00:000". EG: "12:26:38:027" means 12 hours, 26 minutes, 38 seconds and 027 milliseconds.
#FORMAT
I want all the scripts in separated files: index.html, script.js, and style.css. and show me how looks the final result. 

If you have any questions, let me know.
----------------------------
PROMPT #2
----------------------------
We need to fix the way the user set the timer on Countdown. Here are some examples of the behavior I want (all of them starting from temp_InitialValueTimer in Zero): 
1. If User press the sequence: '9'.
Result: Hours = 00, Minutes = 00, Seconds = 09, Milliseconds = 000.
2. If user press the sequence: '9', '3', '1'.
Result: Hours = 00, Minutes = 09, Seconds = 31, Milliseconds = 000.
3. If user press the sequence: '5', '7', '3', '4', '5'.
Result: Hours = 05, Minutes = 73, Seconds = 45, Milliseconds = 000. But considering 60 minutes is 1 hour, when the user set the Initial Timer, it has to translate the values like this: Hours = 06, Minutes = 13, Seconds = 45, Milliseconds = 000.
4. If user press the sequence: '5', '7', '3', '4', '5', '8', '9'.
Result: Hours = 57, Minutes = 34, Seconds = 58, Milliseconds = 000. After choosing 6 numbers, the user can't add more numbers, until they want to clear the temp_initialTimerValue again. 
----------------------------
PROMPT #3
----------------------------
We are going to make UI Changes:
# For both timers
- The Timer structure has format "00:00:00:000". 
EG: "12:26:38:027" means 12 hours, 26 minutes, 38 seconds and 027 milliseconds.
- Create Two General Buttons: One merge Start, Pause and Continue Button in one button. If the timer is in zero user can Start. If the timer is running user can Pause, and if the timer is paused, user can continue.
- The second button will be the Clear button, and only shows when the timer has started.

# For "Countdown"
- While the User hasn't set the initial timer, don't show the general buttons. They are visible only when the Timer has been set.
- During set, If user can't put more numbers, disable the number buttons.
- When the countdown goes to zero after started, play a nice timer alarm sound of 5 seconds and change the color of the Countdown timer text.

Finally, hide the two stopwatches and put two buttons: "Stopwatch" and "Countdown" to show the desired stopwatch. 
After one of them is selected, put a Back Button to go to the stopwatch selection. Use https://www.online-stopwatch.com/ as a reference.