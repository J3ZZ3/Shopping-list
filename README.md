# Shopping List App

## Overview
The Shopping List App is a web application that allows users to create, manage, and share their shopping lists. Users can log in, register, and manage their profiles. The app provides functionalities to add, edit, delete, and search for shopping lists, as well as download them as PDF files.

## Features
- User authentication (login and registration)
- Create, edit, and delete shopping lists
- Search functionality for shopping lists
- Download shopping lists as PDF
- User profile management
- Responsive design for mobile and desktop

## Technologies Used
- **Frontend**: React, Redux, React Router
- **Backend**: JSON Server (for mock API)
- **Styling**: CSS
- **PDF Generation**: jsPDF

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node package manager)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/J3ZZ3/Shopping-list.git
   cd Shopping-list
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the JSON server** (for mock API):
   ```bash
   npm run server
   ```
   This will start the JSON server on `http://localhost:5000`.

4. **Start the React application**:
   ```bash
   npm start
   ```
   The app will be running on `http://localhost:3000`.

## Usage
- **Login**: Use the credentials of an existing user or register a new account.
- **Register**: Fill in the registration form to create a new account.
- **Manage Shopping Lists**: After logging in, you can add new shopping lists, edit existing ones, or delete them.
- **Search**: Use the search bar to filter shopping lists by name.
- **Download**: Click on the "Download as PDF" button to save your shopping list.

## API Endpoints
The application uses a mock API provided by JSON Server. The following endpoints are available:

- **Users**:
  - `GET /users`: Retrieve all users
  - `POST /users`: Create a new user
  - `GET /users/:id`: Retrieve a specific user
  - `PATCH /users/:id`: Update a specific user
  - `DELETE /users/:id`: Delete a specific user

- **Shopping Lists**:
  - `GET /shoppingLists`: Retrieve all shopping lists
  - `POST /shoppingLists`: Create a new shopping list
  - `PATCH /shoppingLists/:id`: Update a specific shopping list
  - `DELETE /shoppingLists/:id`: Delete a specific shopping list

## Acknowledgments
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [jsPDF](https://github.com/parallax/jsPDF)


