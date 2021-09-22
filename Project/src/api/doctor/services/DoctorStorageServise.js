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
}

const doctorStorageService = new DoctorStorageService(doctorRepository, specializationRepository, specDoctorRepository);
export default doctorStorageService;
