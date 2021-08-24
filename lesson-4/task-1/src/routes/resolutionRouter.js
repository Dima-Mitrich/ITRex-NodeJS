import express from 'express';
import { STATUSES } from '../constants.js';
import resolutionController from '../api/controllers/resolutionController.js';
import { validateNewResolution, validateNameParams } from '../api/helpers/validate.js';

const resolutionRouter = express.Router();

resolutionRouter.use('/new', express.json());

resolutionRouter.post('/new', (req, res, next) => {
    validateNewResolution(req.body)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNewResolution.errors);
}, async (req, res) => {
    const { newResolutionContent, currentPatient, ttl } = req.body;
    const result = await resolutionController.addResolution(newResolutionContent, currentPatient, ttl);

    res.status(result.status).send(result.value);
});

resolutionRouter.delete('/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.deleteResolution();

    res.status(result.status).send(result.value);
});

resolutionRouter.get('/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.findResolution(req.params.name, req.headers.isdoctor);

    res.status(result.status).send(result.value);
});

export default resolutionRouter;
