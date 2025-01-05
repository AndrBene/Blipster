const express = require("express");
const blogPostRouter = express.Router();
const blogPostController = require("../controllers/blogPostController");

blogPostRouter.route("/").get(blogPostController.getAllBlogPosts);

blogPostRouter.route("/").post(blogPostController.createNewBlogPost);

blogPostRouter.route("/:id").get(blogPostController.getBlogPost);

blogPostRouter.route("/:id").put(blogPostController.updateBlogPost);

blogPostRouter.route("/:id").delete(blogPostController.deleteBlogPost);

module.exports = blogPostRouter;
