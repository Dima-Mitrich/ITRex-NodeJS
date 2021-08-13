"use strict";

export default class ResolutionList {

    constructor() {
        this.resolutionList = [];
        this.currentResolution;
    }

    addNewResolution(resolution) {
        this.resolutionList.push(resolution);
    }

    findResolution(patientName, isFromDoctor) {
        let result = this.resolutionList.find(elem => elem.patient.name === patientName);

        if (!result) {
            return 'There is no such patient';
        }

        if (isFromDoctor) {
            this.currentResolution = result;
            return this.currentResolution.content;
        } else {
            return result.content;
        }
    }

    deleteResolution() {
        this.resolutionList = this.resolutionList.filter(elem => elem !== this.currentResolution);
    }
}