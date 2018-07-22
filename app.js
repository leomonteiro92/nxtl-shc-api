const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ExpressOAuthServer = require('express-oauth-server');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.oauth = new ExpressOAuthServer({
  model: require('./utils/oauth')
});

require('./routes')(app);

module.exports = app;