import jwt from 'jsonwebtoken';
import config from '../../../../config.js';

class JwtService {
    createJwtToken(id) {
        const payload = {
            id,
        };

        return jwt.sign(payload, config.app.secretKey, { expiresIn: config.app.jwtExpTime });
    }

    checkJwtToken(token) {
        const decodedToken = jwt.verify(token, config.app.secretKey, (err, decoded) => {
            if (err) {
                throw err;
            } else {
                return decoded;
            }
        });

        return decodedToken;
    }
}

const jwtService = new JwtService();
export default jwtService;
