export default class ResolutionList {
    constructor() {
        this.resolutionList = {};
        this.currentResolution = null;
    }

    addNewResolution(resolution, ttl = false) {
        const patientName = resolution.patient.name;

        if (!(patientName in this.resolutionList)) {
            this.resolutionList[patientName] = resolution;
        } else {
            this.resolutionList[patientName].content += ` | ${resolution.content}`;
        }

        if (ttl) {
            setTimeout(() => this.deleteResolution(patientName), 10000);
        }
    }

    findResolution(patientName, isFromDoctor) {
        const result = this.resolutionList[patientName];

        if (!result) {
            return null;
        }

        if (isFromDoctor) {
            this.currentResolution = result;
            return this.currentResolution.content;
        } else {
            return result.content;
        }
    }

    deleteResolution(key) {
        delete this.resolutionList[key];
    }
}
