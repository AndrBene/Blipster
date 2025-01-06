const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.route("/").get(userController.getAllUsers);

userRouter.route("/profile/:id").get(userController.getUserProfile);

userRouter.route("/register").post(userController.registerUser);

userRouter.route("/login").post(userController.loginUser);

userRouter.route("/:id").delete(userController.deleteUser);

module.exports = userRouter;
