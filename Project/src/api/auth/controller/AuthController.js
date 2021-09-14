import { v4 as uuidv4 } from 'uuid';
import patientUserService from '../../users/services/PatientUserService.js';
import doctorUserService from '../../users/services/DoctorUserService.js';
import jwtService from '../services/JwtService.js';
import resultHandler from '../../helpers/resultHandler.js';
import calculateAge from '../../helpers/calculateAge.js';
import patientController from '../../patient/controller/PatientController.js';
import doctorController from '../../doktor/controller/DoctorController.js';
import {
    STATUSES, WRONG_EMAIL_MESSAGE, WRONG_PASSWORD_MESSAGE, NO_TOKEN_MESSAGE, EMAIL_IS_EXIST,
    WRONG_BIRTHDAY_DATE, USER_TYPE,
} from '../../../constants.js';

class AuthController {
    constructor(patientUserService, doctorUserService, jwtService) {
        this.patientUserService = patientUserService;
        this.doctorUserService = doctorUserService;
        this.jwtService = jwtService;
    }

    async signUpNewUser(user) {
        try {
            const age = calculateAge(user.birthday);
            if (age > 120 || age < 1) throw new Error(WRONG_BIRTHDAY_DATE);
            if (user.role === USER_TYPE.PATIENT) {
                const isExist = await patientController.isExist(user);
                if (isExist) throw new Error(EMAIL_IS_EXIST);
            }
            if (user.role === USER_TYPE.DOCTOR) {
                const isExist = await doctorController.isExist(user);
                if (isExist) throw new Error(EMAIL_IS_EXIST);
            }

            const { role, password, email } = user;
            const newUser = await this.createNewUser(role, password, email);

            if (newUser.status !== STATUSES.Created) throw new Error(newUser.value.message);

            user.id = uuidv4();
            user.userID = newUser.value.userID;
            user.password = newUser.value.password;
            user.age = age;

            let result;

            if (user.role === USER_TYPE.PATIENT) {
                result = await patientController.addPatient(user);
            }

            if (user.role === USER_TYPE.DOCTOR) {
                result = await doctorController.addDoctor(user);
            }

            return resultHandler(result, STATUSES.Created);
        } catch (err) {
            return resultHandler(err);
        }
    }

    async createNewUser(role, password, email) {
        let user;
        if (role === USER_TYPE.PATIENT) {
            user = await this.patientUserService.createNewUser({ password, userID: uuidv4(), email });
        }
        if (role === USER_TYPE.DOCTOR) {
            user = await this.doctorUserService.createNewUser({ password, userID: uuidv4(), email });
        }

        return resultHandler(user, STATUSES.Created);
    }

    async signInUser(user) {
        const { role, email, password } = user;

        let candidate;

        if (role === USER_TYPE.PATIENT) {
            candidate = await patientController.getPatient({ email });
        }
        if (role === USER_TYPE.DOCTOR) {
            candidate = await doctorController.getDoctor({ email });
        }

        if (candidate.status === 404) return resultHandler(new Error(WRONG_EMAIL_MESSAGE));

        const userID = candidate.value.user_id;

        let isPasswordRight;

        if (role === USER_TYPE.PATIENT) {
            isPasswordRight = await this.patientUserService.isPasswordMatches(userID, password);
        }
        if (role === USER_TYPE.DOCTOR) {
            isPasswordRight = await this.doctorUserService.isPasswordMatches(userID, password);
        }

        if (!isPasswordRight) return resultHandler(new Error(WRONG_PASSWORD_MESSAGE));

        const token = this.jwtService.createJwtToken(role, userID);

        return resultHandler(token);
    }

    async checkToken(token) {
        try {
            if (!token) throw new Error(NO_TOKEN_MESSAGE);
            const res = this.jwtService.checkJwtToken(token);

            return resultHandler(res);
        } catch (err) {
            return resultHandler(err);
        }
    }
}

const authController = new AuthController(patientUserService, doctorUserService, jwtService);
export default authController;
