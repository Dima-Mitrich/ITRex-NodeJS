import { promisify } from 'util';
import { REDIS_QUEUE_NAME } from '../../../constants.js';

export default class RedisQueue {
    constructor(queue) {
        this.queue = queue;
        this.redisListName = REDIS_QUEUE_NAME;
    }

    async push(id, docID) {
        const addPatient = promisify(this.queue.rpush).bind(this.queue);
        await addPatient(docID, id);

        return id;
    }

    async shift(docID) {
        const takePatient = promisify(this.queue.lpop).bind(this.queue);
        const patientID = await takePatient(docID);

        return patientID;
    }

    async isEmpty(docID) {
        const takeLength = promisify(this.queue.llen).bind(this.queue);
        const result = await takeLength(docID) === 0;

        return result;
    }

    async closeConnection() {
        await this.queue.quit();
    }
}
