const { v4: uuidv4 } = require('uuid');

const doctorData = [
    {
        id: uuidv4(),
        name: 'Sergei ',
        email: 'sergei@mail.ru',
        password: '1111',
        user_id: uuidv4(),
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['dentist', 'surgeon', 'urologist'],

    },
    {
        id: uuidv4(),
        name: 'Andrei',
        email: 'andrei@mail.ru',
        password: '1111',
        user_id: uuidv4(),
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['neurologist', 'psychiatrist'],

    },
    {
        id: uuidv4(),
        name: 'Fedor',
        email: 'fedor@mail.ru',
        password: '1111',
        user_id: uuidv4(),
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['otolaryngologist', 'obstetrician'],

    },
];
const specData = [
    { spec: 'dentist', id: uuidv4() },
    { spec: 'surgeon', id: uuidv4() },
    { spec: 'urologist', id: uuidv4() },
    { spec: 'neurologist', id: uuidv4() },
    { spec: 'psychiatrist', id: uuidv4() },
    { spec: 'otolaryngologist', id: uuidv4() },
    { spec: 'obstetrician', id: uuidv4() },
];

module.exports.doctors = doctorData;
module.exports.specs = specData;
