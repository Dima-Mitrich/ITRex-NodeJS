import Ajv from 'ajv';
import nameSchema from '../schemas/nameSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateNameParams = ajv.compile(nameSchema);

function nameValidateMiddleware(req, res, next) {
    validateNameParams(req.params.name)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateNameParams.errors);
}

export default nameValidateMiddleware;
