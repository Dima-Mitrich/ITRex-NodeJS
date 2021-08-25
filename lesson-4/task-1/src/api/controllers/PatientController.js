import { v4 as uuidv4 } from 'uuid';
import Patient from '../interface/Patient.js';
import queueService from '../service/QueueService.js';
import patientStorageService from '../service/PatientStorageService.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

class PatientController {
    constructor(patientStorageService, queueService) {
        this.patientStorageService = patientStorageService;
        this.queueService = queueService;
    }

    async addPatient(name) {
        let patient = await this.getPatient({ name });
        let result;

        if (patient.status === 404) {
            patient = new Patient(name, uuidv4());
            await this.patientStorageService.addPatient(patient);
            result = await this.addInQueue(patient.id);
        } else {
            result = await this.addInQueue(patient.value);
        }

        return handleError(result, STATUSES.Created);
    }

    async addInQueue(id) {
        const result = await this.queueService.addPatient(id);

        return result;
    }

    async getPatient({ name = null, id = null }) {
        const patient = await this.patientStorageService.getPatient(name, id);

        return handleError(patient, STATUSES.OK);
    }

    async shiftPatient() {
        const patientID = await this.queueService.takePatient();
        const patient = await this.getPatient({ id: patientID });

        if (patient.status !== 404) {
            const isEmpty = await this.isEmpty();
            patient.value.last = isEmpty;
        }

        return patient;
    }

    async isEmpty() {
        const result = this.queueService.isEmpty();

        return result;
    }
}

const patientController = new PatientController(patientStorageService, queueService);
export default patientController;
