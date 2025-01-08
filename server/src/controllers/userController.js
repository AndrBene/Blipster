const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    'blogPosts',
  );
  console.log(user);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
