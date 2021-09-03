import express from 'express';
import path from 'path';
import authController from '../api/auth/controller/AuthController.js';
import { validateUserLogin } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const loginRouter = express.Router();
const __dirname = path.resolve();

loginRouter.use('/', express.json());

loginRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sign-in.html'));
});

loginRouter.post('/', (req, res, next) => {
    validateUserLogin(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateUserLogin.errors);
}, async (req, res) => {
    const result = await authController.signInUser(req.body);

    if (result.status === 200) {
        res.cookie('jwt', `${result.value}`, {
            httpOnly: true,
            // expires: new Date(Date.now() + parseInt(config.app.jwtExpTime, 10)), спросить стоит ли ставить такое время
        });
        res.status(result.status).json('success');
    } else {
        res.status(result.status).json(result.value);
    }
});

export default loginRouter;
