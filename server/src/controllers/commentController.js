const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');

exports.getComments = catchAsync(async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: { comments },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.addComment = catchAsync(async (req, res) => {
  const newComment = await Comment.create({
    ...req.body,
    post: req.params.postId,
  });

  res.status(201).json({
    status: 'success',
    data: { newComment },
  });
});

exports.addComment = catchAsync(async (req, res) => {
  const newComment = await Comment.create({
    ...req.body,
    post: req.params.postId,
  });

  res.status(201).json({
    status: 'success',
    data: { newComment },
  });
});

exports.deleteComment = catchAsync(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
