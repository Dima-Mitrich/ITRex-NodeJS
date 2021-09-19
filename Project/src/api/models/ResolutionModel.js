import pkg from 'sequelize';

const { DataTypes } = pkg;

export default async function resolutionDefine(sequelize) {
    sequelize.define('resolution', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ttl: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        speciality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    try {
        // await sequelize.models.resolution.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
