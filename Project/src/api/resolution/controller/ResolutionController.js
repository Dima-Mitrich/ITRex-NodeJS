import { v4 as uuidv4 } from 'uuid';
import patientController from '../../patient/controller/PatientController.js';
import Resolution from '../../interface/Resolution.js';
import resolutionStorageService from '../services/ResolutionStorageService.js';
import resultHandler from '../../helpers/resultHandler.js';
import { STATUSES, USER_TYPE } from '../../../constants.js';

class ResolutionController {
    constructor(resolutionListService) {
        this.resolutionListService = resolutionListService;
    }

    async addResolution(resData) {
        const {
            resolution, patientID, ttl, userID, spec,
        } = resData;
        const resolutionObj = new Resolution(resolution, patientID, uuidv4());
        const resObj = {
            resolutionObj, ttl, userID, spec,
        };
        const result = await this.resolutionListService.addNewResolution(resObj);

        return resultHandler(result, STATUSES.Created);
    }

    async deleteResolution(resolutionID) {
        const result = await this.resolutionListService.deleteResolution(resolutionID);

        return resultHandler(result, STATUSES.OK);
    }

    async findResolutionsByName({ name, role }) {
        if (role !== USER_TYPE.DOCTOR) {
            return { status: STATUSES.BadRequest };
        }

        const result = await this.resolutionListService.findResolutionsByName(name);
        if (result.length === 0) {
            return { status: STATUSES.NotFound };
        }

        return resultHandler(result, STATUSES.OK);
    }

    async findResolutionsByUserId({ userID, role }) {
        if (role !== USER_TYPE.PATIENT) {
            return { status: STATUSES.BadRequest };
        }

        const result = await this.resolutionListService.findResolutionByUserId(userID);

        if (result.length === 0) {
            return { status: STATUSES.NotFound };
        }

        return resultHandler(result, STATUSES.OK);
    }
}

const resolutionController = new ResolutionController(resolutionStorageService);
export default resolutionController;
