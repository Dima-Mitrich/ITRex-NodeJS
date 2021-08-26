import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../../constants.js';

export default class InMemoryResolution {
    constructor(resolutionStorage) {
        this.resolutionList = resolutionStorage;
    }

    push(resolution, ttl = false) {
        const { patientID } = resolution;

        if (this.isExist(patientID)) {
            this.resolutionList[patientID].content += ` | ${resolution.content}`;
        } else {
            this.resolutionList[patientID] = resolution;
        }

        if (ttl) {
            setTimeout(() => { this.deleteResolution(patientID); }, TTL_MILSEC);
        }

        return resolution;
    }

    findResolution(patientID) {
        const result = this.resolutionList[patientID];

        if (!result) {
            throw new Error(NOT_FOUND_MESSAGE);
        } else {
            return result;
        }
    }

    deleteResolution(patientID) {
        delete this.resolutionList[patientID];

        return SUCCESS_MESSAGE;
    }

    isExist(patientID) {
        const res = patientID in this.resolutionList;

        return res;
    }
}
