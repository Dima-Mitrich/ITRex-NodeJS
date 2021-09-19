import authController from '../auth/controller/AuthController.js';

export default async function checkTokenPatient(req, res, next) {
    const userID = await authController.checkToken(req.cookies.jwtPatient);
    if (userID.status === 200) {
        req.userID = userID.value.id;
        req.role = userID.value.role;
        next();
    } else {
        res.status(userID.status).json(userID.value);
    }
}
