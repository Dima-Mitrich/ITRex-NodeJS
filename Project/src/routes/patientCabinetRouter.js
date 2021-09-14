import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import authController from '../api/auth/controller/AuthController.js';
import { USER_TYPE } from '../constants.js';

const __dirname = path.resolve();
const patientCabinetRouter = express.Router();

patientCabinetRouter.use('/', cookieParser());

patientCabinetRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtPatient);

    const checkRole = ((result.value.role).toString() === (USER_TYPE.PATIENT).toString());

    if (result.status === 200 && checkRole) {
        res.sendFile(path.resolve(__dirname, 'public', 'patient-cabinet.html'));
    } else {
        res.redirect('/login');
    }

});

export default patientCabinetRouter;
