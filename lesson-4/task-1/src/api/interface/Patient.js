export default class Patient {
    constructor(name) {
        this.name = name;
        this.resolution = null;
    }

    addResolution(resolution) {
        this.resolution = resolution;
    }
}
