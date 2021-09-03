import { v4 as uuidv4 } from 'uuid';
import userService from '../services/UserService.js';
import jwtService from '../services/JwtService.js';
import handleError from '../../helpers/handleError.js';
import patientController from '../../patient/controller/PatientController.js';
import {
    STATUSES, WRONG_EMAIL_MESSAGE, WRONG_PASSWORD_MESSAGE, NO_TOKEN_MESSAGE,
} from '../../../constants.js';

class AuthController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    async signUpNewPatient(patient) {
        try {
            const isExist = await patientController.isExist(patient);
            if (isExist) throw isExist;

            const { password } = patient;
            const newUser = await this.createNewUser(password);

            if (newUser.status !== STATUSES.Created) throw new Error(newUser.value.message);

            patient.id = uuidv4();
            patient.userID = newUser.value.userID;
            patient.password = newUser.value.password;
            const result = await patientController.addPatient(patient);

            return handleError(result, STATUSES.Created);
        } catch (err) {
            console.log(err);

            return handleError(err);
        }
    }

    async createNewUser(password) {
        const user = await this.userService.createNewUser({ password, userID: uuidv4() });

        return handleError(user, STATUSES.Created);
    }

    async signInUser(user) {
        const { email, password } = user;
        const patient = await patientController.getPatient({ email });

        if (patient.status === 404) return handleError(new Error(WRONG_EMAIL_MESSAGE));

        const userID = patient.value.user_id;
        const isPasswordRight = await this.userService.isPasswordMatches(userID, password);

        if (!isPasswordRight) return handleError(new Error(WRONG_PASSWORD_MESSAGE));

        const token = this.jwtService.createJwtToken(userID);

        return handleError(token);
    }

    async checkToken(token) {
        try {
            if (!token) throw new Error(NO_TOKEN_MESSAGE);
            const res = this.jwtService.checkJwtToken(token);

            return handleError(res);
        } catch (err) {
            return handleError(err);
        }
    }
}

const authController = new AuthController(userService, jwtService);
export default authController;
