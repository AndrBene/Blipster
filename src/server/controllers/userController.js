import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    'blogPosts',
  );
  console.log(user);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
