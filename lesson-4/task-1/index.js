const express = require('express');

const app = express();
const port = 3000;

const mainRouter = require('./routers/router.js');

app.use(express.static(__dirname));

app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
