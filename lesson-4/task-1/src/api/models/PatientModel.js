import pkg from 'sequelize';

const { DataTypes } = pkg;

function patientDefine(sequelize) {
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
}

export default patientDefine;
