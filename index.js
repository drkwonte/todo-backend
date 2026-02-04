require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRouter = require('./routers/todo.router');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-db';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/todos', todoRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버 연결 성공 (포트: ${PORT})`);
    });
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error);
  });
