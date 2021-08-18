import express from 'express';
import resolutionController from '../api/controllers/resolutionController.js';
import { validateNameParams } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const commonRouter = express.Router();

commonRouter.get('/resolution/:name', (req, res, next) => {
    validateNameParams(req.params.name)

        ? next()

        : res.status(STATUSES.BadRequest).send(validateNameParams.errors);
}, async (req, res) => {
    const result = await resolutionController.findResolution(req.params.name, req.headers.isdoctor);

    res.status(result.status).send(result.value);
});

export default commonRouter;
