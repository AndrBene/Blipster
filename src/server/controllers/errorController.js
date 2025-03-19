import AppError from '../utils/appError';

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    const message = el.message.replace(/ \(`.*?`\)/, '');
    return message;
  });

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 404);
};

export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message || 'Server error.',
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'ValidationError')
      error = handleValidationError(error);

    res.status(error.statusCode || 500).json({
      status: error.status || 'error',
      message: error.message || 'Server error.',
    });
  }
};
