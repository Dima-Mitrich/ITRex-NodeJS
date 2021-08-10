import express from 'express';
import * as queue from '../api/controllers/queueController.js';
import * as resolution from '../api/controllers/resolutionController.js';
import { validateNewResolution, validateNameParams } from '../api/helpers/validate.js';

const docRouter = express.Router();

docRouter.use('/addResolution', express.json());

docRouter.get('/next', queue.getPatient);

docRouter.post('/addResolution', (req, res) => {
    if (validateNewResolution(req.body)) {
        const { newResolutionContent, currentPatient, ttl } = req.body;

        const result = resolution.addResolution(newResolutionContent, currentPatient, ttl);

        if (result) {
            res.status(200).send('resolution was succefully added');
        } else {
            res.status(500).send('sorry, cant add resolution at the moment');
        }
    } else {
        res.status(400).send(validateNewResolution.errors);
    }
});

docRouter.delete('/deleteResolution/:name', (req, res) => {
    if (validateNameParams(req.params.name)) {
        const result = resolution.deleteResolution(req.params.name);

        if (result) {
            res.status(200).send('resolution was succefully deleted');
        } else {
            res.status(500).send('sorry, cant delete resolution at the moment');
        }
    } else {
        res.status(400).send(validateNameParams.errors);
    }
});

docRouter.get('/resolution/:name', (req, res) => {
    if (validateNameParams(req.params.name)) {
        const result = resolution.findResolution(req.params.name, req.headers.isdoctor);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('sorry, cant delete resolution at the moment');
        }
    } else {
        res.status(400).send(validateNameParams.errors);
    }
});

export default docRouter;
