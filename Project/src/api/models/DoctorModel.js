import pkg from 'sequelize';

const { DataTypes, UUIDV4 } = pkg;

export default async function doctorDefine(sequelize) {
    sequelize.define('doctor', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        education: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    try {
        await sequelize.models.doctor.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
