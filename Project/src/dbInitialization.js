import pkg from 'sequelize';
import config from '../config.js';
import patientDefine from './api/models/PatientModel.js';
import resolutionDefine from './api/models/ResolutionModel.js';
import patientUserDefine from './api/models/UserModel.js';
import doctorUserDefine from './api/models/doctorUserModel.js';
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
    patientUserDefine(sequelize);
    doctorDefine(sequelize);
    doctorUserDefine(sequelize);
    specializationDefine(sequelize);

    sequelize.models.resolution.belongsTo(sequelize.models.patient, {
        foreignKey: {
            name: 'patientID',
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    sequelize.models.patient.belongsTo(sequelize.models.patientUser, {
        foreignKey: {
            name: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    sequelize.models.doctor.belongsTo(sequelize.models.doctorUser, {
        foreignKey: {
            name: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    sequelize.models.doctor.belongsToMany(sequelize.models.specialization, { through: 'doctorSpecialization' });
    sequelize.models.specialization.belongsToMany(sequelize.models.doctor, { through: 'doctorSpecialization' });
    sequelize.models.doctor.hasMany(sequelize.models.doctorSpecialization);
    sequelize.models.doctorSpecialization.belongsTo(sequelize.models.doctor);
    sequelize.models.specialization.hasMany(sequelize.models.doctorSpecialization);
    sequelize.models.doctorSpecialization.belongsTo(sequelize.models.specialization);

    sequelize.sync({ force: true });

    return sequelize;
}
