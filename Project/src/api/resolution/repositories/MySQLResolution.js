import { SUCCESS_MESSAGE } from '../../../constants.js';

export default class MySQLResolution {
    constructor(resolutionsModel, patientsModel, doctorModel, doctorUserModel) {
        this.resolutionsModel = resolutionsModel;
        this.patientsModel = patientsModel;
        this.doctorModel = doctorModel;
        this.doctorUserModel = doctorUserModel;
    }

    async push(resolutionObj, doctorId) {
        const {
            patientID, ttl, content, id,
        } = resolutionObj;

        const result = await this.resolutionsModel.create({
            id,
            patientId: patientID,
            doctorId,
            content,
            speciality: resolutionObj.spec,
            ttl,
        });

        return result.id;
    }

    async findResolutionByName(name) {
        const result = await this.resolutionsModel.findAll({
            attributes: ['id', 'content', 'speciality', 'createdAt', 'ttl'],
            include: [{
                model: this.patientsModel,
                as: 'patient',
                where: {
                    name,
                },
                attributes: ['name', 'gender', 'age'],
            },
            {
                model: this.doctorModel,
                as: 'doctor',
                attributes: ['name'],

            }],

        });
        return result;
    }

    async findResolutionByUserId(userId) {
        const result = await this.resolutionsModel.findAll({
            attributes: ['id', 'content', 'speciality', 'createdAt', 'ttl'],
            include: [{
                model: this.patientsModel,
                as: 'patient',
                where: {
                    user_id: userId,
                },
                attributes: ['name', 'gender', 'age'],
            },
            {
                model: this.doctorModel,
                as: 'doctor',
                attributes: ['name'],

            }],

        });
        return result;
    }

    async deleteResolution(resolutionID) {
        this.resolutionsModel.destroy({
            where: {
                id: resolutionID,
            },
        });

        return SUCCESS_MESSAGE;
    }

    async getResolutionById(id) {
        const res = await this.resolutionsModel.findByPk(id);

        return res;
    }
}
