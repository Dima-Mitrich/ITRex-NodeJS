import express from 'express';
import * as queue from '../api/controllers/queueController.js';
import * as resolution from '../api/controllers/resolutionController.js';
import { validateNameParams } from '../api/helpers/validate.js';

const queueRouter = express.Router();

queueRouter.use('/add', express.text());

queueRouter.post('/add', queue.addInQueue);

queueRouter.get('/getResolution/:name', (req, res) => {
    if (validateNameParams(req.params.name)) {
        const result = resolution.findResolution(req.params.name, req.headers.isdoctor);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('sorry, cant find resolution at the moment');
        }
    } else {
        res.status(400).send(validateNameParams.errors);
    }
});

export default queueRouter;
