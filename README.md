# File Management App

## Overview

The File Management App is a web application designed for efficient file and directory management, inspired by Google Drive's intuitive interface. The project aims to provide users with a seamless experience for uploading, organizing, and accessing their files and directories. Currently, the frontend is a work in progress as we continue to refine its functionality and design.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Firebase**: Used to enable Google Authentication

### Backend
- **Django**: A high-level Python web framework that encourages rapid development and clean, pragmatic design.
- **Django REST Framework**: A powerful toolkit for building Web APIs in Django.
- **SQLite**: A lightweight database used for data storage.

## Project Structure

The project consists of two main components: the backend and the frontend. 

### Backend
The backend is built with Django and provides a RESTful API for file and directory management. The API supports the following features:
- **File Operations**: Upload, retrieve, update, and delete files.
- **Directory Operations**: Create, list, and manage directories, including hierarchical subdirectory structures.

### Frontend
The frontend is designed to interact with the Django REST API to provide users with a dynamic and responsive interface. It mimics the functionality and appearance of Google Drive, allowing users to manage their files effectively.

## Getting Started

### Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (for the frontend)
- [Python](https://www.python.org/) (version 3.6 or higher for the backend)
- [Django](https://www.djangoproject.com/) and [Django REST Framework](https://www.django-rest-framework.org/)

### Running the Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations to set up the database:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

4. Run the development server:
    ```bash
    python manage.py runserver
    ```

The backend will be running on `http://localhost:8000`.

### Running the Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The frontend will be running on `http://localhost:3000`.

## How It Works

1. **Backend**:
   - The backend handles all data storage and retrieval through a RESTful API built with Django and Django REST Framework. It manages files and directories stored in an SQLite database.
   - Each file and directory is represented as a model, allowing for easy CRUD (Create, Read, Update, Delete) operations.

2. **Frontend**:
   - The frontend communicates with the backend API to perform actions such as uploading files, creating directories, and displaying the file structure.
   - The design is influenced by Google Drive, aiming for a clean and user-friendly experience.

## Future Work

- Continue developing the frontend to enhance user experience and functionality.
- Implement additional features such as file sharing, real-time updates, and improved error handling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements.
