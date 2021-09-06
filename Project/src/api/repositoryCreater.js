import createRedisClient from './helpers/createRedisClient.js';
import MySQLResolution from './resolution/repositories/MySQLResolution.js';
import MySQLPatient from './patient/repositories/MySQLPatient.js';
import UserRepository from './auth/repositories/UserRepository.js';
import RedisQueue from './queue/repositories/RedisQueue.js';
import dbInit from '../dbInitialization.js';

function repositoryCreater(mode) {
    if (mode === 'test') {
        return {
            patientRepository: new MySQLPatient(),
            resolutionRepository: new MySQLResolution(),
            queueRepository: new RedisQueue(),
            userRepository: new UserRepository(),
        };
    }

    const client = createRedisClient(0);
    const sequelize = dbInit();

    return {
        patientRepository: new MySQLPatient(sequelize.models.patient),
        resolutionRepository: new MySQLResolution(sequelize.models.resolution),
        queueRepository: new RedisQueue(client),
        userRepository: new UserRepository(sequelize.models.user),
    };
}

export const {
    patientRepository,
    resolutionRepository,
    queueRepository,
    userRepository,
} = repositoryCreater(process.env.NODE_ENV);
