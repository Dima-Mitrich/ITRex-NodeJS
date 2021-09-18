const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class specialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            specialization.belongsToMany(models.doctor, { through: 'doctorSpecialization' });
        }
    }
    specialization.init({
        id: DataTypes.UUID,
        specialization: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'specialization',
    });
    return specialization;
};
