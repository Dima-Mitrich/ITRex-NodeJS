/* eslint-disable */
import patientStorageService from '../api/service/PatientStorageService.js';
import resolutionStorageService from '../api/service/ResolutionStorageService.js';
import config from '../../config.js';
import { REDIS_STORAGE_NAME, STATUSES } from '../constants.js';

const patientRepository = patientStorageService.patientRepository;
const resolutionRepository = resolutionStorageService.resolutionRepository;

if (config.app.storageType === REDIS_STORAGE_NAME) {
    afterAll(done => {
        patientStorageService.patientRepository.closeConnection();
        resolutionStorageService.resolutionRepository.closeConnection();
        done();
    });
}

describe('patient storage service have to', () => {

    test('add patient', async () => {
        patientRepository.push = jest.fn((patient) => patient);
        const res = await patientStorageService.addPatient('dima');

        expect(patientRepository.push).toBeCalled();
        expect(res.name).toBe('dima');
        expect(res.resolution).toBe(null);
    });

    test('take patient', async () => {
        patientRepository.shift = jest.fn(() => ({ name: 'dima', resolution: null }));
        const res = await patientStorageService.takePatient();

        expect(patientRepository.shift).toBeCalled();
        expect(res.name).toBe('dima');
        expect(res.resolution).toBe(null);
    });

    test('return isEmpty value', async () => {
        patientRepository.isEmpty = jest.fn(() => true);
        const res = await patientStorageService.isEmpty();

        expect(patientRepository.isEmpty).toBeCalled();
        expect(res).toBe(true);
    });
});

describe('resolution storage service have to', () => {

    test('add new resolution', async () => {
        resolutionRepository.push = jest.fn((resolution, ttl) => 'success');
        const res = await resolutionStorageService.addNewResolution('blah', { name: 'dima' }, true);

        expect(resolutionRepository.push).toBeCalled();
        expect(res).toBe('success');
    });

    test('find resolution', async () => {
        resolutionRepository.findResolution = jest.fn((name, isFromDoc) => ({ content: 'blah', patient: { name: name } }));
        const res = await resolutionStorageService.findResolution('dima', false);

        expect(resolutionRepository.findResolution).toBeCalled();
        expect(res.content).toBe('blah');
        expect(res.patient.name).toBe('dima');
    });

    test('delete resolution', async () => {
        resolutionRepository.deleteResolution = jest.fn((name) => 'success');
        const res = await resolutionStorageService.deleteResolution('dima');

        expect(resolutionRepository.deleteResolution).toBeCalled();
        expect(res).toBe('success');
    });
})
