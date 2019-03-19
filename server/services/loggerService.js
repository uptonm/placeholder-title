const colors = require('colors');
<<<<<<< HEAD
exports.msg = msg => {
  let d = new Date().toLocaleTimeString();
  return console.log(`${colors.grey(d)} ✨ ${colors.green(msg)}`);
};
exports.err = msg => {
  let d = new Date().toLocaleTimeString();
  return console.log(`${colors.grey(d)} ❗️ ${colors.red(msg)}`);
=======
module.exports = {
  msg: msg => {
    let d = new Date().toLocaleTimeString();
    return console.log(`${colors.grey(d)} ✨  ${colors.green(msg)}`);
  },
  err: msg => {
    let d = new Date().toLocaleTimeString();
    return console.log(`${colors.grey(d)} ❗️  ${colors.red(msg)}`);
  }
>>>>>>> 678fb86e1605e525502bfe5dff9917a9008a2c28
};
