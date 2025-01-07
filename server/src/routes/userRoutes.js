const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRouter.post("/register", authController.registerUser);
userRouter.post("/login", authController.loginUser);

userRouter.route("/").get(authController.protect, userController.getAllUsers);
userRouter
  .route("/profile/:id")
  .get(authController.protect, userController.getUserProfile);
userRouter
  .route("/:id")
  .delete(authController.protect, userController.deleteUser);

module.exports = userRouter;
