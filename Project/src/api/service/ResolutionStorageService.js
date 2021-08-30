import { resolutionRepository } from '../database/storage-factory.js';

class ResolutionStorageService {
    constructor(resolutionRepository) {
        this.resolutionRepository = resolutionRepository;
        this.currentResolution = null;
    }

    async addNewResolution(resolution, ttl = false) {
        try {
            const result = await this.resolutionRepository.push(resolution, ttl);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolution(patientID, isFromDoctor) {
        try {
            const result = await this.resolutionRepository.findResolution(patientID);

            if (isFromDoctor) {
                this.currentResolution = result;
            }

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async deleteResolution(patientID = this.currentResolution.patientID) {
        try {
            const result = await this.resolutionRepository.deleteResolution(patientID);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const resolutionStorageService = new ResolutionStorageService(resolutionRepository);
export default resolutionStorageService;
