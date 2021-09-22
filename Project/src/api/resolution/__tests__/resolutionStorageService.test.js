import resolutionStorageService from '../services/ResolutionStorageService.js';

const { resolutionRepository, doctorRepository } = resolutionStorageService;

describe('resolution storage service have to', () => {

    test('add new resolution', async () => {
        resolutionRepository.push = jest.fn((resolution, ttl) => 'success');
        doctorRepository.getByUserId = jest.fn((userId) => ({ id: '4' }));
        const res = await resolutionStorageService.addNewResolution('blah', { name: 'dima' }, true);

        expect(resolutionRepository.push).toBeCalled();
        expect(res).toBe('success');
    });

    test('find resolution by name', async () => {
        resolutionRepository.findResolutionByName = jest.fn((name, isFromDoc) => ({ content: 'blah', patient: { name: name } }));
        const res = await resolutionStorageService.findResolutionsByName('dima');

        expect(resolutionRepository.findResolutionByName).toBeCalled();
        expect(res.content).toBe('blah');
        expect(res.patient.name).toBe('dima');
    });

    test('find resolution by user id', async () => {
        resolutionRepository.findResolutionByUserId = jest.fn((name, isFromDoc) => ({ content: 'blah', patient: { name: 'dima' } }));
        const res = await resolutionStorageService.findResolutionByUserId('222');

        expect(resolutionRepository.findResolutionByUserId).toBeCalled();
        expect(res.content).toBe('blah');
        expect(res.patient.name).toBe('dima');
    });

    test('delete resolution', async () => {
        doctorRepository.getByUserId = jest.fn((userID) => ({ id: '4' }));
        resolutionRepository.getResolutionById = jest.fn((id) => ({ doctorId: '4' }));
        resolutionRepository.deleteResolution = jest.fn((name) => 'success');
        const res = await resolutionStorageService.deleteResolution('2');

        expect(resolutionRepository.deleteResolution).toBeCalled();
        expect(res).toBe('success');
    });

    test('failed with search resolution by name', async () => {
        resolutionRepository.findResolutionByName = jest.fn((name) => { throw new Error('not found') });
        const res = await resolutionStorageService.findResolutionsByName('dima');
        expect(resolutionRepository.findResolutionByName).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe('not found');
    });

    test('failed with search resolution by user id', async () => {
        resolutionRepository.findResolutionByUserId = jest.fn((userID) => { throw new Error('not found') });
        const res = await resolutionStorageService.findResolutionByUserId('222');
        expect(resolutionRepository.findResolutionByUserId).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe('not found');
    });

    test('failed with delete resolution', async () => {
        try {
            resolutionRepository.getResolutionById = jest.fn((id) => null);
            const res = await resolutionStorageService.deleteResolution('2', '3');
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('not found');
        }
    });
});
