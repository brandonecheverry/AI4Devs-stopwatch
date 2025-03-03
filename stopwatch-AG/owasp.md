# Guide to Best Practices for Securing HTML, JavaScript, and CSS Pages (OWASP)

** This guide provides a series of recommendations to ensure the security of your web pages using HTML, JavaScript, and CSS.**

## 1. Input Validation

Client-side and server-side validation: Perform validation on both the client side (JavaScript) and server side to prevent attacks such as SQL Injection and XSS.
Regular expressions: Use regular expressions to validate specific formats (e.g., email, phone numbers).
Avoid eval(): Do not use eval() in JavaScript, as it can execute arbitrary code.

## 2. Protection Against Cross-Site Scripting (XSS)

Data escaping: Use textContent instead of innerHTML to avoid code injection.
Content Security Policy (CSP): Implement a Content Security Policy to restrict the execution of unauthorized scripts.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' https://trusted.cdn.com;"
/>
```

## 3. Protection Against Cross-Site Request Forgery (CSRF)

CSRF tokens: Include CSRF tokens in forms and validate them on the server side.
SameSite Cookie Attribute: Set the SameSite attribute on cookies.
document.cookie = "sessionid=12345; SameSite=Strict; Secure";

##4. Cookie Protection
Secure and HttpOnly: Set cookies with the Secure and HttpOnly attributes.
document.cookie = "sessionid=12345; Secure; HttpOnly";
Cookie expiration: Set an appropriate expiration for session cookies.

## 5. Use of HTTPS

Enforce HTTPS: Configure the server to redirect all HTTP traffic to HTTPS.
HSTS (HTTP Strict Transport Security): Implement HSTS to force browsers to connect only via HTTPS.

```html
<meta
  http-equiv="Strict-Transport-Security"
  content="max-age=31536000; includeSubDomains"
/>
```
