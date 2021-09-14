import doctorController from '../doktor/controller/DoctorController.js';
import { USER_TYPE } from '../../constants.js';
import authController from '../auth/controller/AuthController.js';

export const doctorData = [
    {
        name: 'Sergei ',
        email: 'sergei@mail.ru',
        password: '1111',
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['dentist', 'surgeon', 'urologist'],

    },
    {
        name: 'Andrei',
        email: 'andrei@mail.ru',
        password: '1111',
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['neurologist', 'psychiatrist'],

    },
    {
        name: 'Fedor',
        email: 'fedor@mail.ru',
        password: '1111',
        gender: 'man',
        birthday: '1993-02-19',
        education: 'BBSY',
        experience: '3,5 year ',
        specialization: ['otolaryngologist', 'obstetrician'],

    },
];
export const specData = [
    'dentist',
    'surgeon',
    'urologist',
    'neurologist',
    'psychiatrist',
    'otolaryngologist',
    'obstetrician',

];

export default async function dataSeed(doctorData, specData) {
    try {
        for (const elem of specData) {
            await doctorController.addSpec(elem);
        }

        for (const elem of doctorData) {
            elem.role = USER_TYPE.DOCTOR;
            await authController.signUpNewUser(elem);
        }
    } catch (err) {
        console.log(`data seeding err ${err}`);
    }

    return console.log('Seed doctor Data');
}
