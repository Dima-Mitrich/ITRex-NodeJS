import { queueRepository } from '../database/storage-factory.js';
import { NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../constants.js';

export class QueueService {
    constructor(queueRepository) {
        this.queueRepository = queueRepository;
    }

    async addPatient(id) {
        try {
            await this.queueRepository.push(id);

            return SUCCESS_MESSAGE;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async takePatient() {
        try {
            const patientID = await this.queueRepository.shift();

            if (!patientID) {
                throw new Error(NOT_FOUND_MESSAGE);
            } else return patientID;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isEmpty() {
        try {
            const result = await this.queueRepository.isEmpty();

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const queueService = new QueueService(queueRepository);
export default queueService;
