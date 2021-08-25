import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../../constants.js';

export default class MySQLResolution {
    constructor(model) {
        this.model = model;
    }

    async push(resolution, ttl) {
        const { patientID } = resolution;

        const oldResolution = await this.model.findOne({
            where: {
                patientID,
            },
        });

        if (oldResolution) {
            await this.model.update({
                content: `${oldResolution.content} | ${resolution.content}`,
            },
            {
                where: {
                    patientID,
                    ttl,
                },
            });
        } else {
            this.model.create({
                content: resolution.content,
                id: resolution.id,
                patientID,
                ttl,
            });
        }

        return SUCCESS_MESSAGE;
    }

    async findResolution(patientID) {
        const result = await this.model.findOne({
            where: {
                patientID,
            },
        });

        const { id, content } = result;

        if (!result) return new Error(NOT_FOUND_MESSAGE);

        if (result.ttl && (new Date().getTime() - new Date(result.updatedAt).getTime() > TTL_MILSEC)) {
            await this.deleteResolution(result.patientID);
            return new Error(NOT_FOUND_MESSAGE);
        } else {
            return { id, content, patientID };
        }
    }

    async deleteResolution(patientID) {
        this.model.destroy({
            where: {
                patientID,
            },
        });

        return SUCCESS_MESSAGE;
    }
}
