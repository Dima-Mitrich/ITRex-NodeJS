import express from 'express';
import path from 'path';
import docRouter from './src/routes/docRouter.js';
import queueRouter from './src/routes/queueRouter.js';

const __dirname = path.resolve();
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.use('/doctor', docRouter);
app.use('/queue', queueRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
