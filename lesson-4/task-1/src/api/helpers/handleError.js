import ResultWrapper from './resultDecorator.js';

export default function handleError(result, statusError, statusSucces) {
    if (result instanceof Error) {
        return new ResultWrapper(statusError, result);
    } else {
        return new ResultWrapper(statusSucces, result);
    }
}
