import patientController from '../../src/api/patient/controller/PatientController.js';
import {STATUSES, EMAIL_IS_EXIST, NOT_FOUND_MESSAGE} from '../../src/constants.js';

const { queueService } = patientController;
const { patientStorageService } = patientController;

describe('patient controler have to', () => {

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
        expect(res.value).toBeInstanceOf(Error);
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
        patientController.isEmpty = jest.fn(() => true);
        const res = await patientController.shiftPatient();
        expect(res.status).toBe(STATUSES.OK);
        expect(res.value.name).toBe('dima');
        expect(res.value.last).toBe(true);
    });

    test('failed with shift patent', async () => {
        queueService.takePatient = jest.fn(() => undefined);
        patientController.getPatient = jest.fn((id) => ({ status: STATUSES.NotFound, value: new Error('not found') }));

        const res = await patientController.shiftPatient('dentist');
        expect(res.status).toBe(STATUSES.NotFound);
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
    });

    test('return is exist true value', async () => {
        patientController.getPatient = jest.fn((email) => ({ status: 200, value: { id: 1 } }));

        const res = await patientController.isExist({ email: 'email', name: 'dima' });

        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(EMAIL_IS_EXIST);
        expect(patientController.getPatient).toBeCalled();
    });

    test('return is exist false value', async () => {
        patientController.getPatient = jest.fn((email) => ({ status: 404, value: 'not found' }));

        const res = await patientController.isExist({ email: 'email', name: 'dima' });

        expect(res).toBe(false);
        expect(patientController.getPatient).toBeCalled();
    });

    test('add patient in queue', async () => {
        queueService.addPatient = jest.fn((id) => ({ id }));
        patientController.getPatient = jest.fn((userID) => ({ status: 200, value: { id: 1 } }));
        const res = await patientController.addInQueue(3);

        expect(queueService.addPatient).toBeCalled();
        expect(res.status).toBe(201);
        expect(res.value.id).toBe(1);
    });
});
