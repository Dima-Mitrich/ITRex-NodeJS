import express from 'express';
import queueController from '../api/controllers/queueController.js';
import resolutionController from '../api/controllers/resolutionController.js';
import { validateNewResolution, validateNameParams } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const docRouter = express.Router();

docRouter.get('/next', async (req, res) => {
    const result = await queueController.getPatient();

    const { patient, isEmpty } = result.value;

    res.status(result.status).send(JSON.stringify({ patient, isEmpty }));
});

docRouter.use('/new-resolution', express.json());

docRouter.post('/new-resolution', (req, res, next) => {
    validateNewResolution(req.body)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNewResolution.errors);
}, async (req, res) => {
    const { newResolutionContent, currentPatient, ttl } = req.body;
    const result = await resolutionController.addResolution(newResolutionContent, currentPatient, ttl);

    res.status(result.status).send(result.value);
});

docRouter.delete('/resolution/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.deleteResolution(req.params.name);

    res.status(result.status).send(result.value);
});

docRouter.get('/resolution/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(400).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.findResolution(req.params.name, req.headers.isdoctor);

    res.status(result.status).send(result.value);
});

export default docRouter;
