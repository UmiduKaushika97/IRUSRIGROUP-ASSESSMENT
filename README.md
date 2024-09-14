# React Authentication and Todo List Application
This is a simple React application for user authentication sign-up, login and a Todo list with add, edit, delete, and mark as completed features. The application uses local state for user authentication.

# Features
User Registration (Sign-Up): Users can register and store their details in local storage.
User Login: Users can log in using stored credentials.
Todo List Management: Add, edit, delete, and mark todos as completed.
Form Validation: Formik and Yup are used for form validation.
Routing: routing using react-router-dom.
State Management: React Context is used for managing authentication state.
Design: Styled using React Bootstrap with custom plain CSS.

# Technologies Used
React
React Bootstrap
Formik & Yup (for form validation)
React Context (for state management)
React Router (for routing)

### Installation
Make sure you have Node.js installed.

### Steps to Run the Application Locally
Repository: https://github.com/UmiduKaushika97/IRUSRIGROUP-ASSESSMENT

Clone the repository: git clone https://github.com/UmiduKaushika97/IRUSRIGROUP-ASSESSMENT.git

Navigate to the project directory: cd IRUSRIGROUP-ASSESSMENT

Install the dependencies: npm install

Run the application: npm start

The app should now be running on http://localhost:3000.

# Design Decisions
Local Storage for User Authentication: User registration and login details are stored in local storage for simplicity, avoiding the need for a backend. This approach is ideal for a small-scale app where persistent authentication is not required across devices.

Form Validation: Formik and Yup were chosen for their simplicity and efficiency in handling form validations.

React Context for State Management: React Context is used for managing authentication state across the application without introducing more complex state management libraries.

Plain CSS for Styling: Plain CSS is used alongside React Bootstrap to customize the styles while maintaining a lightweight application.

Additional Setup
There are no additional setup steps required for running this application locally.

