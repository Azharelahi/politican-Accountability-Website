const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const pool = require("../db");
const creatTableQuery = `
CREATE TABLE IF NOT EXISTS userInfo (
  id SERIAL PRIMARY KEY,
  userName TEXT NOT NULL,
  fatherName TEXT NOT NULL,
  DOB DATE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;
const emailRetrievingQuery = `
select * from userInfo 
where email = $1
`;
pool.query(creatTableQuery).catch((err) => {
  console.error("Error creating table userInfo", err);
});
router.post("/signup", async (req, res) => {
  try {
    const { userName, fatherName, DOB, email, password } = req.body;
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const insertionQuery = `
   insert into userInfo(userName , fatherName , DOB ,password,email)
   values ($1,$2,$3,$4,$5)
   returning id, userName, fatherName, DOB, email
`;
    const values = [userName, fatherName, DOB, hashedPassword, email];
    const results = await pool.query(insertionQuery, values);
    return res.json({
      message: "Sign Up Successfull",
      user: results.rows[0],
    });
  } catch (err) {
    console.log("Error in the server is : ", err);
    return res
      .status(500)
      .json({ error: "There is an error in the server for signUp page" });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email or password is missing!" });
  }
  const results = await pool.query(emailRetrievingQuery, [email]); //check email format also
  let user = results.rows[0];
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  const validPassword = await argon2.verify(user.password, password);
  if (!validPassword) {
    return res.status(401).json({ error: "You are not authorized person" });
  }
  return res.status(200).json({ message: "Welcome to politician Application" });
});

module.exports = router;
