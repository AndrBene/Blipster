import express from 'express';
import * as blogPostController from '../controllers/blogPostController';
import * as commentController from '../controllers/commentController';
import * as authController from '../controllers/authController';
import multer from 'multer';

const blogPostRouter = express.Router();
const upload = multer({ dest: './public/posts/images/' });

blogPostRouter
  .route('/tot-posts')
  .get(blogPostController.getTotNumberPosts);

blogPostRouter
  .route('/')
  .get(blogPostController.getAllBlogPosts)
  .post(
    authController.protect,
    upload.single('image'),
    blogPostController.createNewBlogPost,
  );

blogPostRouter.route('/:id').get(blogPostController.getBlogPost);

blogPostRouter
  .route('/:id/num-views')
  .get(blogPostController.getNumViews)
  .patch(blogPostController.updateNumViews);

blogPostRouter
  .route('/:postId/comments')
  .get(commentController.getBlogPostComments)
  .post(authController.protect, commentController.addComment);

blogPostRouter
  .route('/:postId/comments/:commentId')
  .delete(authController.protect, commentController.deleteComment);

export default blogPostRouter;
