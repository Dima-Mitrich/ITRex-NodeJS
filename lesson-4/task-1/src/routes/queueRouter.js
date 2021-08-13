import express from 'express';
import queueController from '../api/controllers/queueController.js';
import resolutionController from '../api/controllers/resolutionController.js';
import { validateNameParams } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const queueRouter = express.Router();

queueRouter.post('/add/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await queueController.addInQueue(req.params.name);

    res.status(result.status).send(result.value);
});

queueRouter.get('/resolution/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.findResolution(req.params.name, req.headers.isdoctor);

    res.status(result.status).send(result.value);
});

export default queueRouter;
