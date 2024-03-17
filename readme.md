# Tech Stack

- FrontEnd - ReactJS, TailwindCSS
- BackEnd - ExpressJS, MongoDB, JWT auth

# Features

### Signup page

- Implemented the debouncing concept for the password input box. Previously
  when ever there is a change in the obj.password the whole pages re renders.
  Decreased this re renders signifcantly. Now the page re renders only when the users stop typing

- JWT tokens will store in local storage. Once the user is logged in and again visted the signin/login page
  will take them to the dashboard page

### Todo

- Added the required on the mandatory input boxes. like email, password if the input box is empty the client gets's a message saying it is required
