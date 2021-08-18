import { promisify } from 'util';
import patientStorage from '../../database/patient-storage.js';
import Patient from '../../interface/Patient.js';
import { REDIS_QUEUE_NAME } from '../../../constants.js';

export default class RedisPatientStorageService {
    constructor() {
        this.queue = patientStorage;
        this.redisListName = REDIS_QUEUE_NAME;
    }

    async addPatient(name) {
        const patient = new Patient(name);

        const addPatient = promisify(this.queue.rpush).bind(this.queue);

        try {
            await addPatient(this.redisListName, JSON.stringify(patient));

            return patient;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async takePatient() {
        const takePatient = promisify(this.queue.lpop).bind(this.queue);

        try {
            const patient = await takePatient(this.redisListName);

            return JSON.parse(patient);
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isEmpty() {
        const takeLength = promisify(this.queue.llen).bind(this.queue);
        const result = await takeLength(this.redisListName) === 0;

        return result;
    }

    async size() {
        const takeLength = promisify(this.queue.llen).bind(this.queue);
        try {
            const size = await takeLength(this.redisListName);

            return size;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}
