import Ajv from 'ajv';
import idSchema from '../schemas/idSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateIdParams = ajv.compile(idSchema);

function idValidateMiddleware(req, res, next) {
    validateIdParams(req.params.id)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateIdParams.errors);
}

export default idValidateMiddleware;
