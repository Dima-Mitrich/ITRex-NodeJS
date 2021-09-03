export default class MySQLPatient {
    constructor(model) {
        this.model = model;
    }

    async push(patient) {
        await this.model.create({
            name: patient.name,
            id: patient.id,
            email: patient.email,
            age: patient.age,
            gender: patient.gender,
            user_id: patient.userID,
        });

        return patient;
    }

    async getByName(name) {
        const result = await this.model.findOne({
            where: {
                name,
            },
        });

        return result;
    }

    async getById(id) {
        const result = await this.model.findByPk(id);
        const { name, email } = result;
        return { id, name, email };
    }

    async getByEmail(email) {
        const result = await this.model.findOne({
            where: {
                email,
            },
        });

        return result;
    }

    async getByUserID(userID) {
        const result = await this.model.findOne({
            where: {
                user_id: userID,
            },
        });

        return result;
    }
}
