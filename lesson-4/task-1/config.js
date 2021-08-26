import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'
const storageType = process.env.STORAGE_TYPE; // 'redis' or 'inMemory'
const password = process.env.PASSWORD;
const userName = process.env.USER_NAME;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        storageType,
        password,
        userName,
    },
};
const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT, 10) || 3000,
        TTL_MILSEC: 1000,
        storageType,
        password,
        userName,
    },
};

const config = {
    dev,
    test,
};

export default config[env];