export default class Patient {
    constructor(name, id) {
        this.name = name;
        this.resolutionID = null;
        this.id = id;
    }

    addResolution(resolutionID) {
        this.resolution_id = resolutionID;
    }
}
