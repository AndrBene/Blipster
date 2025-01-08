const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const userRouter = require('./src/routes/userRoutes');
const blogPostRouter = require('./src/routes/blogPostRoutes');
const commentRouter = require('./src/routes/commentRoutes');
const homeViewRouter = require('./src/routes/homeViewRoutes');

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

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

app.set('views', path.join(__dirname, '/src/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

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
