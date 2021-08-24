import redis from 'redis';
import config from '../../../config.js';
import InMemoryPatient from '../repositories/InMemoryPatient.js';
import InMemoryResolution from '../repositories/InMemoryResolution.js';
import RedisPatient from '../repositories/RedisPatient.js';
import RedisResolution from '../repositories/RedisResolution.js';
import MySQLResolution from '../repositories/MySQLResolution.js';
import MySQLPatient from '../repositories/MySQLPatient.js';
import { Resolution, Patient } from '../../model.js';
import { REDIS_STORAGE_NAME, IN_MEMORY_STORAGE_NAME, MY_SQL_STORAGE_NAME } from '../../constants.js';

class StorageFactory {
    create(type) {
        let patientRepository = null;
        let resolutionRepository = null;

        if (type === REDIS_STORAGE_NAME) {
            const clientPatient = redis.createClient();
            const clientResolution = redis.createClient();

            clientPatient.on('error', (error) => {
                console.error(error);
            });

            clientResolution.on('error', (error) => {
                console.error(error);
            });

            clientPatient.select(0);
            clientResolution.select(1);

            clientResolution.flushdb();
            clientPatient.flushdb();

            patientRepository = new RedisPatient(clientPatient);
            resolutionRepository = new RedisResolution(clientResolution);
        } else if (type === IN_MEMORY_STORAGE_NAME) {
            const patientStorage = [];
            const resolutionStorage = {};

            patientRepository = new InMemoryPatient(patientStorage);
            resolutionRepository = new InMemoryResolution(resolutionStorage);
        } else if (type === MY_SQL_STORAGE_NAME) {
            patientRepository = new MySQLPatient(Patient);
            resolutionRepository = new MySQLResolution(Resolution);
        }

        return { patientRepository, resolutionRepository };
    }
}

const factory = new StorageFactory();
export const { patientRepository, resolutionRepository } = factory.create(config.app.storageType);
