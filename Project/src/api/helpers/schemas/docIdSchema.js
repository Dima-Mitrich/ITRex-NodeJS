import { MIN_LENGTH } from '../../../constants.js';

const docIdSchema = {
    type: 'object',
    properties: {
        docID: { type: 'string', minLength: MIN_LENGTH },
    },
    required: ['docID'],
    additionalProperties: false,
};

export default docIdSchema;
