const argon2 = require("argon2");

module.exports = {
  async hashPassword(password) {
    return await argon2.hash(password, { type: argon2.argon2id });
  },

  async verifyPassword(hashed, plain) {
    return await argon2.verify(hashed, plain);
  },
};
