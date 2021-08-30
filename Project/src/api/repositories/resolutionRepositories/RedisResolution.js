import { promisify } from 'util';
import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../../constants.js';

export default class RedisResolution {
    constructor(resolutionStorage) {
        this.resolutionStorage = resolutionStorage;
    }

    async push(resolution, ttl = false) {
        const { patientID } = resolution;

        const addNewResolution = promisify(this.resolutionStorage.set).bind(this.resolutionStorage);
        const getResolution = promisify(this.resolutionStorage.get).bind(this.resolutionStorage);

        try {
            if (await this.isExist(patientID)) {
                const oldResolution = JSON.parse(await getResolution(patientID)); // transactions
                oldResolution.content += ` | ${resolution.content}`;

                ttl
                    ? await addNewResolution(patientID, JSON.stringify(oldResolution), 'PX', TTL_MILSEC)
                    : await addNewResolution(patientID, JSON.stringify(oldResolution));
            } else {
                ttl
                    ? await addNewResolution(patientID, JSON.stringify(resolution), 'PX', TTL_MILSEC)
                    : await addNewResolution(patientID, JSON.stringify(resolution));
            }

            return resolution;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolution(patientID) {
        const findResolution = promisify(this.resolutionStorage.get).bind(this.resolutionStorage);

        const result = await findResolution(patientID);

        if (!result) {
            throw new Error(NOT_FOUND_MESSAGE);
        } else {
            return JSON.parse(result);
        }
    }

    async deleteResolution(patientID) {
        const deleteResolution = promisify(this.resolutionStorage.del).bind(this.resolutionStorage);
        await deleteResolution(patientID);

        return SUCCESS_MESSAGE;
    }

    async isExist(id) {
        const isExist = promisify(this.resolutionStorage.EXISTS).bind(this.resolutionStorage);
        const result = await isExist(id);

        return result;
    }

    async closeConnection() {
        await this.resolutionStorage.quit();
    }
}
