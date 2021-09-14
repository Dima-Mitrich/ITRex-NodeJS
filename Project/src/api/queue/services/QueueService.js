import { queueRepository } from '../../repositoryCreater.js';
import { NOT_FOUND_MESSAGE } from '../../../constants.js';

export class QueueService {
    constructor(queueRepository) {
        this.queueRepository = queueRepository;
    }

    async addPatient(id, spec) {
        try {
            const result = await this.queueRepository.push(id, spec);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async takePatient(spec) {
        try {
            const patientID = await this.queueRepository.shift(spec);

            if (!patientID) {
                throw new Error(NOT_FOUND_MESSAGE);
            } else return patientID;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isEmpty(spec) {
        try {
            const result = await this.queueRepository.isEmpty(spec);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const queueService = new QueueService(queueRepository);
export default queueService;
