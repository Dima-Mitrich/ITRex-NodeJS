export default class MySQLPatient {
    constructor(model) {
        this.model = model;
    }

    async push(patient) {
        await this.model.create({
            name: patient.name,
            id: patient.id,
        });
    }

    async getByName(name) {
        const result = await this.model.findOne({
            where: {
                name,
            },
        });
        return result
            ? result.id
            : result;
    }

    async getById(id) {
        const result = await this.model.findByPk(id);
        const { name } = result;
        return { id, name };
    }
}
