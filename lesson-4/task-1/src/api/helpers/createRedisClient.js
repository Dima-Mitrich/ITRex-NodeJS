import redis from 'redis';

export default function createRedisClient(dataBaseNumber) {
    const client = redis.createClient();

    client.on('error', (error) => {
        console.error(error);
    });

    client.select(dataBaseNumber);

    client.flushdb();

    return client;
}
