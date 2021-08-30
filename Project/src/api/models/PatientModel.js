import pkg from 'sequelize';

const { DataTypes } = pkg;

export default async function patientDefine(sequelize) {
    sequelize.define('patient', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    try {
        await sequelize.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
