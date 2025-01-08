const BlogPost = require('../models/blogPostModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBlogPosts = catchAsync(async (req, res) => {
  let query = BlogPost.find();

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 100 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numPosts = await BlogPost.countDocuments();
    if (skip >= numPosts) throw Error('This page does not exist');
  }

  const blogPosts = await query;

  res.status(200).json({
    status: 'success',
    results: blogPosts.length,
    data: {
      blogPosts,
    },
  });
});

exports.createNewBlogPost = catchAsync(async (req, res) => {
  const newBlogPost = await BlogPost.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newBlogPost,
    },
  });
});

exports.getBlogPost = catchAsync(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      blogPost,
    },
  });
});

exports.updateBlogPost = catchAsync(async (req, res) => {
  const blogPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      blogPost,
    },
  });
});

exports.deleteBlogPost = catchAsync(async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
