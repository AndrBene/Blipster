const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

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

module.exports = userRouter;
