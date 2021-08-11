import Ajv from 'ajv';
import { MAX_LENGTH, MIN_LENGTH } from '../../constants.js';

const ajv = new Ajv();

const addResolutionSchema = {
    type: 'object',
    properties: {
        newResolutionContent: { type: 'string' },
        currentPatient: { type: 'object' },
        ttl: { type: 'boolean' },
    },
    required: ['newResolutionContent', 'currentPatient', 'ttl'],
    additionalProperties: false,
};

const nameSchema = {
    type: 'string', maxLength: MAX_LENGTH, minLength: MIN_LENGTH,
};

export const validateNewResolution = ajv.compile(addResolutionSchema);
export const validateNameParams = ajv.compile(nameSchema);
