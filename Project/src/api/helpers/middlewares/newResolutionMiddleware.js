import Ajv from 'ajv';
import newResolutionSchema from '../schemas/newResolutionSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateNewResolution = ajv.compile(newResolutionSchema);

function newResolutionMiddleware(req, res, next) {
    validateNewResolution(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateNewResolution.errors);
}

export default newResolutionMiddleware;
