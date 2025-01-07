const express = require("express");
const blogPostRouter = express.Router();
const blogPostController = require("../controllers/blogPostController");

blogPostRouter
  .route("/")
  .get(blogPostController.getAllBlogPosts)
  .post(blogPostController.createNewBlogPost);

blogPostRouter
  .route("/:id")
  .get(blogPostController.getBlogPost)
  .put(blogPostController.updateBlogPost)
  .delete(blogPostController.deleteBlogPost);

module.exports = blogPostRouter;
