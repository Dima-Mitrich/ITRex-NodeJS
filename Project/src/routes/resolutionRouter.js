import express from 'express';
import cookieParser from 'cookie-parser';
import { STATUSES } from '../constants.js';
import resolutionController from '../api/resolution/controller/ResolutionController.js';
import authController from '../api/auth/controller/AuthController.js';
import { validateNewResolution, validateNameParams, validateIdParams } from '../api/helpers/validate.js';

const resolutionRouter = express.Router();

resolutionRouter.use('/', express.json());

resolutionRouter.post('/', (req, res, next) => {
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
    const result = await resolutionController.findResolution({ name: req.params.name }, req.headers.isdoctor);

    res.status(result.status).send(result.value);
});

resolutionRouter.use('/', cookieParser());

resolutionRouter.get('/', async (req, res, next) => {
    const userID = await authController.checkToken(req.cookies.jwt);

    if (userID.status === 200) {
        req.userID = userID.value.id;
        next();
    } else {
        res.status(userID.status).json(userID.value);
    }
}, async (req, res) => {
    const result = await resolutionController.findResolution({ userID: req.userID }, false);

    res.status(result.status).json(result.value);
});

export default resolutionRouter;
