import queueService from '../../queue/services/QueueService.js';
import doctorStorageService from '../services/DoctorStorageServise.js';
import resultHandler from '../../helpers/resultHandler.js';
import { STATUSES, NAME_IS_EXIST, EMAIL_IS_EXIST } from '../../../constants.js';

class DoctorController {
    constructor(doctorStorageService, queueService) {
        this.doctorStorageService = doctorStorageService;
        this.queueService = queueService;
    }

    async addDoctor(doctor) {
        const result = await this.doctorStorageService.addDoctor(doctor);

        return resultHandler(result, STATUSES.Created);
    }

    async addSpec(specialization) {
        const result = await this.doctorStorageService.addSpec(specialization);

        return resultHandler(result, STATUSES.Created);
    }

    async getSpecList() {
        const result = await this.doctorStorageService.getSpecList();

        return resultHandler(result, STATUSES.OK);
    }

    async getDoctor({
        name = null, id = null, email = null, userID = null,
    }) {
        const doctor = await this.doctorStorageService.getDoctor(
            name, id, email, userID,
        );

        return resultHandler(doctor, STATUSES.OK);
    }

    async getSpecByUserId(userID) {
        const specs = await this.doctorStorageService.getSpecByUserId(userID);

        return resultHandler(specs, STATUSES.OK);
    }

    async isExist(doctor) {
        const { email, name } = doctor;
        const checkEmail = await this.getDoctor({ email });
        const checkName = await this.getDoctor({ name });

        if (checkEmail.status === 200) return new Error(EMAIL_IS_EXIST);
        if (checkName.status === 200) return new Error(NAME_IS_EXIST);

        return false;
    }
}

const doctorController = new DoctorController(doctorStorageService, queueService);
export default doctorController;
