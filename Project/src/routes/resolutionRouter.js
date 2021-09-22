import express from 'express';
import cookieParser from 'cookie-parser';
import resolutionController from '../api/resolution/controller/ResolutionController.js';
import authController from '../api/auth/controller/AuthController.js';
import newResolutionMiddleware from '../api/helpers/middlewares/newResolutionMiddleware.js';
import idValidateMiddleware from '../api/helpers/middlewares/idValidateMiddleware.js';
import nameValidateMiddleware from '../api/helpers/middlewares/nameValidateMiddleware.js';
import checkTokenPatient from '../api/helpers/middlewares/checkTokenPatient.js';
import checkTokenDoctor from '../api/helpers/middlewares/checkTokenDoctor.js';

const resolutionRouter = express.Router();

resolutionRouter.use('/', express.json());
resolutionRouter.use('/', cookieParser());

resolutionRouter.post('/', checkTokenDoctor, newResolutionMiddleware, async (req, res) => {
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

resolutionRouter.delete('/:id', idValidateMiddleware, async (req, res) => {
    const doc = await authController.checkToken(req.cookies.jwtDoctor);
    const result = await resolutionController.deleteResolution(req.params.id, doc.value.id);

    res.status(result.status).send(result.value);
});

resolutionRouter.get('/me', checkTokenPatient, async (req, res) => {
    const result = await resolutionController.findResolutionsByUserId({ userID: req.userID, role: req.role });

    res.status(result.status).json(result.value);
});

resolutionRouter.get('/:name', checkTokenDoctor, nameValidateMiddleware, async (req, res) => {
    const result = await resolutionController.findResolutionsByName({ name: req.params.name, role: req.role });

    res.status(result.status).send(result.value);
});

export default resolutionRouter;
