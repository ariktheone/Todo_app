# Task Management Application

A modern task management application featuring a clean UI, rounded scrollbars, and task management capabilities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.15.1 or later)
- [Bun](https://bun.sh/) (v1.1.0 or later, if applicable)
- [MySQL](https://www.mysql.com/) (or any other database specified in the `database.js` configuration)

### Clone the Repository

```bash
git clone https://github.com/ariktheone/Todo_app
cd Todo_app
```
### Install Dependencies
For the backend:

```bash
cd backend
npm install
```
For the frontend:

```bash
cd ../frontend
npm install
```
### Setup Environment Variables
Create a `.env` file in the `backend` directory and add your database configuration:


```bash
DB_HOST=localhost
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```
### Run the Application
Start the backend server:

```bash
cd backend
node server.js
```

Start the frontend application:

```bash
cd ../frontend
npm start
```
## Usage
Open your browser and go to `http://localhost:3000` to access the application.

### API Endpoints
- **GET `/tasks`**: Retrieve all tasks.
- **POST `/tasks`**: Add a new task.
- **PUT `/tasks/:id`**: Update a task by ID.
- **DELETE `/tasks/:id`**: Delete a task by ID.

## Features
- **Modern UI**: A sleek, responsive design with a clean interface.
- **Rounded Scrollbars**: Custom-styled scrollbars with rounded corners for a polished look.
- **Basic Authenticatio**n: Secure access to the API endpoints using basic authentication.
- **Task Management**: Complete ***CRUD*** *(Create, Read, Update, Delete)* operations for tasks.
- **Responsive Design**: Adapts to different screen sizes for optimal usability on all devices.
- **Animations**: Smooth transitions and animations for a better user experience.
- **Error Handling**: Proper error handling for API requests and responses.
- **Database Integration**: Connects to a ***MySQL*** database (or specified database) to manage tasks.

## Contributing
We welcome contributions! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.
   
Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
