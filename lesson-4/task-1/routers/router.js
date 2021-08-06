const express = require('express');

const router = express();
const STATUSES = require('./statuses.js');

router.get('/', (req, res) => {
    res.status(STATUSES.OK).sendFile('../index.html');
});

module.exports = router;
