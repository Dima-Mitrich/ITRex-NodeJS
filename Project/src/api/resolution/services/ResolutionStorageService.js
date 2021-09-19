import { resolutionRepository, doctorRepository } from '../../repositoryCreater.js';

class ResolutionStorageService {
    constructor(resolutionRepository, doctorRepository) {
        this.resolutionRepository = resolutionRepository;
        this.doctorRepository = doctorRepository;
        this.currentResolution = null;
    }

    async addNewResolution(resObj) {
        const {
            resolutionObj, ttl, userID, spec,
        } = resObj;
        try {
            // console.log(this.doctorRepository);
            // const doctor = await this.doctorRepository.getByUserID(userID);

            const result = await this.resolutionRepository.push(resolutionObj, ttl, userID, spec);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolutionsByName(name) {
        try {
            const result = await this.resolutionRepository.findResolutionByName(name);

            return result;
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

    async deleteResolution(resolutionID) {
        try {
            const result = await this.resolutionRepository.deleteResolution(resolutionID);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const resolutionStorageService = new ResolutionStorageService(resolutionRepository, doctorRepository);
export default resolutionStorageService;
