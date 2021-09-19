const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class doctorSpecialization extends Model {
        static associate(models) {
            doctorSpecialization.belongsTo(models.doctor, {
                foreignKey: 'doctorId',
            });

            doctorSpecialization.belongsTo(models.specialization, {
                foreignKey: 'specializationId',
            });
        }
    }
    doctorSpecialization.init({
        doctorId: DataTypes.UUID,
        specializationId: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'doctorSpecialization',
    });
    return doctorSpecialization;
};
