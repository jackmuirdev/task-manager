import express from "express";
import dotenv from "dotenv";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./database/db";
import { notFound, errorHandler } from "./middleware/errorMiddlware";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerDocument from './api/swagger';

dotenv.config();

// Get the port from the environment variables or use 10001 as the default port
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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Production / Development
if (process.env.NODE_ENV === 'production') {
  // Production
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  // Development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Middleware
app.use(notFound);
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.error(`Error connecting to server: ${error.message}`);
}