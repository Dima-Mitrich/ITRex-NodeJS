import express from 'express';
import path from 'path';
import config from './config.js';

import docRouter from './src/routes/docRouter.js';
import queueRouter from './src/routes/queueRouter.js';
import commonRouter from './src/routes/commonRouter.js';

const __dirname = path.resolve();
const app = express();
const { port } = config.app;

app.use(express.static(__dirname));

app.use('/doctor', docRouter);
app.use('/queue', queueRouter);
app.use('/', commonRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
