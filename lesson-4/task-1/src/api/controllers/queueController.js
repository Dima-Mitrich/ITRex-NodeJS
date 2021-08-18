import queueService from '../service/patient-storage-service/PatientServiceFactory.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }

    async addInQueue(name) {
        const result = await this.queueService.addPatient(name);

        return handleError(result, STATUSES.ServerError, STATUSES.Created);
    }

    async getPatient() {
        const patient = await queueService.takePatient();
        const isEmpty = await this.isEmpty();

        return handleError({ patient, isEmpty }, STATUSES.ServerError, STATUSES.OK);
    }

    async isEmpty() {
        return this.queueService.isEmpty();
    }
}

const queueController = new QueueController(queueService);
export default queueController;
