import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'
const storageType = process.env.STORAGE_TYPE;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        storageType,
    },
};
const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT, 10) || 3000,
        TTL_MILSEC: 1000,
        storageType,
    },
};

const config = {
    dev,
    test,
};

export default config[env];
