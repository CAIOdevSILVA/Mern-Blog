import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment, getPostComment, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create-comment', verifyToken ,createComment);
router.get('/get-post-comment/:postId', getPostComment);
router.put('/like-comment/:commentId', verifyToken, likeComment);
router.put('/edit-comment/:commentId', verifyToken, editComment);
router.put('/delete-comment/:commentId', verifyToken, deleteComment);

export default router;