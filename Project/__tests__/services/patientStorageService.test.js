import patientStorageService from '../../src/api/patient/services/PatientStorageService.js';
import { NOT_FOUND_MESSAGE } from '../../src/constants.js';

const { patientRepository } = patientStorageService;

describe('patient storage service have to', () => {

    test('add patient', async () => {
        patientRepository.push = jest.fn(({ name, id }) => ({ name, id }));
        const res = await patientStorageService.addPatient({ name: 'dima', id: 4 });

        expect(patientRepository.push).toBeCalled();
        expect(res.id).toBe(4);
        expect(res.name).toBe('dima');
    });

    test('get patient by name', async () => {
        patientRepository.getByName = jest.fn((name) => ({ name, id: 4 }));
        const res = await patientStorageService.getPatient('dima', null);

        expect(patientRepository.getByName).toBeCalled();
        expect(res.name).toBe('dima');
        expect(res.id).toBe(4);
    });

    test('get patient by id', async () => {
        patientRepository.getById = jest.fn((id) => ({ name: 'dima', id }));
        const res = await patientStorageService.getPatient(null, 4);

        expect(patientRepository.getById).toBeCalled();
        expect(res.name).toBe('dima');
        expect(res.id).toBe(4);
    });

    test('failed with get patient by id', async () => {
        patientRepository.getById = jest.fn((id) => (undefined));
        const res = await patientStorageService.getPatient(null, 4);

        expect(patientRepository.getById).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NOT_FOUND_MESSAGE);
    });

    test('failed with get patient by name', async () => {
        patientRepository.getByName = jest.fn((name) => (undefined));
        const res = await patientStorageService.getPatient('dima', null);

        expect(patientRepository.getByName).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NOT_FOUND_MESSAGE);
    });
});
