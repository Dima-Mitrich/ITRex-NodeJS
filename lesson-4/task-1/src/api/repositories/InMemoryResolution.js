import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../constants.js';

export default class InMemoryResolution {
    constructor(resolutionStorage) {
        this.resolutionList = resolutionStorage;
    }

    push(resolution, ttl = false) {
        const patientName = resolution.patient.name;

        if (this.isExist(patientName)) {
            this.resolutionList[patientName].content += ` | ${resolution.content}`;
        } else {
            this.resolutionList[patientName] = resolution;
        }

        if (ttl) {
            setTimeout(() => { this.deleteResolution(patientName); }, TTL_MILSEC);
        }

        return SUCCESS_MESSAGE;
    }

    findResolution(name) {
        const result = this.resolutionList[name];

        if (!result) {
            throw new Error(NOT_FOUND_MESSAGE);
        } else {
            return JSON.stringify(result);
        }
    }

    deleteResolution(name) {
        delete this.resolutionList[name];

        return SUCCESS_MESSAGE;
    }

    isExist(name) {
        const res = name in this.resolutionList;

        return res;
    }
}
