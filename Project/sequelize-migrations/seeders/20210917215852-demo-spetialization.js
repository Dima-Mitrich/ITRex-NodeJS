const drData = require('../doctorData');

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('specializations', [{
        id: drData.specs[0].id,
        specialization: drData.specs[0].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[1].id,
        specialization: drData.specs[1].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[2].id,
        specialization: drData.specs[2].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[3].id,
        specialization: drData.specs[3].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[4].id,
        specialization: drData.specs[4].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[5].id,
        specialization: drData.specs[5].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: drData.specs[6].id,
        specialization: drData.specs[6].spec,
        createdAt: new Date(),
        updatedAt: new Date(),

    }]),

    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('specializations', null, {}),
};
