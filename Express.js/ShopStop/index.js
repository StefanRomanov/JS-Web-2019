const port = 3000;
const express = require("express");

let app = express();

let enviornment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config');

database(config[enviornment]);
require('./config/express')(app, config[enviornment]);
require('./config/routes')(app);
require('./config/passport')();

app.listen(port);
