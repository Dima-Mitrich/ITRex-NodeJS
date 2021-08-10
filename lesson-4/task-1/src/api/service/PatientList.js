class PatientList {
    constructor() {
        this.queue = [];
    }

    async addPatient(obj) {
        await this.queue.push(obj);
    }

    async takePatient() {
        const patient = await this.queue.shift();
        return patient;
    }

    async isEmpty() {
        const result = await this.queue.length === 0;
        return result;
    }

    async size() {
        const size = await this.queue.length;
        return size;
    }
}

const queue = new PatientList();
export default queue;
