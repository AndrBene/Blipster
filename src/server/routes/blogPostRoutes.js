import express from 'express';
import * as blogPostController from '../controllers/blogPostController';
import * as commentController from '../controllers/commentController';
import * as authController from '../controllers/authController';

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

export default blogPostRouter;
