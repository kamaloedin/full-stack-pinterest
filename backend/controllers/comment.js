import Comment from '../models/comment.js';
import jwt from 'jsonwebtoken';

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ pin: postId })
    .populate('user', 'username img displayName')
    .sort({ createdAt: -1 });

  res.status(200).json(comments);
};

export const addComment = async (req, res) => {
  const { description, pin } = req.body;

  const comment = await Comment.create({ description, pin, user: req.userId });

  res.status(201).json(comment);
};
