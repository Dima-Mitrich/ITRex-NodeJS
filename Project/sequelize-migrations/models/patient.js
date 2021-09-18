const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            patient.hasMany(models.resolution, {
                foreignKey: 'patientId',
            });
            patient.belongsTo(models.user, {
                foreignKey: 'user_id',
            });
        }
    }
    patient.init({
        id: DataTypes.UUID,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.TINYINT,
    }, {
        sequelize,
        modelName: 'patient',
    });
    return patient;
};
