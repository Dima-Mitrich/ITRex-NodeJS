import { v4 as uuidv4 } from 'uuid';
import patientController from '../../patient/controller/PatientController.js';
import Resolution from '../../interface/Resolution.js';
import resolutionStorageService from '../services/ResolutionStorageService.js';
import handleError from '../../helpers/handleError.js';
import { STATUSES } from '../../../constants.js';

class ResolutionController {
    constructor(resolutionListService) {
        this.resolutionListService = resolutionListService;
    }

    async addResolution(newResolutionContent, currentPatient, ttl) {
        const resolution = new Resolution(newResolutionContent, currentPatient.id, uuidv4());
        const result = await this.resolutionListService.addNewResolution(resolution, ttl);

        return handleError(result, STATUSES.Created);
    }

    async deleteResolution() {
        const result = await this.resolutionListService.deleteResolution();

        return handleError(result, STATUSES.OK);
    }

    async findResolution({ name = null, userID = null }, isDoctor) {
        const patient = await patientController.getPatient({ name, userID });
        if (patient.status !== 200) return handleError(patient.value);

        const result = await this.resolutionListService.findResolution(patient.value.id, isDoctor);

        return handleError(result, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionStorageService);
export default resolutionController;
