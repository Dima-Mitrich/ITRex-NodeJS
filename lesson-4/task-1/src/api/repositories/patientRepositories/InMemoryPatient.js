export default class InMemoryPatient {
    constructor(patientStorage) {
        this.storage = patientStorage;
    }

    push(patient) {
        this.storage.push(patient);
        // console.log(this.storage);

        return patient;
    }

    getByName(name) {
        const result = this.storage.find((elem) => elem.name === name);
        if (result) {
            return result.id;
        } else {
            return result;
        }
    }

    getById(id) {
        const result = this.storage.find((elem) => elem.id === id);

        return result;
    }
}
