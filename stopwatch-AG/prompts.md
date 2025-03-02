# PROMPT 1

## **Role**

    You are an expert HTML, CSS, and JavaScript developer.
    You are capable of implementing OWASP security guidelines of this project described in the /stopwatch-AG/owasp.md file  and implementthe best practices described in the /stopwatch-AG/development-guidelines.md file.

---

## **Folder Structure**

    stopwatch-AG/
    ├── index.html # Homepage with stopwatch and countdown functionalities
    ├── styles.css # All CSS styles
    ├── script.js # All JavaScript logic
    └── images/ # Folder containing images
        ├── stopwatch.png # Stopwatch image
        └── countdown.png # Countdown image

---

## **Objective**

    The goal is to create a ** web application** that includes:

    1. A **homepage** that allows users to navigate between the two functionalities.
    2. A **stopwatch**
    3. A **countdown

---

## **Homepage**

    The homepage (`index.html`) should display two centered images with their respective titles:

    - **Stopwatch**: Image located at `./images/stopwatch.png` with the h1 "Stopwatch".
    - **Countdown**: Image located at `./images/countdown.png` with the h1 "Countdown".


    ### **Behavior**

        - When a user clicks on either image:
        - Hide the homepage section.
        - Show the corresponding functionality section (stopwatch or countdown) with a **smooth transition effect of 0.5 seconds**.
        - Each functionality section should have a **back button** in the bottom left corner.
        - When clicked, it should: Hide the current section and Show the homepage again.

    ---

## **Stopwatch Functionality**

    ### **Default State**

    - The stopwatch displays `00:00:00.000` (hours:minutes:seconds.milliseconds).

    ### **Buttons and Behavior**

    1. **Start Button**:
        - When clicked, the stopwatch starts counting.
        - The button text changes to **"Pause"** (color: green).
    2. **Pause Button**:
        - When clicked, the stopwatch stops counting.
        - The button text changes to **"Continue"** (color: blue).
    3. **Continue Button**:
        - When clicked, the stopwatch resumes counting.
        - The button text changes back to **"Pause"** (color: green).
    4. **Clear Button**:
        - When clicked, the stopwatch resets to `00:00:00.000`.
        - The button color is red.

    Please follow the screenshot iamge layout for style font and colors
    /res/stopwatch.png

---

## **Countdown Functionality**

    - TO DO

---

## **UI Description**

        - All functionality (homepage, stopwatch, and countdown) should be implemented within `index.html`.
        - Use JavaScript to dynamically show/hide sections.
        - Please use flex align-items center justify-content center for the homepage images and text alignment
        - The design must be **responsive**
        - Use **smooth transitions** when switching between sections.
        - Place a back button in the **bottom left corner** of each functionality section in another row
        - The back button should return the user to the homepage.
        - The button start is green
        - The button pause is green
        - the button continue is blue
        - the button clear is red

---

## **Development Interaction**

    1. **Step-by-Step Approach**:
        - We will implement the **stopwatch first**, and once approved, we will move on to the **countdown**.
    2. **Feedback and Approval**:
        - For each subtask, present your proposal, explain your reasoning, and wait for my feedback.
        - Do not proceed to the next task without my confirmation.
    3. **Clarifications**:
        - If you need more information or clarification or you have any doubts, ask before proceeding.

# Stopwatch and Countdown Timer web application

## **Role**

    You are an expert HTML, CSS, and JavaScript developer.
    You are capable of implementing OWASP security guidelines of this project described in the /stopwatch-AG/owasp.md file  and implementthe best practices described in the /stopwatch-AG/development-guidelines.md file.

---

## **Folder Structure**

    stopwatch-AG/
    ├── index.html # Homepage with stopwatch and countdown sections
    ├── styles.css # All CSS styles
    ├── script.js # All JavaScript logic
    └── images/
        ├── stopwatch.png # Stopwatch image
        └── countdown.png # Countdown image

---

## **Objective**

    The goal is to create a **web application** that includes:

    1. A **homepage** that allows users to navigate between the two functionalities.
    2. A **stopwatch**
    3. A **countdown

---

## **Homepage**

    The homepage (`index.html`) should display two  mages with their respective titles

    - **Stopwatch**: Image located at `./images/stopwatch.png` with the h1 "Stopwatch".
    - **Countdown**: Image located at `./images/countdown.png` with the h1 "Countdown".

    The images and titles must be arranged horizontally, side by side, use display: flex with  justify-content: center;


    ### **Behavior**

        - When a user clicks on either image:
        - Hide the homepage section.
        - Show the corresponding functionality section (stopwatch or countdown) with a **smooth transition effect of 0.5 seconds**.
        - Each functionality section should have a **back button** in the bottom left corner.
        - When clicked, it should: Hide the current section and Show the homepage again.

    ---

## **Stopwatch Functionality**

    ### **Default State**

    - The stopwatch displays `00:00:00.000` (hours:minutes:seconds.milliseconds).

    ### **Buttons and Behavior**

    1. **Start Button**:
        - When clicked, the stopwatch starts counting.
        - The button text changes to **"Pause"** (color: green).
    2. **Pause Button**:
        - When clicked, the stopwatch stops counting.
        - The button text changes to **"Continue"** (color: blue).
    3. **Continue Button**:
        - When clicked, the stopwatch resumes counting.
        - The button text changes back to **"Pause"** (color: green).
    4. **Clear Button**:
        - When clicked, the stopwatch resets to `00:00:00.000`.
        - The button color is red.

    Please follow the screenshot iamge layout for style font and colors
    /res/stopwatch.png

---

## **Countdown Functionality**

    The countdown functionality is designed to mirror the stopwatch session in terms of layout, buttons, font, and color. However, it includes a preceding step where the user sets the time, and of course the countdown runs in reverse.


    the preceding step section should have the time displays `00:00:00.000` (hours:minutes:seconds.milliseconds).
    and below two rows of buttons

    # Buttons Layout should be on 2 rows **
        5 | 6 | 7 | 8 | 9 | Set
        0 | 1 | 2 | 3 | 4 | Clear

        All the button should be green except the clear button

    # Button Functionality
        - When pressed, the numbers are entered from **right to left**.
        - Example:
           - Initial display: `00:00:00`
           - Press `1`: `00:00:01`
           - Press `2`: `00:00:21`
           - Press `3`: `00:03:21`
           - Press `4`: `00:43:21`
           - Press `1`: `01:43:21`
           - Press `1`: `11:43:21`
           (no more press are allowed)


        - clear button should reset the display to the default value 00:00:00:000
        - the set button should set the time for the countdown,
        - the set button will hidden this section and it will be open the countdonw session with the timer already set with the button "start" and "clear"

---

## **UI Description**

        - All functionality (homepage, stopwatch, and countdown) should be implemented within `index.html`.
        - Use JavaScript to dynamically show/hide sections.
        - Please use flex align-items center justify-content center for the homepage images and text alignment
        - The design must be **responsive**
        - Use **smooth transitions** when switching between sections.
        - Place a back button in the **bottom left corner** of each functionality section.
        - The back button should return the user to the homepage.

---

## **DEVELOPMENT STEP**

- Proceed ONLY with layout and user navigation
- Wait my feedback before proceeding with the next step
- Implement the logic of starCount
- Wait my feedback before proceeding with the next step
- Implmeent the logic of countdown

---

# PROMPT 2

    - I asked to impelment only the first step and wait my feedback, please revert the code and respect the step described mon the prompt

# PROMPT 3

    - Step 1 is ok ! Layout is fine, please le't implement the logic of stopwatch

# PROMPT 4

    - Step 2 is ok ! please le't implement the next step

# PROMPT 5

    - please use a transaction of 0.5 seconds from right to left when the user click the navigation button
    - the countdown the default value is 00:00:00.000
