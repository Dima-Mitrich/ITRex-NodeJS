export default class MySQLSpecialization {
    constructor(specializationModel) {
        this.specializationModel = specializationModel;
    }

    async addSpec(specialization) {
        const result = await this.specializationModel.create({
            specialization,
        });
        return result;
    }

    async getSpecById(id) {
        const result = await this.specializationModel.findOne({
            where: {
                id,
            },
        });
        return result;
    }

    async getSpecByName(specialization) {
        const result = await this.specializationModel.findOne({
            where: {
                specialization,
            },
        });

        return result;
    }

    async getAllSpec() {
        const result = await this.specializationModel.findAll();

        return result;
    }
}
