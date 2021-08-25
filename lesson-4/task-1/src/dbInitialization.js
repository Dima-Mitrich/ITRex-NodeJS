import pkg from 'sequelize';
import config from '../config.js';
import patientDefine from './api/models/PatientModel.js';
import resolutionDefine from './api/models/ResolutionModel.js';

const { Sequelize, DataTypes } = pkg;

const sequelize = new Sequelize('HOSPITAL', config.app.userName, config.app.password, {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
});

resolutionDefine(sequelize);
patientDefine(sequelize);

sequelize.models.resolution.belongsTo(sequelize.models.patient, {
    foreignKey: {
        name: 'patientID',
        type: DataTypes.UUID,
        allowNull: false,
    },
});

sequelize.sync({ force: true });

export default sequelize;
