const pool = require("./../config/db");

const UserModel = {
  async createUser({ userName, fatherName, DOB, email, password }) {
    const query = `
      INSERT INTO userInfo (userName, fatherName, DOB, password, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, userName, fatherName, DOB, email
    `;
    const values = [userName, fatherName, DOB, password, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM userInfo WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },
};

module.exports = UserModel;
