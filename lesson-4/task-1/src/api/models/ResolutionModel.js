import pkg from 'sequelize';

const { DataTypes } = pkg;

function resolutionDefine(sequelize) {
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
    });
}

export default resolutionDefine;
