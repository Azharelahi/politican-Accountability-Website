const argon2 = require("argon2");

module.exports = {
  hashPassword(password) {
    return argon2.hash(password, { type: argon2.argon2id });
  },

  verifyPassword(hashed, plain) {
    return argon2.verify(hashed, plain);
  },
};
