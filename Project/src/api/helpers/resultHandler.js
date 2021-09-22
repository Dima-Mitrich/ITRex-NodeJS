/* eslint-disable */
import ResultWrapper from './resultWrapper.js';
import {
    STATUSES, NOT_FOUND_MESSAGE, BAD_REQUEST_MESSAGE, NAME_IS_EXIST, EMAIL_IS_EXIST,
    WRONG_PASSWORD_MESSAGE, WRONG_EMAIL_MESSAGE, NO_TOKEN_MESSAGE, JWT_EXPIRED_MESSAGE,
    WRONG_BIRTHDAY_DATE, NO_RIGHTS_TO_RESOLUTION_DELETE,
} from '../../constants.js';

export default function resultHandler(result, statusSucces = STATUSES.OK) {
    let statusError = null;

    if (result instanceof Error) {
        switch (result.message) {
            case NOT_FOUND_MESSAGE:
                statusError = STATUSES.NotFound;
                break;
            case BAD_REQUEST_MESSAGE:
                statusError = STATUSES.BadRequest;
                break;
            case WRONG_PASSWORD_MESSAGE:
                statusError = STATUSES.Unauthorized;
                break;
            case WRONG_EMAIL_MESSAGE:
                statusError = STATUSES.Unauthorized;
                break;
            case JWT_EXPIRED_MESSAGE:
                statusError = STATUSES.Forbidden;
                break;
            case NO_TOKEN_MESSAGE:
                statusError = STATUSES.Forbidden;
                break;
            case NAME_IS_EXIST:
                statusError = STATUSES.BadRequest;
                break;
            case EMAIL_IS_EXIST:
                statusError = STATUSES.BadRequest;
                break;
            case WRONG_BIRTHDAY_DATE:
                statusError = STATUSES.BadRequest;
                break;
            case NO_RIGHTS_TO_RESOLUTION_DELETE:
                statusError = STATUSES.Forbidden;
                break;
            default:
                statusError = STATUSES.ServerError;
        }
        return new ResultWrapper(statusError, result);
    } else {
        return new ResultWrapper(statusSucces, result);
    }
}
