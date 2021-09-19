const drData = require('../doctorData');

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('doctorspecialization', [
        {
            doctorId: drData.doctors[0].id,
            specializationId: drData.specs[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[0].id,
            specializationId: drData.specs[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[0].id,
            specializationId: drData.specs[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[1].id,
            specializationId: drData.specs[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[1].id,
            specializationId: drData.specs[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[2].id,
            specializationId: drData.specs[5].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            doctorId: drData.doctors[2].id,
            specializationId: drData.specs[6].id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]),

    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('doctorspecialization', null, {}),
};
