import Patient from '../interface/Patient.js';
import { patientRepository } from '../database/storage-factory.js';
import { NOT_FOUND_MESSAGE } from '../../constants.js';

export class PatientStorageService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }

    async addPatient(name) {
        const patient = new Patient(name);

        try {
            await this.patientRepository.push(patient);

            return patient;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async takePatient() {
        try {
            const patient = await this.patientRepository.shift();

            if (!patient) {
                throw new Error(NOT_FOUND_MESSAGE);
            } else return patient;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isEmpty() {
        try {
            const result = await this.patientRepository.isEmpty();

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const patientStorageService = new PatientStorageService(patientRepository);
export default patientStorageService;
