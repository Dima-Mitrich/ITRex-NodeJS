/* eslint-disable */
import patientController from '../src/api/patient/controller/PatientController.js';
import resolutionController from '../src/api/resolution/controller/ResolutionController.js';
import authController from '../src/api/auth/controller/AuthController.js';
import { STATUSES, EMAIL_IS_EXIST } from '../src/constants.js';

const queueService = patientController.queueService;
const resolutionService = resolutionController.resolutionListService;
const patientStorageService = patientController.patientStorageService;
const userService = authController.userService;
const jwtService = authController.jwtService;

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
        patientController.getPatient = jest.fn((name) => ({ status: 200, value: { id: 1 } }));
        resolutionService.findResolution = jest.fn((id) => ({ content: 'blah', patient: 'dima' }));
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
        patientController.getPatient = jest.fn((name) => ({ status: 200, value: name }));
        const res = await resolutionController.findResolution('dima');

        expect(resolutionService.findResolution).toBeCalled();
        expect(patientController.getPatient).toBeCalled();
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
        expect(res.status).toBe(STATUSES.NotFound);
    })
});

describe('auth controller have to', () => {

    test('create new user', async () => {
        userService.createNewUser = jest.fn((pass) => pass);

        const res = await authController.createNewUser('abc');

        expect(res.status).toBe(STATUSES.Created);
        expect(res.value.password).toBe('abc');
        expect(userService.createNewUser).toBeCalled();
    });

    test('sign up new patient', async () => {
        patientController.isExist = jest.fn(() => false);
        authController.createNewUser = jest.fn(() => ({
            status: STATUSES.Created, value: {
                password: '123',
                userID: '1',
            }
        }));
        patientController.addPatient = jest.fn(({ userID, password, id, email, name }) => ({ userID, name, email, id }));

        const res = await authController.signUpNewPatient({ name: 'dima', email: 'email' });

        expect(res.status).toBe(STATUSES.Created);
        expect(res.value.name).toBe('dima');
        expect(res.value.email).toBe('email');
        expect(res.value.userID).toBe('1');
    });

    test('sign in patient', async () => {
        patientController.getPatient = jest.fn(() => ({ status: 200, value: { userID: '1' } }));
        userService.isPasswordMatches = jest.fn(() => true);
        jwtService.createJwtToken = jest.fn(() => 'token');

        const res = await authController.signInUser({ userID: '1' });
        
        expect(res.status).toBe(200);
        expect(res.value).toBe('token');
        expect(patientController.getPatient).toBeCalled();
        expect(userService.isPasswordMatches).toBeCalled();
        expect(jwtService.createJwtToken).toBeCalled();
    });

    test('check token', async () => {
        jwtService.checkJwtToken = jest.fn(() => ({userID: '1'}));

        const res = await authController.checkToken('token');
        
        expect(jwtService.checkJwtToken).toBeCalled();
        expect(res.status).toBe(200);
        expect(res.value.userID).toBe('1');
    });

    test('failed with check token', async () => {
        jwtService.checkJwtToken = jest.fn(() => ({userID: '1'}));

        const res = await authController.checkToken(null);
        
        expect(jwtService.checkJwtToken).toBeCalledTimes(0);
        expect(res.status).toBe(403);
        expect(res.value).toBeInstanceOf(Error);
    });
})
