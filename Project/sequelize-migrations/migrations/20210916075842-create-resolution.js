module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('resolutions', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ttl: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            speciality: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('resolutions');
    },
};
