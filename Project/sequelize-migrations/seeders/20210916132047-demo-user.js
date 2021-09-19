const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const drData = require('../doctorData');

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
        user_id: drData.doctors[0].user_id,
        password: await bcrypt.hash(drData.doctors[0].password, 10),
        login: drData.doctors[0].email,
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        user_id: drData.doctors[1].user_id,
        password: await bcrypt.hash(drData.doctors[1].password, 10),
        login: drData.doctors[1].email,
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        user_id: drData.doctors[2].user_id,
        password: await bcrypt.hash(drData.doctors[2].password, 10),
        login: drData.doctors[2].email,
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    ]),
    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),

};
