import express from 'express';
import * as adminViewController from '../controllers/adminViewController';

const adminViewRouter = express.Router();

adminViewRouter.get('/*', adminViewController.getAdminView);

export default adminViewRouter;
