export default class InMemoryPatient {
    constructor(patientStorage) {
        this.queue = patientStorage;
    }

    push(patient) {
        this.queue.push(patient);

        return patient;
    }

    shift() {
        const patient = this.queue.shift();

        return patient;
    }

    isEmpty() {
        const result = this.queue.length === 0;

        return result;
    }
}
