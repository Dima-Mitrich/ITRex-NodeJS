/* eslint-disable */
import patientController from '../api/controllers/PatientController.js';
import resolutionController from '../api/controllers/ResolutionController.js';
import { STATUSES } from '../constants.js';

const queueService = patientController.queueService;
const resolutionService = resolutionController.resolutionListService;
const patientStorageService = patientController.patientStorageService;

afterEach(() => {
    jest.clearAllMocks();
});

describe('patient controler have to', () => {

    test('add patient in queue', async () => {
        queueService.addPatient = jest.fn((name) => ({ name }));
        const res = await patientController.addInQueue('dimoz');

        expect(queueService.addPatient).toBeCalled();
        expect(res.name).toBe('dimoz');
    });

    test('get patient', async () => {
        patientStorageService.getPatient = jest.fn(() => ({ name: 'dimoz' }));
        const res = await patientController.getPatient({ id: 3 });

        expect(patientStorageService.getPatient).toBeCalled();
        expect(res.status).toBe(STATUSES.OK);
        expect(res.value.name).toBe('dimoz');
    });

    test('return isEmpty value', async () => {
        queueService.isEmpty = jest.fn(() => true);
        const res = await patientController.isEmpty();

        expect(res).toBe(true);
    });

    test('failed with add patient in queue', async () => {
        queueService.addPatient = jest.fn((id) => new Error('error'));
        const res = await patientController.addInQueue(4);

        expect(queueService.addPatient).toBeCalled();
        expect(res).toBeInstanceOf(Error);
    });

    test('failed with take patient', async () => {
        patientStorageService.getPatient = jest.fn((name, id) => new Error('not found'));

        const res = await patientController.getPatient({ name: 'dima', id: null });

        expect(patientStorageService.getPatient).toBeCalled();
        expect(res.status).toBe(STATUSES.NotFound);
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
    });

    test('shift patient from queue', async () => {
        queueService.takePatient = jest.fn(() => 4);
        patientController.getPatient = jest.fn((id) => ({ status: STATUSES.OK, value: { name: 'dima' } }));

        const res = await patientController.shiftPatient();
        expect(res.status).toBe(STATUSES.OK);
        expect(res.value.name).toBe('dima');
        expect(res.value.last).toBe(true);
    });

    test('failed with shift patent', async () => {
        queueService.takePatient = jest.fn(() => undefined);
        patientController.getPatient = jest.fn((id) => ({ status: STATUSES.NotFound, value: new Error('not found') }));

        const res = await patientController.shiftPatient();
        expect(res.status).toBe(STATUSES.NotFound);
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
    });
});

describe('resolution controller have to', () => {

    test('add new resolution', async () => {
        resolutionService.addNewResolution = jest.fn(() => 'success');
        const res = await resolutionController.addResolution('blah', { id: '2' }, false);

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
        patientController.getPatient = jest.fn(() => ({ value: 'dima' }))
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
