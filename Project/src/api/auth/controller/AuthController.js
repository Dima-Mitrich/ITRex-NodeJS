import { v4 as uuidv4 } from 'uuid';
import userService from '../../users/services/UserService.js';
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
    constructor(userService, jwtService) {
        this.userService = userService;
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
        const user = await this.userService.createNewUser({
            password, userID: uuidv4(), email, role,
        });

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

        const isPasswordRight = await this.userService.isPasswordMatches(userID, password);

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

const authController = new AuthController(userService, jwtService);
export default authController;
