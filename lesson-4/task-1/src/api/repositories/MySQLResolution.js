export default class MySQLResolution {
    constructor(model) {
        this.model = model;
    }

    push(resolution) {
        this.model.create({
            content: resolution.content,
        });
    }

    findResolution(name) {
        console.log(name);
    }

    deleteResolution(name) {
        console.log(name);
    }
}
