import redis from 'redis';
import config from '../../../config.js';
import { PORTS } from '../../constants.js';

export default function createRedisClient(dataBaseNumber) {
    const client = redis.createClient({
        host: config.app.redisHost,
        port: PORTS.REDIS_PORT,
    });

    client.on('error', (error) => {
        console.error(error);
    });

    client.select(dataBaseNumber);

    client.flushdb();

    return client;
}
