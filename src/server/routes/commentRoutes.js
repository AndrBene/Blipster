const express = require('express');
const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

commentRouter
  .route('/:postId')
  .get(commentController.getComments)
  .post(commentController.addComment);

commentRouter
  .route('/:commentId')
  .delete(commentController.deleteComment);

module.exports = commentRouter;
