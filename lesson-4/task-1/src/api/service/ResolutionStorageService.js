import Resolution from '../interface/Resolution.js';
import { resolutionRepository } from '../database/storage-factory.js';

class ResolutionStorageService {
    constructor(resolutionRepository) {
        this.resolutionRepository = resolutionRepository;
        this.currentResolution = null;
    }

    async addNewResolution(newResolutionContent, currentPatient, ttl = false) {
        const resolution = new Resolution(newResolutionContent, currentPatient);

        try {
            const result = await this.resolutionRepository.push(resolution, ttl);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolution(patientName, isFromDoctor) {
        try {
            const result = await this.resolutionRepository.findResolution(patientName);

            if (isFromDoctor) {
                this.currentResolution = JSON.parse(result);
            }

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async deleteResolution(name = this.currentResolution.patient.name) {
        try {
            const result = await this.resolutionRepository.deleteResolution(name);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const resolutionStorageService = new ResolutionStorageService(resolutionRepository);
export default resolutionStorageService;
