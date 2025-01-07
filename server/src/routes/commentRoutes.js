const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");

commentRouter
  .route("/:postId")
  .get(commentController.getComments)
  .post(commentController.addComment);

commentRouter.route("/:commentId").delete(commentController.deleteComment);

module.exports = commentRouter;
