import { MIN_LENGTH } from '../../../constants.js';

const addResolutionSchema = {
    type: 'object',
    properties: {
        newResolutionContent: { type: 'string', minLength: MIN_LENGTH },
        currentPatient: { type: 'object' },
        ttl: { type: 'boolean' },
        spec: { type: 'string' },
    },
    required: ['newResolutionContent', 'currentPatient', 'ttl'],
    additionalProperties: false,
};

export default addResolutionSchema;
