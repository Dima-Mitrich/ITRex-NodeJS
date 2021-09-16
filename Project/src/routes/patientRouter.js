import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import patientController from '../api/patient/controller/PatientController.js';
import authController from '../api/auth/controller/AuthController.js';
import { STATUSES, USER_TYPE } from '../constants.js';
import { validateDoctorSpec } from '../api/helpers/validate.js';

const patientRouter = express.Router();
const __dirname = path.resolve();

patientRouter.use('/', cookieParser());
patientRouter.use('/', express.json());

patientRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtPatient);

    const checkRole = ((result.value.role).toString() === (USER_TYPE.PATIENT).toString());

    if (result.status === 200 && checkRole) {
        res.sendFile(path.resolve(__dirname, 'public', 'patient-cabinet.html'));
    } else {
        res.redirect('/login');
    }
});

patientRouter.get('/next', async (req, res) => {
    const result = await patientController.shiftPatient(req.query.spec);

    res.status(result.status).json(result.value);
});

patientRouter.post('/', (req, res, next) => {

    console.log(validateDoctorSpec(req.body));
    validateDoctorSpec(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateDoctorSpec.errors);
}, async (req, res, next) => {
    console.log(req.body);
    const userID = await authController.checkToken(req.cookies.jwtPatient);
    const { spec } = req.body;

    if (userID.status === 200) {
        req.userID = userID.value.id;
        req.spec = spec;
        next();
    } else {
        res.status(userID.status).json(userID.value);
    }
}, async (req, res) => {
    const result = await patientController.addInQueue(req.userID, req.spec);

    res.status(result.status).json(result.value);
});

export default patientRouter;
