import config from '../config.js';

export const MAX_LENGTH = 20;

export const MIN_LENGTH = 2;

export const { TTL_MILSEC } = config.app;

export const REDIS_QUEUE_NAME = 'queuePatient';

export const REDIS_STORAGE_NAME = 'redis';

export const IN_MEMORY_STORAGE_NAME = 'inMemory';

export const STATUSES = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    NotFound: 404,
    RequestTimeout: 408,
    ServerError: 500,
    Unavailable: 503,
};
