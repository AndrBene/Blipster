import BlogPost from '../models/blogPostModel';
import catchAsync from '../utils/catchAsync';

export const getAllBlogPosts = catchAsync(async (req, res) => {
  let query = BlogPost.find();

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
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

export const createNewBlogPost = catchAsync(async (req, res) => {
  const data = await JSON.parse(req.body.data);

  const newBlogPost = await BlogPost.create({
    ...data,
    image: req.file.filename,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newBlogPost,
    },
  });
});

export const getBlogPost = catchAsync(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'userInfo',
      model: 'User',
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      blogPost,
    },
  });
});

export const updateBlogPost = catchAsync(async (req, res) => {
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

export const deleteBlogPost = catchAsync(async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const updateNumViews = catchAsync(async (req, res) => {
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

export const getNumViews = catchAsync(async (req, res) => {
  const numViews = await BlogPost.findById(req.params.id).select(
    'views',
  );

  res.status(200).json({
    status: 'success',
    data: {
      numViews: numViews.views,
    },
  });
});

export const getTotNumberPosts = catchAsync(async (req, res) => {
  const numPosts = await BlogPost.countDocuments();

  res.status(200).json({
    status: 'success',
    data: {
      numPosts,
    },
  });
});
