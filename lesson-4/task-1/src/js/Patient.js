"use strict";

export default class Patient {

    constructor(name) {
        this.name = name;
        this.resolution;
    }

    addResolution(resolution) {
        this.resolution = resolution;
    }
}