import Ajv from 'ajv';
import newUserSchema from '../schemas/newUserSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateNewUser = ajv.compile(newUserSchema);

function newUserMiddleware(req, res, next) {
    validateNewUser(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateNewUser.errors);
}

export default newUserMiddleware;
