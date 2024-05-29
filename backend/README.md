# Feedback Collection App Backend

This project is a simple feedback collection app with backend APIs for submitting and retrieving feedback entries.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- TypeScript
- Joi
- Swagger

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (with npm)
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   gh repo clone eadortsu/feedback-app
   ```

2. Navigate to the project directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

   ```plaintext
   PORT=5000
   MONGODB_URI=<your_mongodb_uri>
   ```

## Running the Backend

1. Start Local MongoDB:

   ```bash
   mongod
   ```

2. Start the backend server:

   ```bash
   npm run dev
   ```

3. The backend server will start running at `http://localhost:4000`.

## Running Tests

To run unit tests for the backend, use the following command:

```bash
npm run test
```

This command will execute the Jest test suite and provide feedback on the test results.

## API Documentation

You can access the Swagger documentation for the APIs at `http://localhost:4000/api-docs`.



## Testing the APIs

You can use tools like cURL or Postman to test the APIs:

- POST `/api/feedback`: Submit feedback.
- GET `/api/feedback`: Retrieve feedback entries with pagination, filtering, and sorting options.

## Author

- Eugene Adortsu
- Email: eugeneadortsu@gmail.com
- GitHub: [eadortsu](https://github.com/eadortsu)
