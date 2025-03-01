Take on a rol of an experienced web engineer specialized in HTM, css, javascript to build the following project:

# stopwatch and countdown

I want you to build a stopwatch and a countdown. Use this link as reference.

https://www.online-stopwatch.com/

## Pages

- On the index page (index.html) it should be two options:
  - Stopwatch
    - It should has an image like a gree up arrow
  - Countdown
    - It should has an image like a red down arrow
- On hover change the background color to some color vissually attractive
- Both options should be on the index page, centered
- The user can select any option by clicking on them
- Make it elegant and apply the UX/UI best practices

## Functionality

- Once the users land on the index page, they can select any of those options.
- If they select Stopwatch display the stopwatch app
- If they select Countdown display the countdown app

### Stopwatch

- If the users select Stopwatch include a left animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input displays the time
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a right animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

### Countdown

- If the users select Stopwatch include a right animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be ten buttons from 0 to 1 as well as two buttons Set and Clear
- The users must set the time where the count down will start and update the intup accordingly
- Once the Set button is clicked, the app should display two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input is updated
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a left animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

## Output

- I want you to build an index.html
- Update the title accordingly
- I want you to include a script.js with all the functionality inside
- I want you to include a styles.css file with all the applied css rules or you can include tailwind in this project. Apply the best standards/practices
- Inlude a favicon which represents this app the best

Here is the index.html

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

Example:
Take a look at the image above

# stopwatch and countdown

I want you to build a stopwatch and a countdown. Use this link as reference.

https://www.online-stopwatch.com/

## Page

- Make it look professional.
- On the index page (index.html) it should be two options:
  - Stopwatch
    - It should has an image or an Icon (Fontawesome or similar) like a green up arrow
  - Countdown
    - It should has an image or an Icon (Fontawesome or similar) like a red down arrow
- On hover change the background color to some color visually attractive
- Both options should be on the index page, centered, within a container give it a shadow, rounded borders.
- The user can select any option by clicking on them
- Make it elegant and apply the UX/UI best practices
- Make it all in 1 html file

## Functionality

- Once the users land on the index page, they can select any of those options.
- If they select Stopwatch display the stopwatch app
- If they select Countdown display the countdown app

### Stopwatch

- If the users select Stopwatch include a left animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input displays the time
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a right animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

### Countdown

- If the users select Stopwatch include a right animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be ten buttons from 0 to 1 as well as two buttons Set and Clear
- The users must set the time where the count down will start and update the intup accordingly
- Once the Set button is clicked, the app should display two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input is updated
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a left animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

## Output

- I want you to build an index.html
- Update the title accordingly
- I want you to include a script.js with all the functionality inside
- I want you to include a styles.css file with all the applied css rules or you can include tailwind in this project. Apply the best standards/practices
- Inlude a favicon which represents this app the best

## Initial index.html

Here is the index.html

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

## Example:

Take a look at the image above

Prompt 3
Let's make some adjustments:

1. At the begining make the container bigger
2. Instead of having two buttons make like two frames at the same level, you can include a grid system with two columns for instance. Leave the buttons on each column accordingly but make them more visually attractive, more professional
3. On the Stopwatch, Include like a title, something that indicates I am inside that option, again make it bigger, make them more visually attractive, more professional. Also, The input is larger than the container, causing it to spill out of the container. Fix it! and finally improve the `Back` link
4. On the Countdown, Include like a title, something that indicates I am inside that option, again make it bigger, make them more visually attractive, more professional. Also, The input is larger than the container, causing it to spill out of the container. Fix it! Improve the `Back` link. Improve the `Start`/`Pause` and `Clear` buttons and finally make the 0-9 buttons better, you can include a grid system of 10 columns and leave 1 button each.
5. There is a bug on the Countdown. When I click start, without clicking in any number, I see an alert with this message: "Countdown finished!" and the input displays this text `0-1:0-1:0-1` Fix it!
6. Give me the updated version, the whole html, css and js, the complete files.

Prompt 4:
Let's make more adjustments:

1. The input in all of the apps are bigger than the container, **they must be inside of it**.
2. Replicate the same style of the `Stopwatch` and `Countdown` bottons in **every app**, so the `Start`/`Pause` and `Clear` buttons should look the same as the `Stopwatch` and `Countdown` buttons.
3. On the `Countdown`, the buttons from 0-9 make the text inside them centered, improve their look and feel, they are well alligned just make them **more visually attractive**. Improve the `Back` link. Make it look like a link and when the user clicks on it add a right to left animation and show the main page.
4. When the user clicks on the `Stopwatch` add an animation like a left to right animation and display the `Stopwatch` app
5. When the user clicks on the `Countdown` add an animation like a right to left animation and display the `Countdown` app
6. On the `Stopwatch`, **improve the `Back` link**. Make it look like a link and when the user clicks on it add a left to right animation and show the main page.
7. Give me the updated version, the whole html, css and js, the complete files.

Prompt 5:
Let's rollback the last changes and apply these:

1. The input in all of the apps are bigger than the container, they must be inside of it.
2. Give me the updated version, the whole html, css and js, the complete files.

Propmt 6 - Claude 3.7

# stopwatch and countdown

I want you to build a stopwatch and a countdown. Use this link as reference.

https://www.online-stopwatch.com/

## Page

- Make it look professional.
- On the index page (index.html) it should be two options:
  - Stopwatch
    - It should has an image or an Icon (Fontawesome or similar) like a green up arrow
  - Countdown
    - It should has an image or an Icon (Fontawesome or similar) like a red down arrow
- On hover change the background color to some color visually attractive
- Both options should be on the index page, centered, within a container give it a shadow, rounded borders.
- The user can select any option by clicking on them
- Make it elegant and apply the UX/UI best practices
- Make it all in 1 html file

## Functionality

- Once the users land on the index page, they can select any of those options.
- If they select Stopwatch display the stopwatch app
- If they select Countdown display the countdown app

### Stopwatch

- If the users select Stopwatch include a left animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input displays the time
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a right animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

### Countdown

- If the users select Stopwatch include a right animation and display the app
- Diplay an input with this text at the begining 00:00:00
- The font size should be big
- Below the input it should be ten buttons from 0 to 1 as well as two buttons Set and Clear
- The users must set the time where the count down will start and update the intup accordingly
- Once the Set button is clicked, the app should display two buttons
  - Start (green)
    - If the user clicks on it, the time starts to run and the input is updated
    - It changes its text to Pause when the time is running
      - It should change the color to blue
      - If users clicks this button at this point the time will be paused and the text should be Continue
    - Include a back link to go to the main with a left animation
  - Clear (red)
    - If the users click on it, everything starts from the begining

## Output

- I want you to build an index.html
- Update the title accordingly
- I want you to include a script.js with all the functionality inside
- I want you to include a styles.css file with all the applied css rules or you can include tailwind in this project. Apply the best standards/practices
- Inlude a favicon which represents this app the best

## Initial index.html

Here is the index.html

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

## Example:

Take a look at the attached image

Prompt 7:
Let's make some adjustments:

1. On the `Countdown` app do not hide the buttons and center the `Set` and `Clear` buttons. Also, add a subtitle which indicates the user is in this app.
2. On the `Stopwatch` app add a subtitle which indicates the user is in this app.
3. Take on the role of a Sr Software Engineer and refactor this code.
4. Give me the whole updated file(s)

Prompt 8:
Let's do one last change:
On the `Countdown` app hide the `Start` and `Clear` buttons until the `Set` button is clicked and hide the `Set` and `Clear` buttons accordingly. Don't forget to display them back again when the `Clear` button is clicked. Finally, Give me the whole updated file(s)
