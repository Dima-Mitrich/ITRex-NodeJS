export default class MySQLDoctor {
    constructor(doctorModel, specializationModel, userModel) {
        this.doctorModel = doctorModel;
        this.specializationModel = specializationModel;
        this.userModel = userModel;
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
        const { specialization } = doctor;
        for (const elem of specialization) {
            const spec = await this.specializationModel.findOne({
                where: {
                    specialization: elem,
                },

            });
            result.addSpecialization(spec);
        }

        return result;
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
        const result = await this.doctorModel.findOne({
            where: {
                doctorId: id,
            },
        });
        return result;
    }

    async getByUserId(userID) {
        const result = await this.doctorModel.findOne({
            include: {
                model: this.userModel,
                where: {
                    user_id: userID,
                },
            },
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
}
