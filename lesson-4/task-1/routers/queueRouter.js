import express from 'express';
import * as queue from '../controllers/queueController.js';
import * as resolution from '../controllers/resolutionController.js';

const queueRouter = express.Router();

queueRouter.use('/add', express.text());

queueRouter.post('/add', queue.addInQueue);
queueRouter.get('/getResolution/:name', resolution.findResolution);

export default queueRouter;
