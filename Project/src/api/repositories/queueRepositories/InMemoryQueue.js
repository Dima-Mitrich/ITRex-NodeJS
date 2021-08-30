export default class InMemoryQueue {
    constructor(queue) {
        this.queue = queue;
    }

    push(patientID) {
        this.queue.push(patientID);

        return patientID;
    }

    shift() {
        const patientID = this.queue.shift();

        return patientID;
    }

    isEmpty() {
        const result = this.queue.length === 0;

        return result;
    }
}
