import express from 'express';
import * as homeViewController from '../controllers/homeViewController';

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);
homeViewRouter.get('/home', homeViewController.getHomeView);
homeViewRouter.get('/public-blog/*', homeViewController.getHomeView);

export default homeViewRouter;
