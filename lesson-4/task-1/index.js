import express from 'express';
import path from 'path';
import config from './config.js';

import patientRouter from './src/routes/patientRouter.js';
import resolutionRouter from './src/routes/resolutionRouter.js';

const __dirname = path.resolve();
const app = express();
const { port } = config.app;

app.use(express.static(__dirname));

app.use('/patients', patientRouter);
app.use('/resolutions', resolutionRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
