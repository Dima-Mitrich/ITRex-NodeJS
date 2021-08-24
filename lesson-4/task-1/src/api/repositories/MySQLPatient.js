export default class MySQLPatient {
    constructor(model) {
        this.model = model;
    }

    push(patient) {
        this.model.create({
            name: patient.name,
        });
    }
}
