const logger = require('./services/loggerService');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

require('./models/user');
require('./models/location');
require('./models/post');
require('./models/repost');
require('./models/comment');
require('./services/jwtAuth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api', require('./routes/test.routes'));

app.use('/auth', require('./routes/auth.routes'));
app.use(
  '/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/user.routes')
);
app.use(
  '/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/post.routes')
);

//Handle errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    logger.err(err);
  }
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
