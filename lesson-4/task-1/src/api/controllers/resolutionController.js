import resolutionListService from '../service/ResolutionListService.js';
import handleError from '../helpers/handleError.js';
import { STATUSES } from '../../constants.js';

class ResolutionController {
    constructor(resolutionListService) {
        this.resolutionListService = resolutionListService;
    }

    async addResolution(newResolutionContent, currentPatient, ttl) {
        const result = await this.resolutionListService.addNewResolution(newResolutionContent, currentPatient, ttl);

        return handleError(result, STATUSES.ServerError, STATUSES.Created);
    }

    async deleteResolution(name) {
        const result = await this.resolutionListService.deleteResolution(name);

        return handleError(result, STATUSES.NotFound, STATUSES.OK);
    }

    async findResolution(name, isDoctor) {
        const result = await this.resolutionListService.findResolution(name, isDoctor);

        return handleError(result, STATUSES.NotFound, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionListService);
export default resolutionController;
