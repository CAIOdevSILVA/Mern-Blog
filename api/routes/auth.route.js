import express from 'express';
import { signUp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', (req, res) => {
  signUp(req, res)
});

export default router; 