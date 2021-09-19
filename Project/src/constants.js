import config from '../config.js';

export const MAX_LENGTH = 20;

export const MIN_LENGTH = 2;

export const { TTL_MILSEC } = config.app;

export const REDIS_QUEUE_NAME = 'queuePatient';

export const REDIS_PATIENT_STORAGE_NAME = 'storagePatient';

export const REDIS_STORAGE_NAME = 'redis';

export const IN_MEMORY_STORAGE_NAME = 'inMemory';

export const MY_SQL_STORAGE_NAME = 'mySQL';

export const SUCCESS_MESSAGE = 'success';

export const NOT_FOUND_MESSAGE = 'not found';

export const BAD_REQUEST_MESSAGE = 'bad request';

export const WRONG_PASSWORD_MESSAGE = 'wrong password';

export const WRONG_EMAIL_MESSAGE = 'wrong email';

export const JWT_EXPIRED_MESSAGE = 'jwt expired';

export const NO_TOKEN_MESSAGE = 'no token';

export const NAME_IS_EXIST = 'such name is exist';

export const EMAIL_IS_EXIST = 'such email is exist';

export const WRONG_BIRTHDAY_DATE = 'invalid birthday date';

export const STATUSES = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    NotFound: 404,
    RequestTimeout: 408,
    ServerError: 500,
    Unavailable: 503,
    Forbidden: 403,
    Unauthorized: 401,
};

export const PORTS = {
    REDIS_PORT: 6379,
    SQL_PORT: 3306,
    APP_PORT: config.app.port,
};

export const USER_TYPE = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
};
