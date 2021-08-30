import { promisify } from 'util';
import { REDIS_PATIENT_STORAGE_NAME } from '../../../constants.js';

export default class RedisPatient {
    constructor(patientStorage) {
        this.storage = patientStorage;
        this.redisStorageName = REDIS_PATIENT_STORAGE_NAME;
    }

    async push(patient) {
        const addPatient = promisify(this.storage.hset).bind(this.storage);
        await addPatient(this.redisStorageName, patient.id, patient.name);

        return patient;
    }

    async getByName(name) {
        const getByName = promisify(this.storage.hgetall).bind(this.storage);
        const allObj = await getByName(this.redisStorageName);
        let result;
        if (allObj) {
            const keysAndValuesArray = Object.entries(allObj);
            keysAndValuesArray.forEach((item) => {
                if (item[1] === name) {
                    [result] = item;
                }
            });
        } else result = allObj;

        return result;
    }

    async getById(id) {
        const getById = promisify(this.storage.hget).bind(this.storage);
        const result = await getById(this.redisStorageName, id);

        return { name: result, id };
    }

    async closeConnection() {
        await this.storage.quit();
    }
}
