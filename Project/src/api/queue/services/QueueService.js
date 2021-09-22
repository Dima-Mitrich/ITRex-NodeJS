import { queueRepository } from '../../repositoryCreater.js';
import { NOT_FOUND_MESSAGE } from '../../../constants.js';

export class QueueService {
    constructor(queueRepository) {
        this.queueRepository = queueRepository;
    }

    async addPatient(id, docID) {
        try {
            const result = await this.queueRepository.push(id, docID);

            return result;
        } catch (err) {
            console.log(err);

            return err;// при отсутствии пациента в очереди  на фронте не появл статус 409 и ошибка
        }
    }

    async takePatient(docID) {
        const patientID = await this.queueRepository.shift(docID);

        if (!patientID) throw new Error(NOT_FOUND_MESSAGE);
        return patientID;
    }

    async isEmpty(docID) {
        try {
            const result = await this.queueRepository.isEmpty(docID);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const queueService = new QueueService(queueRepository);
export default queueService;
