"use strict";

export default class PatientQueue {

    constructor() {
        this.queue = [];
    }

    addPatient(obj) {
        this.queue.push(obj);
    }

    takePatient() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    clear() {
        this.queue.length = 0;
    }
}