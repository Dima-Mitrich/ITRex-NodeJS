/* eslint-disable */
import config from '../../config.js';
import queueController from '../api/controllers/queueController.js';
import patientStorage from '../api/database/patient-storage.js';
import { REDIS_STORAGE_NAME } from '../constants.js';

describe('queue controller', () => {
    if (config.app.storageType === REDIS_STORAGE_NAME) {
        afterAll(done => {
            // Closing the DB connection allows Jest to exit successfully.
            patientStorage.quit();
            done();
        });
    }

    test('should contains patient', async () => {
        const result = await queueController.addInQueue('dima');
        expect(result.status).toBe(201);
        expect(result.value.name).toBe('dima');
    });

    test('should give patient away', async () => {
        const result = await queueController.getPatient();
        expect(result.status).toBe(200);
        expect(result.value.patient.name).toBe('dima');
        expect(result.value.isEmpty).toBe(true);
    });
});
