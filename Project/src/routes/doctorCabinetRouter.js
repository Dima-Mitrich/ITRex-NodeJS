import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import authController from '../api/auth/controller/AuthController.js';
import { USER_TYPE } from '../constants.js';

const __dirname = path.resolve();
const doctorCabinetRouter = express.Router();

doctorCabinetRouter.use('/', cookieParser());

doctorCabinetRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwtDoctor);

    const checkRole = ((result.value.role).toString() === (USER_TYPE.DOCTOR).toString());

    if (result.status === 200 && checkRole) {
        res.sendFile(path.resolve(__dirname, 'public', 'doctor-cabinet.html'));
    } else {
        res.redirect('/login');
    }
});

export default doctorCabinetRouter;
