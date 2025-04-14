import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import { unlink } from 'fs/promises';

export const getAllUsers = catchAsync(async (req, res) => {
  let query = User.find();

  if (req.query.period) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - (req.query.period - 1));
    fromDate.setUTCHours(0, 0, 0, 0);
    query = query.where('createdAt').gte(fromDate);
  }

  const users = await query.select('createdAt');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).send();
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
