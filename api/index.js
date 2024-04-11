import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB).then(() => {
  console.log('MongoDB is connected');
});
const app = express();

app.listen('3000', () => {
  console.log('Server is running on port 3000!')
});