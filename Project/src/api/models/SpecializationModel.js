import pkg from 'sequelize';

const { DataTypes, UUIDV4 } = pkg;

export default async function specializationDefine(sequelize) {
    sequelize.define('specialization', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    /*
    try {
        await sequelize.models.specialization.sync({ force: true });
    } catch (err) {
        console.log(err);
    } */
}
