const colors = require('colors');
module.exports = {
  msg: msg => {
    let d = new Date().toLocaleTimeString();
    return console.log(`${colors.grey(d)} ✨ ${colors.green(msg)}`);
  },
  err: msg => {
    let d = new Date().toLocaleTimeString();
    return console.log(`${colors.grey(d)} ❗️ ${colors.red(msg)}`);
  }
};
