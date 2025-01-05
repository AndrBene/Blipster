const BlogPost = require("../models/blogModel");

exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();

    res.status(200).json({
      status: "success",
      results: blogPosts.length,
      data: {
        blogPosts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNewBlogPost = async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newBlogPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        blogPost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        blogPost,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
