/* eslint-disable */
import patientController from '../api/controllers/PatientController.js';
import resolutionController from '../api/controllers/ResolutionController.js';
import config from '../../config.js';
import { REDIS_STORAGE_NAME, STATUSES } from '../constants.js';

const patientService = patientController.queueService;
const resolutionService = resolutionController.resolutionListService;

if (config.app.storageType === REDIS_STORAGE_NAME) {
    afterAll(done => {
        patientService.patientRepository.closeConnection();
        resolutionService.resolutionRepository.closeConnection();
        done();
    });
}

describe('queue controler have to', () => {

    test('add patient', async () => {
        patientService.addPatient = jest.fn((name) => ({ name: name }));
        const res = await patientController.addInQueue('dimoz');

        expect(patientService.addPatient).toBeCalled();
        expect(res.status).toBe(STATUSES.Created);
        expect(res.value.name).toBe('dimoz');
    });

    test('get patient', async () => {
        patientService.takePatient = jest.fn(() => ({ name: 'dimoz' }));
        patientService.isEmpty = jest.fn(() => true);
        const res = await patientController.getPatient();

        expect(patientService.takePatient).toBeCalled();
        expect(patientService.isEmpty).toBeCalled();
        expect(res.status).toBe(STATUSES.OK);
        expect(res.value.name).toBe('dimoz');
        expect(res.value.last).toBe(true);
    });

    test('return isEmpty value', async () => {
        patientService.isEmpty = jest.fn(() => true);
        const res = await patientController.isEmpty();

        expect(res).toBe(true);
    });

    test('failed with add patient', async () => {
        patientService.addPatient = jest.fn((name) => new Error('error'));
        const res = await patientController.addInQueue('dimoz');

        expect(patientService.addPatient).toBeCalled();
        expect(res.status).toBe(STATUSES.ServerError);
        expect(res.value).toBeInstanceOf(Error);
    });

    test('failed with take patient', async () => {
        patientService.takePatient = jest.fn(() => new Error('not found'));
        patientService.isEmpty = jest.fn(() => true);

        const res = await patientController.getPatient();

        expect(patientService.takePatient).toBeCalled();
        expect(patientService.isEmpty).toBeCalled();
        expect(res.status).toBe(STATUSES.NotFound);
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
    })
});

describe('resolution controller have to', () => {

    test('add new resolution', async () => {
        resolutionService.addNewResolution = jest.fn(() => 'success');
        const res = await resolutionController.addResolution();

        expect(resolutionService.addNewResolution).toBeCalled();
        expect(res.value).toBe('success');
        expect(res.status).toBe(STATUSES.Created);
    });

    test('delete resolution', async () => {
        resolutionService.deleteResolution = jest.fn(() => 'success');
        const res = await resolutionController.deleteResolution();

        expect(resolutionService.deleteResolution).toBeCalled();
        expect(res.value).toBe('success');
        expect(res.status).toBe(STATUSES.OK);
    });

    test('find resolution', async () => {
        resolutionService.findResolution = jest.fn((name) => ({ content: 'blah', patient: name }));
        const res = await resolutionController.findResolution('dima');

        expect(resolutionService.findResolution).toBeCalled();
        expect(res.value.content).toBe('blah');
        expect(res.value.patient).toBe('dima');
        expect(res.status).toBe(STATUSES.OK);
    });

    test('failed with delete resolution', async () => {
        resolutionService.deleteResolution = jest.fn(() => new Error('not found'));
        const res = await resolutionController.deleteResolution();

        expect(resolutionService.deleteResolution).toBeCalled();
        expect(res.value).toBeInstanceOf(Error);
        expect(res.status).toBe(STATUSES.NotFound);
        expect(res.value.message).toBe('not found');
    });

    test('failed with search resolution', async () => {
        resolutionService.findResolution = jest.fn((name) => new Error('not found'));
        const res = await resolutionController.findResolution('dima');

        expect(resolutionService.findResolution).toBeCalled();
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
        expect(res.status).toBe(STATUSES.NotFound);
    })
})
