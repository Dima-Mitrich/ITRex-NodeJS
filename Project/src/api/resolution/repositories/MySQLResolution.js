import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../../constants.js';

export default class MySQLResolution {
    constructor(resolutionsModel, patientsModel, doctorModel, doctorUserModel) {
        this.resolutionsModel = resolutionsModel;
        this.patientsModel = patientsModel;
        this.doctorModel = doctorModel;
        this.doctorUserModel = doctorUserModel;
    }

    async push(resolutionObj, ttl, userID, spec) {
        const { patientID } = resolutionObj;

        const doctor = await this.doctorModel.findOne({
            include: {
                model: this.doctorUserModel,
                where: {
                    user_id: userID,
                },
            },
        });

        const result = await this.resolutionsModel.create({
            id: resolutionObj.id,
            patientId: patientID,
            doctorId: doctor.id,
            content: resolutionObj.content,
            speciality: spec,
            ttl,
        });

        return result.id;
    }

    async findResolutionByName(name) {
        const result = await this.resolutionsModel.findAll({
            attributes: ['id', 'content', 'speciality', 'createdAt'],
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
            attributes: ['id', 'content', 'speciality', 'createdAt'],
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
}
