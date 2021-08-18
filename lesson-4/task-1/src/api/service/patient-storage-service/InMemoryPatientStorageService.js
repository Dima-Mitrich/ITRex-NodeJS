import patientStorage from '../../database/patient-storage.js';
import Patient from '../../interface/Patient.js';

export default class InMemoryPatientStorageService {
    constructor() {
        this.queue = patientStorage;
    }

    async addPatient(name) {
        const patient = new Patient(name);

        try {
            await this.queue.push(patient);

            return patient;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async takePatient() {
        try {
            const patient = await this.queue.shift();

            return patient;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isEmpty() {
        const result = await this.queue.length === 0;

        return result;
    }

    async size() {
        try {
            const size = await this.queue.length;

            return size;
        } catch (err) {
            console.log(err);

            return false;
        }
    }
}
