# Prompts

*Using ChatGPT with o3-mini-high after trying and failing with Claude (ran out of tokens) and Mistral (not good enough)*

## Prompt 1

From the point of view of an accomplished web developer, please describe what you see in the design sketch I've given you.

## Prompt 2

Your analysis is on point and mostly correct! Let me add a few points:

* The design is meant to be compact, always the same size, so in a bigger window, it should be centred vertically and horisontally.  Apart from that, there's probably no need for responsive design.
* The whole app fits between the blue bar on top and the blue bar at the bottom.  The distance between the top and bottom bars is always the same.
* The buttons on the timer setup page are just digits, not quick-select options. To get 3 minutes, the user presses 3, 0, 0 and Set.
* This is a pure client-side app with no backend integration.

You are a brilliant web developper.  Your task now is to develop a simple one-page application with a stopwatch and a timer that works and looks like the one you've seen in the screenshots.

I'll add a few requirements:

* Instead of "www.online-stopwatch.com" in the head, use "David's Funky Timers".
* I want an SPA.
* Plain stopwatch without lap functionality.
* The timer uses HH:MM:SS.
* Invalid input should be converted to valid. E.g. 1:90 (one minute, 90 seconds) should be converted to 2:30 when the user clicks Set.
* The Set button should have no effect until the timer shows something > 0 seconds.
* I want an alarm to play when the timer reaches 0, something like the sound of a traditional kitchen timer would be nice. Can you supply a resource or do you want me to provide something? If so, what would be a good format?
* No animations, but I want the buttons on the start page to look similar to the design sketch.
* No visual feedback except the milliseconds.
* The milliseconds should display beneath, not after, the seconds.

Before you proceed, think through how the app would work and ask me questions about anything you think is unclear.  Once you're done with that, summarise your task as you see it, and let me say yes or no before you proceed.


## Prompt 3, answering questions from ChatGPT:

Your summary is correct. Answering your questions, and then some:

**Q:** Do you have a preferred fixed width/height for the main app container? Or should I just pick something that looks close to your sketch and center it horizontally/vertically?
**A:** Something close to the sketch is good enough.
**Q:** You mentioned “1:90” should become “2:30.” What if the user enters something like “100:70:70” (100 hours, 70 minutes, 70 seconds)? Should the app interpret that as 101 hours, 11 minutes, 10 seconds?
**A:** The user can only enter up to six digits. Anything after that should be ignored. But if they do enter 99:99:99 (which is the maximum) that should be converted to 100:40:39.  I.e., we can display up to seven digits.
**Q:** The sketch shows digit buttons. Do you envision a numeric keypad (digits 0–9) plus a backspace/clear button, or just digits + a separate “Clear” button?
**A:** I want the digits 0-9 laid out as in the sketch.
**Q:** After typing HH:MM:SS, pressing “Set” will finalize the value. Correct?
**A:** Correct. Pressing Set switches from setup mode to run mode.
**Q:** Should the alarm loop indefinitely until the user presses a button, or just play once?
**A:** It should play for 15 seconds.
**Q:** Do you want a “Stop Alarm” or “OK” button that appears when time is up?
**A:** Pressing either of the existing buttons should stop the alarm.
**Q:** For the alarm sound resource, do you want to provide the file, or shall I embed a short beep/kitchen-timer sound from a public-domain source?
**A:** Please find something for me.
**Q:** Preferred file format? (e.g., .mp3 or .ogg are common for web use.)
**A:** No preference.
**Q:** Should the user be able to return to the main “Start” page (the two big buttons: Stopwatch / Countdown) once they’ve started the stopwatch or the timer? If so, do you want a “Back” button on each screen?
**A:** Yes, a Back button in the bottom blue bar, like in the sketch.
**Q:** If the user refreshes the page, should the stopwatch/timer keep running from the same state, or is it okay to reset?
**A:** It's OK to reset.
**Q:** For the stopwatch, do you want the main time as HH:MM:SS on one line and the milliseconds (e.g., “.123”) directly underneath in smaller text?
**A:** Yes.
**Q:** Should the milliseconds update in real-time (e.g., 60fps or so), or is a less frequent update acceptable (like every 50–100 ms) to reduce CPU usage?
**A:** In real time.
**Q:** Any color preferences for the top/bottom blue bars, the backgrounds, or button colors beyond matching the general layout in your sketch?
**A:** I want it to match the sketch as closely as possible. On that note, if the user pauses the stopwatch or the timer, the start/stop button should change its text to "Continue" and its colour to blue.
**Q:** Do you want the same “green arrow” and “red arrow” icons on the landing page, or is a text-based button with color enough?
**A:** I want the arrows in green and red.
**Q:** Is plain HTML/CSS/JavaScript (no frameworks) acceptable, or do you have a preference for something like React/Vue/Angular?
**A:** Plain HTML and JS, and use Tailwind (link from some CDN).
**Q:** For the stopwatch, do we just have “Start,” “Pause,” and “Clear” (which resets to 0)?
**A:** When paused, the start/stop button displays "Continue" on a blue background.
**Q:** For the timer, do we have “Start,” “Pause,” and “Reset” (which sets it back to the previously set value) and also “Clear” (which sets it to 0:00:00)?
**A:** The timer has two buttons, Start and Clear. Start changes to Stop when started, and to Continue (on blue background) when stopped. The Clear button stops the timer and restores the previously set value. If the user wants to set a new value, they will have to press Back and then select Timer again.

### Output

I want you to generate HTML, CSS and JS in separate files.

1. As a matter of standardisation, we use Tailwind CSS.  Any custom CSS goes in `styles.css`.
2. All JS goes in `script.js`.  We don't use any JS libraries.
3. The HTML goes in `index.html`, which should reference the custom CSS and JS files, and also Tailwind from a CDN.

## Prompt 4

Thanks, we're off to a great start. Let's add some tweaks:

* Lay out the buttons for initialising the timer like this:
    5 6 7 8 9 Set
    0 1 2 3 4 Clear
* Don't mess with the user input until they click "Set". So if they enter 9, 9, 9, the clock should read 00:09:99, and only when they click Set should it change to 00:10:39.
* Make the "Back" button left-aligned rather than centred.
* Make the start/stop/continue button a fixed size so that the Clear button doesn't move around.
* Format the milliseconds flush right under the seconds, and a bit closer to the line before.
* Add milliseconds to the timer too, with the same layout.

## Prompt 5

A few more tweaks:

* Please use `<img src="up-green.png" alt="Stopwatch" class="w-32 h-32 mb-2">` for the green arrow and `<img src="down-red.png" alt="Stopwatch" class="w-32 h-32 mb-2">` for the red one.
* Right-align the milliseconds with the right margin of the row above.
* Make the milliseconds update in real time for the timer too. Currently they update every 0.1 seconds.
* Give all buttons a 2px black border with rounded corners.
* Make the digit buttons green.
* Use `https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3` for the alarm sound.
* Make the milliseconds smaller, like 1/4 the height of the other numbers.

## Prompt 6

A few more tweaks:

* The size of the milliseconds is good now, but they need to go right under the seconds, not under and far to the right as they do now.
* Remove the borders from the buttons on the start page.
* Make the borders of the other buttons thicker, and define the thickness in the CSS file so that I can tweak it, not in the HTML file.
* Add an animation so that when the user selects Stopwatch, the buttons slide out towards the bottom and the stopwatch page slides in from above to replace it.  Do the reverse for when the user selects Countdown.
* When the user clicks Back, make an animation so that the buttons slide in from the left.
* Don't show the Back button on the home page since there is nowhere to go back from there.

## Prompt 7

A few more tweaks:

* Set button borders to 3px.
* Removing the Back button on the home page made the bottom bar collapse. Make it as big as before, but without the button.
* There is a lot of blank space between the blue header and the content, and between the content and the blue footer. Shrink that space to the height of the header.
