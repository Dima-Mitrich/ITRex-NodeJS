export default class MySQLDoctor {
    constructor(doctorModel, specializationModel, doctorSpecialization, doctorUser) {
        this.doctorModel = doctorModel;
        this.specializationModel = specializationModel;
        this.doctorSpecialization = doctorSpecialization;
        this.doctorUser = doctorUser;
    }

    async push(doctor) {
        const result = await this.doctorModel.create({
            name: doctor.name,
            id: doctor.id,
            email: doctor.email,
            age: doctor.age,
            gender: doctor.gender,
            education: doctor.education,
            experience: doctor.experience,
            user_id: doctor.userID,
        });

        return result;
    }

    async addSpec(specialization) {
        await this.specializationModel.create({
            specialization,
        });
    }

    async getByName(name) {
        const result = await this.doctorModel.findOne({
            where: {
                name,
            },
        });

        return result;
    }

    async getById(id) {
        const result = await this.doctorSpecialization.findAll({
            where: {
                doctorId: id,
            },
        });
        return result;
    }

    async getByUserId(userID) {
        const result = await this.doctorModel.findOne({
            include: {
                model: this.doctorUser,
                where: {
                    user_id: userID,
                },
            },
        });

        return result;
    }

    async getSpecByUserId(userID) {
        const result = await this.doctorModel.findOne({
            include: [{
                model: this.doctorUser,
                where: {
                    user_id: userID,
                },
            },
            {
                model: this.doctorSpecialization,
                include: { model: this.specializationModel },
            }],

        });
        return result;
    }

    async getByEmail(email) {
        const result = await this.doctorModel.findOne({
            where: {
                email,
            },
        });

        return result;
    }

    async getBySpecializationID(specializationID) {
        const result = await this.doctorModel.findOne({
            include: {
                model: this.docSpecModel,
                where: {
                    specializationid: specializationID,
                },
            },

        });

        return result;
    }
}
