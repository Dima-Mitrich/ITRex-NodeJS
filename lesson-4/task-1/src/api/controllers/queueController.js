import patientStorageService from '../service/PatientStorageService.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }

    async addInQueue(name) {
        const result = await this.queueService.addPatient(name);

        return handleError(result, STATUSES.Created);
    }

    async getPatient() {
        const patient = await this.queueService.takePatient();

        if (patient.name) {
            patient.last = await this.isEmpty();
        }

        return handleError(patient, STATUSES.OK);
    }

    async isEmpty() {
        return this.queueService.isEmpty();
    }
}

const queueController = new QueueController(patientStorageService);
export default queueController;
