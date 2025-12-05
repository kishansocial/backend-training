const bcrypt = require("bcrypt");

module.exports = {
  hash: async (password) => await bcrypt.hash(password, 10),
  compare: async (plain, hashed) => await bcrypt.compare(plain, hashed),
};
