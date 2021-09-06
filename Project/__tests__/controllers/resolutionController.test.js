import patientController from '../../src/api/patient/controller/PatientController.js';
import resolutionController from '../../src/api/resolution/controller/ResolutionController.js';
import { STATUSES } from '../../src/constants.js';

const resolutionService = resolutionController.resolutionListService;

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