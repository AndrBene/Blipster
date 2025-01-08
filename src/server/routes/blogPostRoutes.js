const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const blogPostRouter = express.Router();

blogPostRouter
  .route('/')
  .get(blogPostController.getAllBlogPosts)
  .post(authController.protect, blogPostController.createNewBlogPost);

blogPostRouter.route('/:id').get(blogPostController.getBlogPost);

blogPostRouter
  .route('/:postId/comments')
  .get(commentController.getBlogPostComments)
  .post(authController.protect, commentController.addComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = blogPostRouter;
