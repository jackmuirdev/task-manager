import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});