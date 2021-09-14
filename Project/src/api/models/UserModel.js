import pkg from 'sequelize';

const { DataTypes } = pkg;

export default async function patientUserDefine(sequelize) {
    sequelize.define('patientUser', {
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
    });

    try {
        await sequelize.models.patientUser.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
