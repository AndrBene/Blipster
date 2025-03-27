import BlogPost from '../models/blogPostModel';
import catchAsync from '../utils/catchAsync';
import Comment from '../models/commentModel';

export const getAllBlogPosts = catchAsync(async (req, res) => {
  let query = BlogPost.find();

  if (req.query.period) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (req.query.period - 1));
    fromDate.setUTCHours(0, 0, 0, 0);
    query = query
      .where('createdAt')
      .gte(fromDate)
      .select('createdAt');
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit).sort('-createdAt');

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
  const newBlogPost = await BlogPost.create({
    ...req.body,
    image: req.file?.filename,
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
    options: {
      sort: '-createdAt',
    },
    populate: {
      path: 'userInfo',
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

  await Comment.deleteMany({ post: req.params.id });

  res.status(204).send();
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

export const getUserPosts = catchAsync(async (req, res) => {
  const blogPosts = await BlogPost.find({
    author: req.params.id,
  }).select(['title', 'createdAt', 'views', 'numComments']);

  res.status(200).json({
    status: 'success',
    data: {
      blogPosts,
    },
  });
});

export const getViews = catchAsync(async (req, res) => {
  let query = BlogPost.find();

  if (req.query.period) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (req.query.period - 1));
    fromDate.setUTCHours(0, 0, 0, 0);
    query = query.where('createdAt').gte(fromDate);
  }

  query = query.where('views').gt(0).select(['views', 'createdAt']);

  const blogPosts = await query;

  res.status(200).json({
    status: 'success',
    results: blogPosts.length,
    data: {
      blogPosts: blogPosts,
    },
  });
});
