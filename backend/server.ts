import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db'

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

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