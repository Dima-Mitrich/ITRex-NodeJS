import { resolutionRepository, doctorRepository } from '../../repositoryCreater.js';
import { NO_RIGHTS_TO_RESOLUTION_DELETE, NOT_FOUND_MESSAGE } from '../../../constants.js';
import config from '../../../../config.js';

class ResolutionStorageService {
    constructor(resolutionRepository, doctorRepository, ttl) {
        this.resolutionRepository = resolutionRepository;
        this.doctorRepository = doctorRepository;
        this.currentResolution = null;
        this.ttl = ttl;
    }

    async addNewResolution(resObj) {
        const { userID } = resObj;
        try {
            const doctor = await this.doctorRepository.getByUserId(userID);

            const result = await this.resolutionRepository.push(resObj, doctor.id);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolutionsByName(name) {
        try {
            const result = await this.resolutionRepository.findResolutionByName(name);

            const resultWithTtl = result.filter(
                (elem) => !elem.ttl || this.ttl - (new Date().getTime() - new Date(elem.createdAt).getTime()) > 0,
            );

            return resultWithTtl;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolutionByUserId(userID) {
        try {
            const result = await this.resolutionRepository.findResolutionByUserId(userID);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async deleteResolution(resolutionID, userID) {
        const res = await this.resolutionRepository.getResolutionById(resolutionID);

        if (!res) throw new Error(NOT_FOUND_MESSAGE);

        const doctor = await this.doctorRepository.getByUserId(userID);

        if (!(res.doctorId === doctor.id)) throw new Error(NO_RIGHTS_TO_RESOLUTION_DELETE);

        const result = await this.resolutionRepository.deleteResolution(resolutionID);

        return result;
    }
}

const resolutionStorageService = new ResolutionStorageService(resolutionRepository, doctorRepository, config.app.TTL_MILSEC);
export default resolutionStorageService;
