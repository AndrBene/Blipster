import express from 'express';
import * as blogPostController from '../controllers/blogPostController';
import * as commentController from '../controllers/commentController';
import * as authController from '../controllers/authController';
import multer from 'multer';

const blogPostRouter = express.Router();
const upload = multer({ dest: './public/images/' });

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
  .route('/:postId/comments')
  .get(commentController.getBlogPostComments)
  .post(authController.protect, commentController.addComment)
  .delete(authController.protect, commentController.deleteComment);

export default blogPostRouter;
