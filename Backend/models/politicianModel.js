const pool = require("../config/db"); 

async function createPolitician({ full_name, party, province, constituency, active_position }) {
  try {
    const query = `
      INSERT INTO politicians (full_name, party, province, constituency, active_position)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [full_name, party, province, constituency, active_position];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting politician:", err);
    throw err;
  }
}

module.exports = { createPolitician };
