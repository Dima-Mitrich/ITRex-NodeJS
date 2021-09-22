import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import patientController from '../api/patient/controller/PatientController.js';
import authController from '../api/auth/controller/AuthController.js';
import { USER_TYPE } from '../constants.js';
import doctorIdMiddleware from '../api/helpers/middlewares/doctorIdMiddleware.js';
import doctorController from '../api/doctor/controller/DoctorController.js';

const patientRouter = express.Router();
const __dirname = path.resolve();

patientRouter.use('/', cookieParser());
patientRouter.use('/', express.json());

patientRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtPatient);

    const checkRole = result.value.role === USER_TYPE.PATIENT;

    if (result.status === 200 && checkRole) {
        res.sendFile(path.resolve(__dirname, 'public', 'patient-cabinet.html'));
    } else {
        res.redirect('/login');
    }
});

patientRouter.get('/next', async (req, res) => {
    const token = await authController.checkToken(req.cookies.jwtDoctor);
    const doc = await doctorController.getDoctor({ userID: token.value.id });
    const result = await patientController.shiftPatient(doc.value.id);

    res.status(result.status).json(result);
});

patientRouter.post('/', doctorIdMiddleware, async (req, res, next) => {
    const userID = await authController.checkToken(req.cookies.jwtPatient);
    const { docID } = req.body;

    if (userID.status === 200) {
        req.userID = userID.value.id;
        req.docID = docID;
        next();
    } else {
        res.status(userID.status).json(userID.value);
    }
}, async (req, res) => {
    const result = await patientController.addInQueue(req.userID, req.docID);

    res.status(result.status).json(result.value);
});

export default patientRouter;
