import Ajv from 'ajv';
import docIdSchema from '../schemas/docIdSchema.js';
import { STATUSES } from '../../../constants.js';

const ajv = new Ajv();
const validateDoctorId = ajv.compile(docIdSchema);

function doctorIdMiddleware(req, res, next) {
    validateDoctorId(req.body)
        ? next()
        : res.status(STATUSES.BadRequest).json(validateDoctorId.errors);
}

export default doctorIdMiddleware;
