import pkg from 'sequelize';
import config from '../config.js';
import patientDefine from './api/models/PatientModel.js';
import resolutionDefine from './api/models/ResolutionModel.js';
import userDefine from './api/models/UserModel.js';
import doctorDefine from './api/models/DoctorModel.js';
import specializationDefine from './api/models/SpecializationModel.js';
import { PORTS } from './constants.js';

const { Sequelize, DataTypes } = pkg;

export default function dbInit() {
    const sequelize = new Sequelize('HOSPITAL', config.app.userName, '', {
        dialect: 'mysql',
        host: config.app.sqlHost,
        port: PORTS.SQL_PORT,
        database: 'HOSPITAL',
    });

    resolutionDefine(sequelize);
    patientDefine(sequelize);
    userDefine(sequelize);
    doctorDefine(sequelize);
    specializationDefine(sequelize);

    sequelize.models.patient.hasMany(sequelize.models.resolution);

    sequelize.models.doctor.hasMany(sequelize.models.resolution);

    sequelize.models.resolution.belongsTo(sequelize.models.patient, {
        as: 'patient',
    });

    sequelize.models.resolution.belongsTo(sequelize.models.doctor, {
        as: 'doctor',
    });



    sequelize.models.patient.belongsTo(sequelize.models.user, {
        foreignKey: {
            name: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    sequelize.models.doctor.belongsTo(sequelize.models.user, {
        foreignKey: {
            name: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    sequelize.models.doctor.belongsToMany(sequelize.models.specialization, { through: 'doctorSpecialization' });
    sequelize.models.specialization.belongsToMany(sequelize.models.doctor, { through: 'doctorSpecialization' });

    sequelize.sync({ alter: true });

    return sequelize;
}
