import resolutionStorage from '../../database/resolution-storage.js';
import Resolution from '../../interface/Resolution.js';
import { TTL_MILSEC } from '../../../constants.js';

export default class InMemoryResolutionStorageService {
    constructor() {
        this.resolutionList = resolutionStorage;
        this.currentResolution = null;
    }

    async addNewResolution(newResolutionContent, currentPatient, ttl = false) {
        const resolution = new Resolution(newResolutionContent, currentPatient);
        const patientName = resolution.patient.name;

        try {
            if (await this.isExist(patientName)) {
                this.resolutionList[patientName].content += ` | ${resolution.content}`;
            } else {
                this.resolutionList[patientName] = resolution;
            }

            if (ttl) {
                setTimeout(async () => { await this.deleteResolution(patientName); }, TTL_MILSEC);
            }

            return resolution;
        } catch (err) {
            return err;
        }
    }

    async findResolution(patientName, isFromDoctor) {
        const result = await this.resolutionList[patientName];

        if (!result) {
            return new Error('not found');
        }

        if (isFromDoctor) {
            this.currentResolution = result;
        }

        return JSON.stringify(result);
    }

    async deleteResolution(key = this.currentResolution.patient.name) {
        try {
            await delete this.resolutionList[key];

            return 'succes';
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isExist(name) {
        const res = await name in this.resolutionList;

        return res;
    }
}
