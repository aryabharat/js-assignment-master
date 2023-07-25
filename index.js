const express = require('express');
const helper = require("./src/lib/helper");
const app = express();

app.use(express.json()) 
//Register routes
helper
    .fileList('./src/routes')
    .forEach(filePath => require(`./${filePath.toString()}`)(app));

module.exports = app