import express from 'express';
import patientController from '../api/controllers/PatientController.js';
import { validateNameParams } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const patientRouter = express.Router();

patientRouter.get('/next', async (req, res) => {
    const result = await patientController.shiftPatient();

    res.status(result.status).send(JSON.stringify(result.value));
});

patientRouter.use('/add', express.json());

patientRouter.post('/add', (req, res, next) => {
    validateNameParams(req.body.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await patientController.addPatient(req.body.name);

    res.status(result.status).send(result.value);
});

export default patientRouter;
