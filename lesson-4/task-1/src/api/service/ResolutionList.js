class ResolutionList {
    constructor() {
        this.resolutionList = {};
        this.currentResolution = null;
    }

    async addNewResolution(resolution, ttl = false) {
        const patientName = resolution.patient.name;

        if (await this.isExist(patientName)) {
            this.resolutionList[patientName].content += ` | ${resolution.content}`;
        } else {
            this.resolutionList[patientName] = resolution;
        }

        if (ttl) {
            setTimeout(async () => { await this.deleteResolution(patientName); }, 10000);
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

    async deleteResolution(key) {
        await delete this.resolutionList[key];
    }

    async isExist(name) {
        const res = await name in this.resolutionList;
        return res;
    }
}

const resolutionList = new ResolutionList();
export default resolutionList;
