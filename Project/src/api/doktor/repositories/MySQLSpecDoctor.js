export default class MySQLSpecDoctor {
    constructor(specDoctorModel) {
        this.specDoctorModel = specDoctorModel;
    }

    async addLinc(doctorId, specId) {
        const result = await this.specDoctorModel.create({
            doctorId,
            specializationId: specId,
        });

        return result;
    }

    async deleteLinc(doctorId) {
        const result = await this.specDoctorModel.destroy({
            where: {
                doctorId,
            },
        });
        return result;
    }
}
