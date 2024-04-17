import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./api/swaggerApis";
import { connectDB } from './database/db'
import { errorHandler, notFound } from './middleware/errorMiddlware';

dotenv.config();

// Get the port from the environment variables
const port = process.env.PORT;
// Create an Express application
const app = express();

// Connect to the database
connectDB();

// Parse incoming request bodies in JSON format
app.use(express.json());
// Parse incoming request bodies in URL-encoded format
app.use(express.urlencoded({ extended: true }));
// Parse cookies attached to the client request
app.use(cookieParser());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware
app.use(notFound);
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
} catch (error: any) {
  console.error('Error: ', error.message);
}