import { patientRepository } from '../database/storage-factory.js';
import { NOT_FOUND_MESSAGE } from '../../constants.js';

export class PatientStorageService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }

    async addPatient(patient) {
        try {
            const result = await this.patientRepository.push(patient);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async deletePatient(patient) {
        try {
            const result = await this.patientRepository.delete(patient);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async getPatient(name, id) {
        try {
            const result = name
                ? await this.patientRepository.getByName(name)
                : await this.patientRepository.getById(id);

            if (result) {
                return result;
            } else {
                throw new Error(NOT_FOUND_MESSAGE);
            }
        } catch (err) {
            // console.log(err);

            return err;
        }
    }
}

const patientStorageService = new PatientStorageService(patientRepository);
export default patientStorageService;
