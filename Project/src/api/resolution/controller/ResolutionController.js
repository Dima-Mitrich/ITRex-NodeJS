import { v4 as uuidv4 } from 'uuid';
import patientController from '../../patient/controller/PatientController.js';
import Resolution from '../../interface/Resolution.js';
import resolutionStorageService from '../services/ResolutionStorageService.js';
import resultHandler from '../../helpers/resultHandler.js';
import { STATUSES } from '../../../constants.js';

class ResolutionController {
    constructor(resolutionListService) {
        this.resolutionListService = resolutionListService;
    }

    async addResolution(newResolutionContent, currentPatient, ttl) {
        const resolution = new Resolution(newResolutionContent, currentPatient.id, uuidv4());
        const result = await this.resolutionListService.addNewResolution(resolution, ttl);

        return resultHandler(result, STATUSES.Created);
    }

    async deleteResolution() {
        const result = await this.resolutionListService.deleteResolution();

        return resultHandler(result, STATUSES.OK);
    }

    async findResolution({ name = null, userID = null }, isDoctor) {
        const patient = await patientController.getPatient({ name, userID });
        if (patient.status !== 200) return resultHandler(patient.value);

        const result = await this.resolutionListService.findResolution(patient.value.id, isDoctor);

        return resultHandler(result, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionStorageService);
export default resolutionController;
