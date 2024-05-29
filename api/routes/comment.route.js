import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment } from '../controllers/comment.controller';

const router = express.Router();

router.post('/create-comment', verifyToken ,createComment);

export default router;