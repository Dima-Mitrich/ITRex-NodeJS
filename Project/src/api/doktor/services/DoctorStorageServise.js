import { NOT_FOUND_MESSAGE } from '../../../constants.js';
import { doctorRepository, specializationRepository, specDoctorRepository } from '../../repositoryCreater.js';

export class DoctorStorageService {
    constructor(doctorRepository, specializationRepository, specDoctorRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
        this.specDoctorRepository = specDoctorRepository;
    }

    async addDoctor(doctor) {
        try {
            const result = await this.doctorRepository.push(doctor);

            const doctorId = result.dataValues.id;
            const { specialization } = doctor;

            for (const elem of specialization) {
                const spec = await specializationRepository.getSpecByName(elem);
                const specId = spec.dataValues.id;
                await this.specDoctorRepository.addLinc(doctorId, specId);
            }

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
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

    async getDoctor(name, id, email, userID) {
        try {
            let result;

            if (name) {
                result = await this.doctorRepository.getByName(name);
            } else if (id) {
                result = await this.doctorRepository.getById(id);
            } else if (email) {
                result = await this.doctorRepository.getByEmail(email);
            } else if (userID) {
                result = await this.doctorRepository.getByUserId(userID);
            }

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

    async getSpecByUserId(userID) {
        try {
            const result = await this.doctorRepository.getSpecByUserId(userID);
            const specList = [];
            for (const elem of result.specializations) {
                specList.push(elem.dataValues.specialization.dataValues.specialization);
            }
            if (specList) {
                return specList;
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

const doctorStorageService = new DoctorStorageService(doctorRepository, specializationRepository, specDoctorRepository);
export default doctorStorageService;
