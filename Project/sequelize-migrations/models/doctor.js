const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            doctor.hasMany(models.resolution, {
                foreignKey: 'doctorId',
            });
            doctor.belongsTo(models.user, {
                foreignKey: 'user_id',
            });
            doctor.belongsToMany(models.specialization, { through: 'doctorSpecialization' });
        }
    }
    doctor.init({
        id: DataTypes.UUID,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.TINYINT,
        education: DataTypes.STRING,
        experience: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'doctor',
    });
    return doctor;
};
