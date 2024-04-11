import express, { json } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

import 'dotenv/config';

mongoose.connect(process.env.MONGODB).then(() => {
  console.log('MongoDB is connected');
});
const app = express();

app.use('/api/user', userRoutes);

app.listen('3000', () => {
  console.log('Server is running on port 3000!')
});