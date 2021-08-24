import resolutionStorageService from '../service/ResolutionStorageService.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

class ResolutionController {
    constructor(resolutionListService) {
        this.resolutionListService = resolutionListService;
    }

    async addResolution(newResolutionContent, currentPatient, ttl) {
        const result = await this.resolutionListService.addNewResolution(newResolutionContent, currentPatient, ttl);

        return handleError(result, STATUSES.Created);
    }

    async deleteResolution() {
        const result = await this.resolutionListService.deleteResolution();

        return handleError(result, STATUSES.OK);
    }

    async findResolution(name, isDoctor) {
        const result = await this.resolutionListService.findResolution(name, isDoctor);

        return handleError(result, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionStorageService);
export default resolutionController;
