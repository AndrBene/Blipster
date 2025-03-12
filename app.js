import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
export * from '@multiloader/loader';
import chalk from 'chalk';

import userRouter from './src/server/routes/userRoutes';
import blogPostRouter from './src/server/routes/blogPostRoutes';
import homeViewRouter from './src/server/routes/homeViewRoutes';

import AppError from './src/server/utils/appError';
import globalErrorHandler from './src/server/controllers/errorController';

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
  })
  .catch(() => {
    console.log(chalk.red('DB connection failed!'));
  });

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.static('build'));
app.use(express.static('public'));

app.options('*', cors());

if (process.env.JUST_API === 'false') {
  app.use('/', homeViewRouter);
}
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', blogPostRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on the server.`, 404),
  );
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
