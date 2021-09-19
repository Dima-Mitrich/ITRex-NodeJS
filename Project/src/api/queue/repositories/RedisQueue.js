import { promisify } from 'util';
import { REDIS_QUEUE_NAME } from '../../../constants.js';


export default class RedisQueue {
    constructor(queue) {
        this.queue = queue;
        this.redisListName = REDIS_QUEUE_NAME;
    }

    async push(id, spec) {
        console.log(spec);
        const addPatient = promisify(this.queue.rpush).bind(this.queue);
        await addPatient(spec, id);

        return id;
    }

    async shift(spec) {
        const takePatient = promisify(this.queue.lpop).bind(this.queue);
        const patientID = await takePatient(spec);

        return patientID;
    }

    async isEmpty(spec) {
        const takeLength = promisify(this.queue.llen).bind(this.queue);
        const result = await takeLength(spec) === 0;

        return result;
    }

    async closeConnection() {
        await this.queue.quit();
    }
}
