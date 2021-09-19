const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class resolution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            resolution.belongsTo(models.patient, {
                as: 'patient',
                ForeignKey: 'patientId',
            });
            resolution.belongsTo(models.doctor, {
                as: 'doctor',
                foreignKey: 'doctorId',
            });
        }
    }
    resolution.init({
        content: DataTypes.STRING,
        ttl: DataTypes.BOOLEAN,
        speciality: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'resolution',
    });
    return resolution;
};
