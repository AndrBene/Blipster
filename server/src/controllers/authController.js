const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new Error(
      'You are not logged in! Please log in to get access.',
    );
  }

  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );
  console.log(decodedPayload);

  const user = await User.findById(decodedPayload.id);
  if (!user) {
    throw new Error('User no longer exists.');
  }

  if (
    user.checkPasswordChangedAfterTokenRelease(decodedPayload.iat)
  ) {
    throw new Error('User recently changed password.');
  }

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      console.log('user: ', req.user);
      if (!roles.includes(req.user.role)) {
        throw new Error();
      }

      next();
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };
};

exports.registerUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangeAt: req.body.passwordChangeAt,
  });

  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please provide email and password!');
  }

  // const user = await User.find()
  //   .where("email")
  //   .equals(email)
  //   .select("+password")[0];
  const user = await User.findOne({ email: email }).select(
    '+password',
  );

  if (
    !user ||
    !(await user.checkCorrectPassword(password, user.password))
  ) {
    throw new Error('Incorrect email or password!');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});
