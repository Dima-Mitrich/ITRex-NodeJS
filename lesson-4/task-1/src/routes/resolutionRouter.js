import express from 'express';
import { STATUSES } from '../constants.js';
import resolutionController from '../api/controllers/ResolutionController.js';
import { validateNewResolution, validateNameParams, validateIdParams } from '../api/helpers/validate.js';

const resolutionRouter = express.Router();

resolutionRouter.use('/add', express.json());

resolutionRouter.post('/add', (req, res, next) => {
    validateNewResolution(req.body)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNewResolution.errors);
}, async (req, res) => {
    const { newResolutionContent, currentPatient, ttl } = req.body;
    const result = await resolutionController.addResolution(newResolutionContent, currentPatient, ttl);

    res.status(result.status).send(result.value);
});

resolutionRouter.delete('/:patientID', (req, res, next) => {
    validateIdParams(req.params.patientID)

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
