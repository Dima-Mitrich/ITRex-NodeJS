import { NOT_FOUND_MESSAGE } from '../../../constants.js';
import { specializationRepository } from '../../repositoryCreater.js';

export class SpecStorageService {
    constructor(specializationRepository) {
        this.specializationRepository = specializationRepository;
    }

    async addSpec(specialization) {
        try {
            const result = await this.specializationRepository.addSpec(specialization);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async getSpecializations() {
        try {
            const result = await this.specializationRepository.getAllSpec();

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async getSpecByUserId(userID) {
        try {
            const result = await this.specializationRepository.getSpecByUserId(userID);

            if (result) {
                return result;
            } else {
                throw new Error(NOT_FOUND_MESSAGE);
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async getSpecList() {
        try {
            const result = await specializationRepository.getAllSpec();

            const specData = [];
            result.forEach((elem, i) => {
                specData[i] = elem.dataValues.specialization;
            });

            if (result) {
                return specData;
            } else {
                throw new Error(NOT_FOUND_MESSAGE);
            }
        } catch (err) {
            return err;
        }
    }
}

const specStorageService = new SpecStorageService(specializationRepository);
export default specStorageService;
