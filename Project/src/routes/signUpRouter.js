import express from 'express';
import path from 'path';
import authController from '../api/auth/controller/AuthController.js';
import { validateNewUser } from '../api/helpers/validate.js';
import { STATUSES } from '../constants.js';
import calculateAge from '../api/helpers/calculateAge.js';

const signUpRouter = express.Router();
const __dirname = path.resolve();

signUpRouter.use('/', express.urlencoded({ extended: false }));

signUpRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sign-up.html'));
});

signUpRouter.post('/', (req, res, next) => {
    const age = calculateAge(req.body.birthday);
    req.body.age = age;

    validateNewUser(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateNewUser.errors);
}, async (req, res) => {
    const result = await authController.signUpNewPatient(req.body);

    if (result.status === 201) {
        res.redirect('/login');
    } else {
        res.status(result.status).send(result.value);
    }
});

export default signUpRouter;
