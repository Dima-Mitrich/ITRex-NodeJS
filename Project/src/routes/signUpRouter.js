import express from 'express';
import path from 'path';
import authController from '../api/auth/controller/AuthController.js';
import { validateNewUser } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';

const signUpRouter = express.Router();
const __dirname = path.resolve();

signUpRouter.use('/', express.urlencoded({ extended: false }));

signUpRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sign-up.html'));
});

signUpRouter.post('/', (req, res, next) => {
    validateNewUser(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateNewUser.errors);
}, async (req, res) => {
    const result = await authController.signUpNewPatient(req.body);

    if (result.status === 201) {
        res.redirect('/login');
    } else {
        res.status(result.status).json(result.value);
    }
});

export default signUpRouter;
