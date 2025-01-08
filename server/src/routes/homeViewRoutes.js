const express = require('express');
const homeViewController = require('../controllers/homeViewController');

const homeViewRouter = express.Router();

homeViewRouter.get('/', homeViewController.getHomeView);

module.exports = homeViewRouter;
