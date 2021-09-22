import { MIN_LENGTH, MAX_LENGTH } from '../../../constants.js';

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

export default newUserSchema;
