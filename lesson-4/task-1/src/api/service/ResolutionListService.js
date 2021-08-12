import resolutionStorage from '../database/resolution-storage.js';
import Resolution from './Resolution.js';

class ResolutionList {
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
                setTimeout(async () => { await this.deleteResolution(patientName); }, 10000);
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

            return this.currentResolution;
        } else {
            return result;
        }
    }

    async deleteResolution(key) {
        try {
            if (await this.isExist(key)) {
                await delete this.resolutionList[key];

                return 'succes';
            } else {
                throw new Error('not found');
            }
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

const resolutionListService = new ResolutionList();
export default resolutionListService;
