import config from '../../../config.js';
import createRedisClient from '../helpers/createRedisClient.js';
import InMemoryPatient from '../repositories/patientRepositories/InMemoryPatient.js';
import InMemoryResolution from '../repositories/resolutionRepositories/InMemoryResolution.js';
import RedisPatient from '../repositories/patientRepositories/RedisPatient.js';
import RedisResolution from '../repositories/resolutionRepositories/RedisResolution.js';
import MySQLResolution from '../repositories/resolutionRepositories/MySQLResolution.js';
import MySQLPatient from '../repositories/patientRepositories/MySQLPatient.js';
import InMemoryQueue from '../repositories/queueRepositories/InMemoryQueue.js';
import RedisQueue from '../repositories/queueRepositories/RedisQueue.js';
import dbInit from '../../dbInitialization.js';
import { REDIS_STORAGE_NAME, IN_MEMORY_STORAGE_NAME, MY_SQL_STORAGE_NAME } from '../../constants.js';

class StorageFactory {
    create(type) {
        let patientRepository = null;
        let resolutionRepository = null;
        let queueRepository = null;

        if (type === REDIS_STORAGE_NAME) {
            const client = createRedisClient(0);

            patientRepository = new RedisPatient(client);
            resolutionRepository = new RedisResolution(client);
            queueRepository = new RedisQueue(client);
        } else if (type === IN_MEMORY_STORAGE_NAME) {
            const patientStorage = [];
            const resolutionStorage = {};
            const queue = [];

            patientRepository = new InMemoryPatient(patientStorage);
            resolutionRepository = new InMemoryResolution(resolutionStorage);
            queueRepository = new InMemoryQueue(queue);
        } else if (type === MY_SQL_STORAGE_NAME) {
            const client = createRedisClient(0);
            const sequelize = dbInit();
            patientRepository = new MySQLPatient(sequelize.models.patient);
            resolutionRepository = new MySQLResolution(sequelize.models.resolution);
            queueRepository = new RedisQueue(client);
        }

        return { patientRepository, resolutionRepository, queueRepository };
    }
}

const factory = new StorageFactory();
export const { patientRepository, resolutionRepository, queueRepository } = factory.create(config.app.storageType);
