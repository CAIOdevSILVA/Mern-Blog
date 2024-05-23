import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePosts, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/get-posts', getPosts);
router.delete('/delete-post/:postId/:userId', verifyToken, deletePosts);

export default router;