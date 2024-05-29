# Feedback App

This is a full-stack web application for collecting and managing user feedback submissions. It consists of both frontend and backend components.

## Features

- **Frontend:**
  - View a list of feedback submissions
  - Paginate through feedback submissions
  - Filter feedback by type
  - Sort feedback by name or date
  - View details of individual feedback submissions
  - Add new feedback submissions

- **Backend:**
  - RESTful API for managing feedback submissions
  - Endpoints for creating, reading, updating, and deleting feedback
  - Pagination, filtering, and sorting options for querying feedback data
  - MongoDB database for storing feedback submissions

## Technologies Used

### Frontend
- Vue.js
- TypeScript
- Axios for HTTP requests
- Tailwind CSS for styling
- FontAwesome for icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose for MongoDB object modeling
- RESTful API architecture

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```
gh repo clone eadortsu/feedback-app
```

2. Navigate to the project directory:

```
cd feedback-app
```

3. Install dependencies for both frontend and backend:

```
cd frontend
npm install
cd ../backend
npm install
```

4. Start the backend server:

```
cd backend
npm start
```

5. Start the frontend development server:

```
cd ../frontend
npm run serve
```

6. Open your web browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the app.

## Usage

- **Frontend:**
  - View Feedback List: The main page displays a list of feedback submissions. Use pagination buttons to navigate between pages.
  - Filter Feedback: Use the dropdown menu to filter feedback submissions by type (Bug or Suggestion).
  - Sort Feedback: Use the dropdown menu to sort feedback submissions by name or date.
  - View Feedback Details: Click on a feedback card to view details of the selected feedback.
  - Add New Feedback: Click on the "Add Feedback" button to open the form for submitting new feedback.

![View Feedback List](https://raw.githubusercontent.com/eadortsu/feedback-app/main/screenshots/fe1.png)
![ Add New Feedback](https://raw.githubusercontent.com/eadortsu/feedback-app/main/screenshots/fe2.png)



- **Backend:**
  - Access API Endpoints: Use tools like Postman or cURL to interact with the API endpoints for managing feedback submissions.
  - API Documentation: You can access the Swagger documentation for the APIs at `http://localhost:4000/api-docs` for details on available endpoints and request/response formats.
    ![Feedback App Logo](https://raw.githubusercontent.com/eadortsu/feedback-app/main/screenshots/be.png)

## Author

- Eugene Adortsu
- Email: eugeneadortsu@gmail.com
- GitHub: [eadortsu](https://github.com/eadortsu)
