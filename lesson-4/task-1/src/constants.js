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

export const STATUSES = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    NotFound: 404,
    RequestTimeout: 408,
    ServerError: 500,
    Unavailable: 503,
};

export const PORTS = {
    REDIS_PORT: 6379,
    SQL_PORT: 3306,
    APP_PORT: config.app.port,
};
