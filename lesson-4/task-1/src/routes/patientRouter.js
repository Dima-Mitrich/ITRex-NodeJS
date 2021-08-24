import express from 'express';
import queueController from '../api/controllers/queueController.js';
import { validateNameParams } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const patientRouter = express.Router();

patientRouter.get('/next', async (req, res) => {
    const result = await queueController.getPatient();

    res.status(result.status).send(JSON.stringify(result.value));
});

patientRouter.post('/add/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await queueController.addInQueue(req.params.name);

    res.status(result.status).send(result.value);
});

export default patientRouter;
