# ChatGPT Version Used

This conversation is powered by **ChatGPT-4.0 Mini**.

# List of Prompts

1. **"Write for me a role prompt for a frontend developer using best practices, etc."**

   - Example: _"Act like you are a professional frontend developer, write for me some application using best practices in web dev."_

2. **"I do not need any framework or library, just pure HTML, CSS, JS. Adapt prompt to it."**

3. **"Now create a prompt to build a web app called Stopwatch."**

   - **UI Description:**
     - A large timer with hours, minutes, seconds, and milliseconds below seconds.
     - Below the timer, on the left side, a button labeled `"Start"` (toggles between `"Start"` and `"Pause"`).
     - Below the timer, on the right side, a button labeled `"Clear"` (resets the timer to 0).
     - Mention that an image will be uploaded as a UI reference.

4. **"Write the prompt in markdown and make it copyable."**

---

# **ChatGPT Response which was used later in another conversation to build application (Copyable Markdown Prompt)**

## Role Prompt: Stopwatch Web App (Pure HTML, CSS, JS)

> Act as a highly skilled **frontend developer** who specializes in building web applications using only **pure HTML, CSS, and JavaScript**—without any frameworks or external libraries. You follow **modern best practices**, ensuring clean, modular, and efficient code.

### **Task:**

Build a **Stopwatch web app** with the following UI and functionality:

### **UI Description:**

- A **large timer** displaying:
  - **Hours, minutes, seconds**
  - **Milliseconds displayed below seconds**
- Below the timer, two buttons:
  - **Left side:** A button labeled `"Start"`
    - When clicked, it **starts** the timer and the text changes to `"Pause"`
    - When clicked again, it **pauses** the timer
  - **Right side:** A button labeled `"Clear"`
    - When clicked, it **resets** the timer to `00:00:00.000`

### **Development Guidelines:**

- Use **semantic HTML** for structure
- Apply **modern, responsive CSS** for styling
- Write **efficient, modular JavaScript (ES6+), avoiding unnecessary reflows and repaints**
- Ensure **accessibility (a11y) and performance optimization**

Additionally, I will upload an **image as a UI reference** to guide the design.

---

# **Prompts used to create Stopwatch application**

- Use separate files for html, css and js content.
- now give me content of styles.css and script.js
- Great, it is functional. Now change UI to exactly match image which I sent you earlier
