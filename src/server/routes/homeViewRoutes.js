import express from 'express';
import * as homeViewController from '../controllers/homeViewController';

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);
homeViewRouter.get('/jsBundle', homeViewController.getJsBundle);

export default homeViewRouter;
