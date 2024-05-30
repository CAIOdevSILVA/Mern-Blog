import express from 'express';
import { deleteUser, deleteUserWithDashboard, getCommentUser, getUsers, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', (req, res) => {
  test(req, res);
});

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/get-users', verifyToken, getUsers);
router.delete('/delete-user/:userId', verifyToken, deleteUserWithDashboard);
router.get('/get-comment-user/:userId', getCommentUser);

export default router;


