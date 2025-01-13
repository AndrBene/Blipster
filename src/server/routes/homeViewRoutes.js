const express = require('express');
const homeViewController = require('../controllers/homeViewController');

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);
homeViewRouter.get('/jsBundle', homeViewController.getJsBundle);
homeViewRouter.get(
  '/public-blog/jsBundle',
  homeViewController.getJsBundle,
);
homeViewRouter.get('/public-blog/*', homeViewController.getHomeView);

module.exports = homeViewRouter;
