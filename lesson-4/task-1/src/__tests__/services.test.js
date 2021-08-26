/* eslint-disable */
import sequelize from '../dbInitialization.js';
import patientStorageService from '../api/service/PatientStorageService.js';
import resolutionStorageService from '../api/service/ResolutionStorageService.js';
import queueService from '../api/service/QueueService.js'
import config from '../../config.js';
import { NOT_FOUND_MESSAGE, REDIS_STORAGE_NAME, STATUSES, SUCCESS_MESSAGE } from '../constants.js';

const patientRepository = patientStorageService.patientRepository;
const resolutionRepository = resolutionStorageService.resolutionRepository;
const queueRepository = queueService.queueRepository;


if (config.app.storageType === REDIS_STORAGE_NAME) {
    afterAll(done => {
        queueRepository.closeConnection();
        sequelize.close();
        done();
    });
} else if (config.app.storageType === MY_SQL_STORAGE_NAME) {
    afterAll(done => {
        queueRepository.closeConnection();
        sequelize.close();
        done();
    })
};

afterEach(() => {
    jest.clearAllMocks();
});

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

    test('failed with search resolution', async () => {
        resolutionRepository.findResolution = jest.fn((name, isFromDoc) => { throw new Error('not found') });
        const res = await resolutionStorageService.findResolution('dima', false);

        expect(resolutionRepository.findResolution).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe('not found');
    });

    test('failed with delete resolution', async () => {
        resolutionRepository.deleteResolution = jest.fn((name) => { throw new Error('not found') });
        const res = await resolutionStorageService.deleteResolution('dima');

        expect(resolutionRepository.deleteResolution).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe('not found');
    })
});

describe('queue service have to', () => {

    test('add patient in queue', async () => {
        queueRepository.push = jest.fn((id) => ({ id }));

        const res = await queueService.addPatient(4);

        expect(queueRepository.push).toBeCalled();
        expect(res.id).toBe(4);
    });

    test('take patient from queue', async () => {
        queueRepository.shift = jest.fn(() => ({ id: 4 }));

        const res = await queueService.takePatient();
        expect(queueRepository.shift).toBeCalled();
        expect(res.id).toBe(4);
    });

    test('return isEmpty value', async () => {
        queueRepository.isEmpty = jest.fn(() => true);
        const res = await queueService.isEmpty();

        expect(queueRepository.isEmpty).toBeCalled();
        expect(res).toBe(true);
    });

    test('failed with get patient from queue', async () => {
        queueRepository.shift = jest.fn(() => undefined);
        const res = await queueService.takePatient();

        expect(queueRepository.shift).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NOT_FOUND_MESSAGE);
    });
})
