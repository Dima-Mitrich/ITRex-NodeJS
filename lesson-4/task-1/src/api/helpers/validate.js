import Ajv from 'ajv';

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
    type: 'string', maxLength: 20,
};

export const validateNewResolution = ajv.compile(addResolutionSchema);
export const validateNameParams = ajv.compile(nameSchema);
