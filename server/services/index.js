const bcrypt = require('bcrypt')

function encryptPassword(password) {
  return bcrypt.hash(password, 10).then((hash) => hash)
}

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash).then((res) => res)
}

module.exports = {
  encryptPassword,
  checkPassword
}
