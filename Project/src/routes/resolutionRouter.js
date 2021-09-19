import express from 'express';
import cookieParser from 'cookie-parser';
import { STATUSES } from '../constants.js';
import resolutionController from '../api/resolution/controller/ResolutionController.js';
import authController from '../api/auth/controller/AuthController.js';
import { validateNewResolution, validateNameParams, validateIdParams } from '../api/helpers/validate.js';
import checkTokenPatient from '../api/helpers/checkTokenPatient.js';
import checkTokenDoctor from '../api/helpers/checkTokenDoktor.js';

const resolutionRouter = express.Router();

resolutionRouter.use('/', express.json());
resolutionRouter.use('/', cookieParser());
resolutionRouter.use('/', express.json());

resolutionRouter.post('/', checkTokenDoctor, (req, res, next) => {
    validateNewResolution(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).send(validateNewResolution.errors);
}, async (req, res) => {
    const {
        newResolutionContent, currentPatient, ttl, spec,
    } = req.body;
    const { userID } = req;
    const resData = {
        resolution: newResolutionContent,
        patientID: currentPatient.id,
        ttl,
        userID,
        spec,
    };
    const result = await resolutionController.addResolution(resData);

    res.status(result.status).send(result.value);
});

resolutionRouter.delete('/:resID', (req, res, next) => {
    validateIdParams(req.params.resID)
        ? next()
        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.deleteResolution(req.params.resID);

    res.status(result.status).send(result.value);
});

resolutionRouter.get('/:name', checkTokenDoctor, (req, res, next) => {
    validateNameParams(req.params.name)
        ? next()
        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.findResolutionsByName({ name: req.params.name, role: req.role });

    res.status(result.status).send(result.value);
});

resolutionRouter.get('/', checkTokenPatient, async (req, res) => {

    const result = await resolutionController.findResolutionsByUserId({ userID: req.userID, role: req.role });

    res.status(result.status).json(result.value);
});

export default resolutionRouter;
