import { MIN_LENGTH, MAX_LENGTH } from '../../../constants.js';

const nameSchema = {
    type: 'string', maxLength: MAX_LENGTH, minLength: MIN_LENGTH,
};

export default nameSchema;
