const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");

commentRouter.route("/:postId").get(commentController.getComments);
commentRouter.route("/:postId").post(commentController.addComment);
commentRouter.route("/:commentId").delete(commentController.deleteComment);

module.exports = commentRouter;