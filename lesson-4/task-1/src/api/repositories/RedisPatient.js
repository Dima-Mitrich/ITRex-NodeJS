import { promisify } from 'util';
import { REDIS_QUEUE_NAME } from '../../constants.js';

export default class RedisPatient {
    constructor(patientStorage) {
        this.queue = patientStorage;
        this.redisListName = REDIS_QUEUE_NAME;
    }

    async push(patient) {
        const addPatient = promisify(this.queue.rpush).bind(this.queue);
        await addPatient(this.redisListName, JSON.stringify(patient)); // stringify better in service

        return patient;
    }

    async shift() {
        const takePatient = promisify(this.queue.lpop).bind(this.queue);
        const patient = await takePatient(this.redisListName);

        return JSON.parse(patient); // parse better in service
    }

    async isEmpty() {
        const takeLength = promisify(this.queue.llen).bind(this.queue);
        const result = await takeLength(this.redisListName) === 0;

        return result;
    }

    async closeConnection() {
        await this.queue.quit();
    }
}
