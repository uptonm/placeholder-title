const log = require('./services/loggerService');
const mongoose = require('mongoose');
const colors = require('colors');
const app = require('./app');

mongoose.connect(
  process.env.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    autoReconnect: true
  },
  err => {
    if (err) {
      return log.err(err);
    }
    return log.msg(`Connected to MongoDB on port ${colors.blue(27017)}`);
  }
);

app.listen(process.env.PORT || 8000, () => {
  return log.msg(
    `Server listening on port ${colors.blue(process.env.PORT || 8000)}`
  );
});
