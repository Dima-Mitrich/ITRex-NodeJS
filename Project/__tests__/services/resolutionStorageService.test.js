import resolutionStorageService from '../../src/api/resolution/services/ResolutionStorageService.js';

const { resolutionRepository } = resolutionStorageService;

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
    });
});
