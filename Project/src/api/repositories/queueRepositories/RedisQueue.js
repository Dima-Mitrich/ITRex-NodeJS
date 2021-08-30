import { promisify } from 'util';
import { REDIS_QUEUE_NAME } from '../../../constants.js';

export default class RedisQueue {
    constructor(queue) {
        this.queue = queue;
        this.redisListName = REDIS_QUEUE_NAME;
    }

    async push(id) {
        const addPatient = promisify(this.queue.rpush).bind(this.queue);
        await addPatient(this.redisListName, id);

        return id;
    }

    async shift() {
        const takePatient = promisify(this.queue.lpop).bind(this.queue);
        const patientID = await takePatient(this.redisListName);

        return patientID;
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
