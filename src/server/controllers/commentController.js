import BlogPost from '../models/blogPostModel';
import Comment from '../models/commentModel';
import catchAsync from '../utils/catchAsync';

export const getBlogPostComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({
    post: req.params.postId,
  });

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: { comments },
  });
});

export const addComment = catchAsync(async (req, res) => {
  /*
   FIXME: 
   - find a way to make DB operations atomic
  */
  const newComment = await Comment.create({
    ...req.body,
    post: req.params.postId,
  });

  const post = await BlogPost.findById(req.params.postId).select(
    'numComments',
  );

  await BlogPost.findByIdAndUpdate(
    req.params.postId,
    { numComments: post.numComments + 1 },
    { new: true, runValidators: true },
  );

  res.status(201).json({
    status: 'success',
    data: { newComment },
  });
});

export const deleteComment = catchAsync(async (req, res) => {
  /*
   FIXME: 
   - find a way to make DB operations atomic
  */
  await Comment.findByIdAndDelete(req.params.commentId);

  const post = await BlogPost.findById(req.params.postId).select(
    'numComments',
  );

  await BlogPost.findByIdAndUpdate(
    req.params.postId,
    { numComments: post.numComments - 1 },
    { new: true, runValidators: true },
  );

  res.status(204).send();
});

export const getUserComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({
    user: req.params.id,
  })
    .populate({
      path: 'postInfo',
      select: 'title',
    })
    .select(['post', 'content', 'createdAt']);

  res.status(200).json({
    status: 'success',
    data: { comments },
  });
});

export const getComments = catchAsync(async (req, res) => {
  let query = Comment.find();

  if (req.query.period) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (req.query.period - 1));
    fromDate.setUTCHours(0, 0, 0, 0);
    query = query.where('createdAt').gte(fromDate);
  }

  const comments = await query.select('createdAt');

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: { comments },
  });
});
