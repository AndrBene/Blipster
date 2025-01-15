import express from 'express';
import * as homeViewController from '../controllers/homeViewController';

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);
homeViewRouter.get('/jsBundle', homeViewController.getJsBundle);
homeViewRouter.get(
  '/jsBundle.css',
  homeViewController.getJsBundleCss,
);
homeViewRouter.get(
  '/public-blog/jsBundle',
  homeViewController.getJsBundle,
);
homeViewRouter.get(
  '/public-blog/jsBundle.css',
  homeViewController.getJsBundleCss,
);
homeViewRouter.get('/public-blog/*', homeViewController.getHomeView);

export default homeViewRouter;
