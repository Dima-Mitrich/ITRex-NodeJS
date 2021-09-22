export default class MySQLSpecialization {
    constructor(doctorModel, specializationModel) {
        this.specializationModel = specializationModel;
        this.doctorModel = doctorModel;
    }

    async addSpec(specialization) {
        const result = await this.specializationModel.create({
            specialization,
        });
        return result;
    }

    async getSpecByUserId(userID) {
        const resultData = await this.doctorModel.findOne({
            where: {
                user_id: userID,
            },
            include: [{
                attributes: ['specialization'],
                model: this.specializationModel,
            }],

        });
        const result = resultData.specializations.map((elem) => elem.specialization);

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
        const result = await this.specializationModel.findAll({
            include: {
                model: this.doctorModel,
            },
        });

        return result;
    }
}
