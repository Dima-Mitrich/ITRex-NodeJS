import { promisify } from 'util';
import { TTL_MILSEC, NOT_FOUND_MESSAGE, SUCCESS_MESSAGE } from '../../constants.js';

export default class RedisResolution {
    constructor(resolutionStorage) {
        this.resolutionStorage = resolutionStorage;
    }

    async push(resolution, ttl = false) {
        const patientName = resolution.patient.name;

        const addNewResolution = promisify(this.resolutionStorage.set).bind(this.resolutionStorage);
        const getResolution = promisify(this.resolutionStorage.get).bind(this.resolutionStorage);

        try {
            if (await this.isExist(patientName)) {
                const oldResolution = JSON.parse(await getResolution(patientName)); // transactions
                oldResolution.content += ` | ${resolution.content}`;

                ttl
                    ? await addNewResolution(patientName, JSON.stringify(oldResolution), 'PX', TTL_MILSEC)
                    : await addNewResolution(patientName, JSON.stringify(oldResolution));
            } else {
                ttl
                    ? await addNewResolution(patientName, JSON.stringify(resolution), 'PX', TTL_MILSEC)
                    : await addNewResolution(patientName, JSON.stringify(resolution));
            }

            return SUCCESS_MESSAGE;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolution(name) {
        const findResolution = promisify(this.resolutionStorage.get).bind(this.resolutionStorage);

        const result = await findResolution(name);

        if (!result) {
            throw new Error(NOT_FOUND_MESSAGE);
        } else {
            return result;
        }
    }

    async deleteResolution(name) {
        const deleteResolution = promisify(this.resolutionStorage.del).bind(this.resolutionStorage);
        await deleteResolution(name);

        return SUCCESS_MESSAGE;
    }

    async isExist(name) {
        const isExist = promisify(this.resolutionStorage.EXISTS).bind(this.resolutionStorage);
        const result = await isExist(name);

        return result;
    }

    async closeConnection() {
        await this.resolutionStorage.quit();
    }
}
