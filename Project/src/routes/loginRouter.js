import express from 'express';
import path from 'path';
import authController from '../api/auth/controller/AuthController.js';
import loginMiddleware from '../api/helpers/middlewares/loginMiddleware.js';
import { USER_TYPE } from '../constants.js';

const loginRouter = express.Router();
const __dirname = path.resolve();

loginRouter.use('/', express.json());

loginRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sign-in.html'));
});

loginRouter.post('/', loginMiddleware, async (req, res) => {
    const checkRole = req.body.role === USER_TYPE.PATIENT;

    const result = await authController.signInUser(req.body);

    if (result.status === 200 && checkRole) {
        res.cookie('jwtPatient', `${result.value}`, {
            httpOnly: true,
            // expires: new Date(Date.now() + parseInt(config.app.jwtExpTime, 10)),
        });

        res.status(result.status).json(req.body.role);
    } else if (result.status === 200 && !checkRole) {
        res.cookie('jwtDoctor', `${result.value}`, {
            httpOnly: true,
            // expires: new Date(Date.now() + parseInt(config.app.jwtExpTime, 10)),
        });

        res.status(result.status).json(req.body.role);
    } else {
        res.status(result.status).json(result.value);
    }
});

export default loginRouter;
