import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

export const restrictTo = (...roles) => {
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

export const registerUser = catchAsync(async (req, res) => {
  const data = await JSON.parse(req.body.info);

  const newUser = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    passwordChangeAt: data.passwordChangeAt,
    photo: req.file?.filename,
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

export const loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error('Please provide username and password!');
  }

  const user = await User.findOne({ username: username }).select(
    '+password',
  );

  if (
    !user ||
    !(await user.checkCorrectPassword(password, user.password))
  ) {
    throw new Error('Incorrect username or password!');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100, // milliseconds
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production')
    cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
  });
});

export const logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});

export const isLoggedIn = catchAsync(async (req, res, next) => {
  const resObject = {
    status: 'success',
    authenticated: false,
  };

  if (req.cookies.jwt) {
    const decodedPayload = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );

    const user = await User.findById(decodedPayload.id);
    if (
      user &&
      !user.checkPasswordChangedAfterTokenRelease(decodedPayload.iat)
    ) {
      resObject.authenticated = true;
      resObject.data = {
        user: user,
      };
    }
  }

  res.status(201).json(resObject);
});
