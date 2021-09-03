import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import authController from '../api/auth/controller/AuthController.js';

const __dirname = path.resolve();
const cabinetRouter = express.Router();

cabinetRouter.use('/', cookieParser());

cabinetRouter.get('/', async (req, res) => {
    const result = await authController.checkToken(req.cookies.jwt);
    result.status === 200
        ? res.sendFile(path.resolve(__dirname, 'public', 'cabinet.html'))
        : res.redirect('/login');
});

export default cabinetRouter;
