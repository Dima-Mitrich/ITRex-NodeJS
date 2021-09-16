require('babel-core/register');
import express from 'express';
import path from 'path';
import config from './config.js';
import patientRouter from './src/routes/patientRouter.js';
import resolutionRouter from './src/routes/resolutionRouter.js';
import loginRouter from './src/routes/loginRouter.js';
import signUpRouter from './src/routes/signUpRouter.js';
//import patientCabinetRouter from './src/routes/patientCabinetRouter.js';
import doctorRouter from './src/routes/doctorRouter.js';
//import doctorCabinetRouter from './src/routes/doctorCabinetRouter.js';

const __dirname = path.resolve();
const app = express();
const { port } = config.app;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/patient', patientRouter);
app.use('/resolutions', resolutionRouter);
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
//app.use('/patient_cabinet', patientCabinetRouter);
//app.use('/doctor_cabinet', doctorCabinetRouter);
app.use('/doctor', doctorRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
