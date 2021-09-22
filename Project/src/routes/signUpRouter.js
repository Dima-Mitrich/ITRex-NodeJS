import express from 'express';
import path from 'path';
import authController from '../api/auth/controller/AuthController.js';
import newUserMiddleware from '../api/helpers/middlewares/newUserMiddleware.js';
import { USER_TYPE } from '../constants.js';

const signUpRouter = express.Router();
const __dirname = path.resolve();

signUpRouter.use('/', express.urlencoded({ extended: false }));

signUpRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sign-up.html'));
});

signUpRouter.post('/', newUserMiddleware, async (req, res) => {
    req.body.role = USER_TYPE.PATIENT;
    const result = await authController.signUpNewUser(req.body);

    if (result.status === 201) {
        res.redirect('/login');
    } else {
        res.status(result.status).json(result.value);
    }
});

export default signUpRouter;
