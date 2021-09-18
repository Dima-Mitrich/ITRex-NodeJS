module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctorSpecialization', {

            doctorId: {
                type: Sequelize.UUID,
                references: {
                    model: 'doctors',
                    key: 'id',
                },
            },
            specializationId: {
                type: Sequelize.UUID,
                references: {
                    model: 'specializations',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctorSpecialization');
    },
};
