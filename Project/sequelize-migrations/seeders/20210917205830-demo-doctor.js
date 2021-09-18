const drData = require('../doctorData');

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('doctors', [
        {
            id: drData.doctors[0].id,
            name: drData.doctors[0].name,
            email: drData.doctors[0].email,
            gender: drData.doctors[0].gender,
            age: ((new Date().getTime() - new Date(drData.doctors[0].birthday)) / (24 * 3600 * 365.25 * 1000)),
            education: drData.doctors[0].education,
            experience: drData.doctors[0].experience,
            user_id: drData.doctors[0].user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: drData.doctors[1].id,
            name: drData.doctors[1].name,
            email: drData.doctors[1].email,
            gender: drData.doctors[1].gender,
            age: ((new Date().getTime() - new Date(drData.doctors[1].birthday)) / (24 * 3600 * 365.25 * 1000)),
            education: drData.doctors[1].education,
            experience: drData.doctors[1].experience,
            user_id: drData.doctors[1].user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: drData.doctors[2].id,
            name: drData.doctors[2].name,
            email: drData.doctors[2].email,
            gender: drData.doctors[2].gender,
            age: ((new Date().getTime() - new Date(drData.doctors[2].birthday)) / (24 * 3600 * 365.25 * 1000)),
            education: drData.doctors[2].education,
            experience: drData.doctors[2].experience,
            user_id: drData.doctors[2].user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]),

    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('doctors', null, {}),
};

