/* eslint-disable */
import ResultWrapper from '../interface/ResultWrapper.js';
import { STATUSES, NOT_FOUND_MESSAGE } from '../../constants.js';

export default function handleError(result, statusSucces) {
    let statusError = null;

    if (result instanceof Error) {
        switch (result.message) {
            case NOT_FOUND_MESSAGE:
                statusError = STATUSES.NotFound;
                break;
            default:
                statusError = STATUSES.ServerError;
        }
        return new ResultWrapper(statusError, result);
    } else {
        return new ResultWrapper(statusSucces, result);
    }
}
