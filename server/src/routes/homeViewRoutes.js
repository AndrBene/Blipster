const express = require('express');
const homeViewController = require('../controllers/homeViewController');

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);
homeViewRouter.get('/jsBundle', homeViewController.getJsBundle);

module.exports = homeViewRouter;
