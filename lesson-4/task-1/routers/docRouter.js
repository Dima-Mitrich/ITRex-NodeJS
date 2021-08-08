import express from 'express';
import * as queue from '../controllers/queueController.js';
import * as resolution from '../controllers/resolutionController.js';

const docRouter = express.Router();

docRouter.use('/addResolution', express.json());

docRouter.get('/next', queue.getPatient);
docRouter.post('/addResolution', resolution.addResolution);
docRouter.delete('/deleteResolution/:name', resolution.deleteResolution);
docRouter.get('/resolution/:name', resolution.findResolution);

export default docRouter;
