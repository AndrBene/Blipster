const express = require('express');
const blogPostController = require('../controllers/blogPostController');

const blogPostRouter = express.Router();

blogPostRouter
  .route('/')
  .get(blogPostController.getAllBlogPosts)
  .post(blogPostController.createNewBlogPost);

blogPostRouter
  .route('/:id')
  .get(blogPostController.getBlogPost)
  .put(blogPostController.updateBlogPost)
  .delete(blogPostController.deleteBlogPost);

module.exports = blogPostRouter;
