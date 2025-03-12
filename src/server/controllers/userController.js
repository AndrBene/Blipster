import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import { unlink } from 'fs/promises';

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

export const updateUserProfileImg = catchAsync(async (req, res) => {
  if (req.body) {
    await unlink(
      `./public/users/images/${req.body.previousProfileImg}`,
    );
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { photo: req.file?.filename },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
