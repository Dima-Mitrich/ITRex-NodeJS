import Ajv from 'ajv';
import { MAX_LENGTH, MIN_LENGTH } from '../../constants.js';

const ajv = new Ajv();

const addResolutionSchema = {
    type: 'object',
    properties: {
        newResolutionContent: { type: 'string' },
        currentPatient: { type: 'object' },
        ttl: { type: 'boolean' },
        spec: { type: 'string' },
    },
    required: ['newResolutionContent', 'currentPatient', 'ttl'],
    additionalProperties: false,
};

const nameSchema = {
    type: 'string', maxLength: MAX_LENGTH, minLength: MIN_LENGTH,
};

const idSchema = {
    type: 'string', minLength: MIN_LENGTH,
};

const newUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', maxLength: MAX_LENGTH, minLength: MIN_LENGTH },
        email: { type: 'string' },
        birthday: { type: 'string' },
        gender: { type: 'string' },
        password: { type: 'string', minLength: MIN_LENGTH },
    },
    required: ['name', 'email', 'birthday', 'gender', 'password'],
    additionalProperties: false,
};

const userLoginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', minLength: MIN_LENGTH },
        password: { type: 'string', minLength: MIN_LENGTH },
        role: { type: 'string' },
    },
    required: ['email', 'password', 'role'],
    additionalProperties: false,
};

export const validateNewResolution = ajv.compile(addResolutionSchema);
export const validateNameParams = ajv.compile(nameSchema);
export const validateIdParams = ajv.compile(idSchema);
export const validateNewUser = ajv.compile(newUserSchema);
export const validateUserLogin = ajv.compile(userLoginSchema);
