import createRedisClient from './helpers/createRedisClient.js';
import MySQLResolution from './resolution/repositories/MySQLResolution.js';
import MySQLPatient from './patient/repositories/MySQLPatient.js';
import MySQLDoctor from './doktor/repositories/MySQLDoctor.js';
import UserRepository from './users/repositories/UserRepository.js';
import RedisQueue from './queue/repositories/RedisQueue.js';
import dbInit from '../dbInitialization.js';
import MySQLSpecialization from './specialization/repositories/MySQLSpecialization.js';

function repositoryCreater(mode) {
    if (mode === 'test') {
        return {
            patientRepository: new MySQLPatient(),
            resolutionRepository: new MySQLResolution(),
            queueRepository: new RedisQueue(),
            userRepository: new UserRepository(),
            doctorRepository: new MySQLDoctor(),
            specializationRepository: new MySQLSpecialization(),
        };
    }

    const client = createRedisClient(0);
    const sequelize = dbInit();

    return {
        patientRepository: new MySQLPatient(sequelize.models.patient),
        resolutionRepository: new MySQLResolution(
            sequelize.models.resolution,
            sequelize.models.patient,
            sequelize.models.doctor,
            sequelize.models.user,
        ),
        queueRepository: new RedisQueue(client),
        userRepository: new UserRepository(sequelize.models.user),
        doctorRepository: new MySQLDoctor(
            sequelize.models.doctor,
            sequelize.models.specialization,
            sequelize.models.user,
        ),
        specializationRepository: new MySQLSpecialization(sequelize.models.doctor, sequelize.models.specialization),
    };
}

export const {
    patientRepository,
    resolutionRepository,
    queueRepository,
    userRepository,
    doctorRepository,
    specializationRepository,
    specDoctorRepository,
} = repositoryCreater(process.env.NODE_ENV);
