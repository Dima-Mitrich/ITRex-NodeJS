import express from 'express';
import cookieParser from 'cookie-parser';
import patientController from '../api/patient/controller/PatientController.js';
import authController from '../api/auth/controller/AuthController.js';

const patientRouter = express.Router();

patientRouter.get('/next', async (req, res) => {
    const result = await patientController.shiftPatient();

    res.status(result.status).json(result.value);
});

patientRouter.use('/', cookieParser());

patientRouter.post('/', async (req, res, next) => {
    const userID = await authController.checkToken(req.cookies.jwt);

    if (userID.status === 200) {
        req.userID = userID.value.id;
        next();
    } else {
        res.status(userID.status).json(userID.value);
    }
}, async (req, res) => {
    const result = await patientController.addInQueue(req.userID);

    res.status(result.status).json(result.value);
});

export default patientRouter;
