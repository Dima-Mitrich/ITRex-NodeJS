import pkg from 'sequelize';

const { DataTypes, UUIDV4 } = pkg;

export default async function doctorUserDefine(sequelize) {
    sequelize.define('doctorUser', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
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
        await sequelize.models.doctorUser.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
