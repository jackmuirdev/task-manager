import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./api/swaggerApis";
import { connectDB } from './database/db'

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res) => {
  res.send('API is running...');
});

try {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
} catch (error: any) {
  console.error('Error: ', error.message);
}