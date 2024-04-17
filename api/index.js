import express, { json } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

import 'dotenv/config';

mongoose.connect(process.env.MONGODB).then(() => {
  console.log('MongoDB is connected');
});
const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
  });
});

app.listen('3000', () => {
  console.log('Server is running on port 3000!')
});