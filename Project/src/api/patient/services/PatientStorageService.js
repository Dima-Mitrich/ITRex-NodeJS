import { patientRepository } from '../../repositoryCreater.js';
import { NOT_FOUND_MESSAGE } from '../../../constants.js';

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

    async getPatient(name, id, email, userID) {
        try {
            let result;

            if (name) {
                result = await this.patientRepository.getByName(name);
            } else if (id) {
                result = await this.patientRepository.getById(id);
            } else if (email) {
                result = await this.patientRepository.getByEmail(email);
            } else if (userID) {
                result = await this.patientRepository.getByUserID(userID);
            }

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
