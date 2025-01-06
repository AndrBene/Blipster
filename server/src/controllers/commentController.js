const Comment = require("../models/commentModel");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: { comments },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post: req.params.postId,
    });

    res.status(201).json({
      status: "success",
      data: { newComment },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post: req.params.postId,
    });

    res.status(201).json({
      status: "success",
      data: { newComment },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);

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
