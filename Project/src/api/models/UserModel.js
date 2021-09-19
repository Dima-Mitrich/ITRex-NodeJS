import pkg from 'sequelize';

const { DataTypes } = pkg;

export default async function userDefine(sequelize) {
    sequelize.define('user', {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    try {
        //await sequelize.models.user.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
