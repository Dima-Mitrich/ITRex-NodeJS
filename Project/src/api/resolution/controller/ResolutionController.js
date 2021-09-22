import { v4 as uuidv4 } from 'uuid';
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
        const resObj = {
            id: uuidv4(),
            content: resolution,
            ttl,
            userID,
            spec,
            patientID,
        };
        const result = await this.resolutionListService.addNewResolution(resObj);

        return resultHandler(result, STATUSES.Created);
    }

    async deleteResolution(resolutionID, userID) {
        try {
            const result = await this.resolutionListService.deleteResolution(resolutionID, userID);

            return resultHandler(result, STATUSES.NoContent);
        } catch (err) {
            console.log(err);

            return resultHandler(err);
        }
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
