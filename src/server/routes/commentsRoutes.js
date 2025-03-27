import express from 'express';
import * as commentController from '../controllers/commentController';

const commentsRouter = express.Router();

commentsRouter.route('/').get(commentController.getComments);

export default commentsRouter;
