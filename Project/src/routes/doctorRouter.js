import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { doctorData, specData } from '../api/helpers/doctorsData.js';
import { STATUSES, USER_TYPE } from '../constants.js';

import doctorController from '../api/doktor/controller/DoctorController.js';
import authController from '../api/auth/controller/AuthController.js';

const __dirname = path.resolve();
const doctorRouter = express.Router();

doctorRouter.use('/', cookieParser());

doctorRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtDoctor);
    const checkRole = ((result.value.role).toString() === (USER_TYPE.DOCTOR).toString());

    if (result.status === 200 && checkRole) {
        res.sendFile(path.resolve(__dirname, 'public', 'doctor-cabinet.html'));
    } else {
        res.redirect('/login');
    }
});

doctorRouter.get('/add-doctors', async (req, res) => {
    for (const elem of specData) {
        await doctorController.addSpec(elem);
    }

    for (const elem of doctorData) {
        elem.role = USER_TYPE.DOCTOR;
        await authController.signUpNewUser(elem);
    }

    res.status(200).send('ok');
});

doctorRouter.get('/doctor-data', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtDoctor);
    const doctorSpecs = await doctorController.getSpecByUserId(result.value.id);

    result.status === 200
        ? res.status(doctorSpecs.status).json(doctorSpecs.value)
        : res.status(STATUSES.BadRequest).json(doctorSpecs.value);
});

doctorRouter.get('/spec-list', async (req, res) => {
    const result = await doctorController.getSpecList();

    res.status(result.status).json(result.value);
});

export default doctorRouter;
