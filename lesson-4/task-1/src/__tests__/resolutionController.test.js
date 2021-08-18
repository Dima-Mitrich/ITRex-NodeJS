/* eslint-disable */
import config from '../../config.js';
import resolutionController from '../api/controllers/resolutionController.js';
import resolutionStorage from '../api/database/resolution-storage.js';
import { REDIS_STORAGE_NAME } from '../constants.js';
import Patient from '../api/interface/Patient.js';

describe('resolution controller', () => {
    if (config.app.storageType === REDIS_STORAGE_NAME) {
        afterAll(done => {
            // Closing the DB connection allows Jest to exit successfully.
            resolutionStorage.quit();
            done();
        });
    }

    test('should add new resolution', async () => {
        const result = await resolutionController.addResolution('zdorov', new Patient('dima'), false);
        expect(result.status).toBe(201);
        expect(result.value.content).toBe('zdorov');
        expect(result.value.patient.name).toBe('dima');
    });

    test('should find resolution from doc interface', async () => {
        const result = await resolutionController.findResolution('dima', true);
        const resultValue = JSON.parse(result.value);
        expect(result.status).toBe(200);
        expect(resultValue.patient.name).toBe('dima');
        expect(resultValue.content).toBe('zdorov');
    });

    test('should find resolution from patient interface', async () => {
        const result = await resolutionController.findResolution('dima', false);
        const resultValue = JSON.parse(result.value);
        expect(result.status).toBe(200);
        expect(resultValue.patient.name).toBe('dima');
        expect(resultValue.content).toBe('zdorov');
    });

    test('should delete resolution', async () => {
        const result = await resolutionController.deleteResolution('dima');
        expect(result.status).toBe(200);
        expect(result.value).toBe('succes');
    });

    test('should not find resolution from doc interface', async () => {
        const result = await resolutionController.findResolution('dima', true);
        expect(result.status).toBe(404);
        expect(result.value).toBeInstanceOf(Error);
    });

    test('should not find resolution from patient interface', async () => {
        const result = await resolutionController.findResolution('dima', false);
        expect(result.status).toBe(404);
        expect(result.value).toBeInstanceOf(Error);
    });

    test('should add new resolution with ttl', async () => {
        const result = await resolutionController.addResolution('zdorov', new Patient('dima'), true);
        expect(result.status).toBe(201);
        expect(result.value.content).toBe('zdorov');
        expect(result.value.patient.name).toBe('dima');
    });
});