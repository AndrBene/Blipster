const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRouter.post("/register", authController.registerUser);
userRouter.post("/login", authController.loginUser);

userRouter.route("/").get(userController.getAllUsers);
userRouter.route("/profile/:id").get(userController.getUserProfile);
userRouter.route("/:id").delete(userController.deleteUser);

module.exports = userRouter;
