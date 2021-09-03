import createRedisClient from './helpers/createRedisClient.js';
import MySQLResolution from './resolution/repositories/MySQLResolution.js';
import MySQLPatient from './patient/repositories/MySQLPatient.js';
import UserRepository from './auth/repositories/UserRepository.js';
import RedisQueue from './queue/repositories/RedisQueue.js';
import dbInit from '../dbInitialization.js';

function repositoryCreater(mode) {
    if (mode === 'test') return '';

    const client = createRedisClient(0);
    const sequelize = dbInit();

    const patientRepository = new MySQLPatient(sequelize.models.patient);
    const resolutionRepository = new MySQLResolution(sequelize.models.resolution);
    const queueRepository = new RedisQueue(client);
    const userRepository = new UserRepository(sequelize.models.user);

    return {
        patientRepository,
        resolutionRepository,
        queueRepository,
        userRepository,
    };
}

export const {
    patientRepository,
    resolutionRepository,
    queueRepository,
    userRepository,
} = repositoryCreater(process.env.NODE_ENV);
