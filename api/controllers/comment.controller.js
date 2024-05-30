import Comment from '../models/Comment.model.js';
import { errorHandler } from '../utils/error.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if(userId !== req.user.id) {
      return next(errorHandler(403, 'You are not alloed to create this comment'));
    }
    const newComment = new Comment({
      content,
      postId,
      userId
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};