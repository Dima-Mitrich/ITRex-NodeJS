const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            User.belongsTo(models.doctor, {
                foreignKey: 'user_id',
            });
        }
    }
    User.init({
        user_id: DataTypes.UUID,
        password: DataTypes.STRING,
        login: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
