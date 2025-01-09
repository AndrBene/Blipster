const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

require('@babel/register')({ extensions: ['.js', '.jsx'] });

const userRouter = require('./src/server/routes/userRoutes');
const blogPostRouter = require('./src/server/routes/blogPostRoutes');
const commentRouter = require('./src/server/routes/commentRoutes');
const homeViewRouter = require('./src/server/routes/homeViewRoutes');

const AppError = require('./src/server/utils/appError');
const globalErrorHandler = require('./src/server/controllers/errorController');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD,
);
mongoose
  .connect(
    DB,
    //     , {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: true,
    //   }
  )
  .then(() => {
    console.log('DB connection successful!');
  });

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', homeViewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', blogPostRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on the server.`, 404),
  );
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
