import { v4 as uuidv4 } from 'uuid';
import patientController from './PatientController.js';
import Resolution from '../interface/Resolution.js';
import resolutionStorageService from '../service/ResolutionStorageService.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

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

    async findResolution(name, isDoctor) {
        const patient = await patientController.getPatient({ name });
        const result = await this.resolutionListService.findResolution(patient.value, isDoctor);

        return handleError(result, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionStorageService);
export default resolutionController;
