import { promisify } from 'util';
import resolutionStorage from '../../database/resolution-storage.js';
import Resolution from '../../interface/Resolution.js';
import { TTL_MILSEC } from '../../../constants.js';

export default class RedisResolutionStorageService {
    constructor() {
        this.resolutionList = resolutionStorage;
        this.currentResolution = null;
    }

    async addNewResolution(newResolutionContent, currentPatient, ttl = false) {
        const resolution = new Resolution(newResolutionContent, currentPatient);
        const patientName = resolution.patient.name;

        const addNewResolution = promisify(this.resolutionList.set).bind(this.resolutionList);
        const getResolution = promisify(this.resolutionList.get).bind(this.resolutionList);

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

            return resolution;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async findResolution(patientName, isFromDoctor) {
        const findResolution = promisify(this.resolutionList.get).bind(this.resolutionList);

        try {
            const result = await findResolution(patientName);

            if (!result) {
                return new Error('not found');
            }

            if (isFromDoctor) {
                this.currentResolution = JSON.parse(result);
            }

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async deleteResolution(key = this.currentResolution.patient.name) {
        const deleteResolution = promisify(this.resolutionList.del).bind(this.resolutionList);

        try {
            await deleteResolution(key);

            return 'succes';
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async isExist(name) {
        const isExist = promisify(this.resolutionList.EXISTS).bind(this.resolutionList);

        try {
            const result = await isExist(name);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}
