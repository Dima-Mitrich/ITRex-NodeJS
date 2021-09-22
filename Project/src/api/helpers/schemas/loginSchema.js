import { MIN_LENGTH } from '../../../constants.js';

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

export default userLoginSchema;
