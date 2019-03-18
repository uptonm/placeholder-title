const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

require('./models/user');
require('./services/jwtService');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', require('./routes/test.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  require('./routes/secure.routes')
);

//Handle errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
