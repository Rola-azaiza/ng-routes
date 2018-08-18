const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SECRET = 'ng';

function generateToken(id) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: id, iat: timestamp }, SECRET);
}

function verifyToken(key) {
  try {
    const t = jwt.verify(key, SECRET);
    if(t === null) return false;
    return t.sub
  } catch (err) {
    return false
  }
}

function generateSalt(str) {
  return new Promise((resolve, reject) =>
    // Generate hash's random salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      // Now, with the given salt, generate the hash
      bcrypt.hash(str, salt, (err2, hash) => {
        if (err) return reject(err2);
        // Hash generated successfully!
        return resolve(hash);
      });
    }));
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.generateSalt = generateSalt;
