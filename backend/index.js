const express = require('express');
const app = express();
const config = require('./config/config');
const mongoHelper = require('./controller/mongo.controller');

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(config.serverPort, () => {
    console.log(`App listening on port ${config.serverPort}`);
    mongoHelper.init();
});