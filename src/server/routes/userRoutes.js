import express from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';
import * as blogPostController from '../controllers/blogPostController';

const userRouter = express.Router();

userRouter.post('/register', authController.registerUser);
userRouter.post('/login', authController.loginUser);

userRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  );

userRouter
  .route('/profile/:id')
  .get(authController.protect, userController.getUserProfile);

userRouter
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

userRouter
  .route('/:id/posts/:id')
  .put(authController.protect, blogPostController.updateBlogPost)
  .delete(authController.protect, blogPostController.deleteBlogPost);

export default userRouter;
