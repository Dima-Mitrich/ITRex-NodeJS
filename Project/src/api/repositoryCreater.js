import createRedisClient from './helpers/createRedisClient.js';
import MySQLResolution from './resolution/repositories/MySQLResolution.js';
import MySQLPatient from './patient/repositories/MySQLPatient.js';
import MySQLDoctor from './doktor/repositories/MySQLDoctor.js';
import PatientUserRepository from './users/repositories/PatientUserRepository.js';
import RedisQueue from './queue/repositories/RedisQueue.js';
import dbInit from '../dbInitialization.js';
import DoctorUserRepository from './users/repositories/DoctorUserRepository.js';
import MySQLSpecialization from './doktor/repositories/MySQLSpecialization.js';
import MySQLSpecDoctor from './doktor/repositories/MySQLSpecDoctor.js';

function repositoryCreater(mode) {
    if (mode === 'test') {
        return {
            patientRepository: new MySQLPatient(),
            resolutionRepository: new MySQLResolution(),
            queueRepository: new RedisQueue(),
            userRepository: new PatientUserRepository(),
            doctorRepository: new MySQLDoctor(),
        };
    }

    const client = createRedisClient(0);
    const sequelize = dbInit();

    return {
        patientRepository: new MySQLPatient(sequelize.models.patient),
        resolutionRepository: new MySQLResolution(sequelize.models.resolution),
        queueRepository: new RedisQueue(client),
        patientUserRepository: new PatientUserRepository(sequelize.models.patientUser),
        doctorUserRepository: new DoctorUserRepository(sequelize.models.doctorUser),
        doctorRepository: new MySQLDoctor(
          sequelize.models.doctor,
          sequelize.models.specialization,
          sequelize.models.doctorSpecialization,
          sequelize.models.doctorUser,
        ),
        specializationRepository: new MySQLSpecialization(sequelize.models.specialization),
        specDoctorRepository: new MySQLSpecDoctor(sequelize.models.doctorSpecialization),
    };
}

export const {
    patientRepository,
    resolutionRepository,
    queueRepository,
    patientUserRepository,
    doctorUserRepository,
    doctorRepository,
    specializationRepository,
    specDoctorRepository,
} = repositoryCreater(process.env.NODE_ENV);
