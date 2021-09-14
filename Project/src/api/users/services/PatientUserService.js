import bcrypt from 'bcrypt';
import { patientUserRepository } from '../../repositoryCreater.js';
import { NOT_FOUND_MESSAGE } from '../../../constants.js';



class PatientUserService {
    constructor(repository) {
        this.repository = repository;
    }

    async createNewUser(user) {
        try {
            const { password } = user;
            user.password = await bcrypt.hash(password, 10);
            const result = await this.repository.addNewUser(user);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }

    async getUser(userID) {
        try {
            const result = await this.repository.getUser(userID);

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

    async isPasswordMatches(userID, currPassword) {
        try {
            const { password } = await this.getUser(userID);
            const result = await bcrypt.compare(currPassword, password);

            return result;
        } catch (err) {
            console.log(err);

            return err;
        }
    }
}

const patientUserService = new PatientUserService(patientUserRepository);
export default patientUserService;
