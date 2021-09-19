import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        password: process.env.PASSWORD,
        userName: process.env.USER_NAME,
        redisHost: process.env.REDIS_HOST,
        sqlHost: process.env.SQL_HOST,
        secretKey: process.env.SECRET_JWT_KEY,
        jwtExpTime: '15m',
    },
};
const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT, 10) || 3000,
        TTL_MILSEC: 1000,
        password: process.env.PASSWORD,
        userName: process.env.USER_NAME,
        redisHost: process.env.REDIS_HOST,
        sqlHost: process.env.SQL_HOST,
        secretKey: process.env.SECRET_JWT_KEY,
        jwtExpTime: '15m',
    },
};

const config = {
    dev,
    test,
};

export default config[env];
