import patientController from '../../patient/controller/PatientController.js';
import resolutionController from '../controller/ResolutionController.js';
import { STATUSES } from '../../../constants.js';

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
        expect(res.status).toBe(STATUSES.NoContent);
    });

    test('find resolution by name', async () => {
        resolutionService.findResolutionsByName = jest.fn(() => ([{ content: 'blah', patient: 'dima' }]));
        const res = await resolutionController.findResolutionsByName({name:'Dima',role:'doctor'});

        expect(resolutionService.findResolutionsByName).toBeCalled();
        expect(res.value[0].content).toBe('blah');
        expect(res.value[0].patient).toBe('dima');
        expect(res.status).toBe(STATUSES.OK);
    });

    test('find resolution by user id', async () => {
        resolutionService.findResolutionByUserId = jest.fn(() => ({ content: 'blah', patient: 'dima' }));
        const res = await resolutionController.findResolutionsByUserId({userID:'222', role:'patient'});

        expect(resolutionService.findResolutionByUserId).toBeCalled();
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

    test('failed with search resolution by name', async () => {
        resolutionService.findResolutionsByName = jest.fn((name) => new Error('not found'));
        const res = await resolutionController.findResolutionsByName({name: 'Dima',role: 'doctor'});

        expect(resolutionService.findResolutionsByName).toBeCalled();
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
        expect(res.status).toBe(STATUSES.NotFound);
    })

    test('failed with search resolution by user id', async () => {
        resolutionService.findResolutionByUserId = jest.fn((name) => new Error('not found'));
        const res = await resolutionController.findResolutionsByUserId({userID: '222',role: 'patient'});

        expect(resolutionService.findResolutionByUserId).toBeCalled();
        expect(res.value).toBeInstanceOf(Error);
        expect(res.value.message).toBe('not found');
        expect(res.status).toBe(STATUSES.NotFound);
    })
});
