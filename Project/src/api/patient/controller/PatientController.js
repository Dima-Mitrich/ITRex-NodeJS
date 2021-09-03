import queueService from '../../queue/services/QueueService.js';
import patientStorageService from '../services/PatientStorageService.js';
import handleError from '../../helpers/handleError.js';
import { STATUSES, NAME_IS_EXIST, EMAIL_IS_EXIST } from '../../../constants.js';

class PatientController {
    constructor(patientStorageService, queueService) {
        this.patientStorageService = patientStorageService;
        this.queueService = queueService;
    }

    async addPatient(patient) {
        const result = this.patientStorageService.addPatient(patient);

        return handleError(result, STATUSES.Created);
    }

    async addInQueue(userID) {
        const patient = await this.getPatient({ userID });
        const result = await this.queueService.addPatient(patient.value.id);

        return handleError(result, STATUSES.Created);
    }

    async getPatient({
        name = null, id = null, email = null, userID = null,
    }) {
        const patient = await this.patientStorageService.getPatient(name, id, email, userID);

        return handleError(patient, STATUSES.OK);
    }

    async shiftPatient() {
        const patientID = await this.queueService.takePatient();
        const patient = await this.getPatient({ id: patientID });

        if (patient.status !== STATUSES.NotFound) {
            const isEmpty = await this.isEmpty();
            patient.value.last = isEmpty;
        }

        return patient;
    }

    async isExist(patient) {
        const { email, name } = patient;
        const checkEmail = await this.getPatient({ email });
        const checkName = await this.getPatient({ name });

        if (checkEmail.status === 200) return new Error(EMAIL_IS_EXIST);
        if (checkName.status === 200) return new Error(NAME_IS_EXIST);

        return false;
    }

    async isEmpty() {
        const result = this.queueService.isEmpty();

        return result;
    }
}

const patientController = new PatientController(patientStorageService, queueService);
export default patientController;
