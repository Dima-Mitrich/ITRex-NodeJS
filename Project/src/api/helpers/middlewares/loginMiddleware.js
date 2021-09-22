import Ajv from 'ajv';
import loginSchema from '../schemas/loginSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateUserLogin = ajv.compile(loginSchema);

function loginMiddleware(req, res, next) {
    validateUserLogin(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateUserLogin.errors);
}

export default loginMiddleware;
