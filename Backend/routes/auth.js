const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
router.post("/signup", async (req, res) => {
  try {
    const { userName, fatherName, DOB, email, password } = req.body;
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    return res.json({
      message: "Sign Up Recieved",
      email,
      hashedPassword,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "There is an error in the server for signUp page" });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  res.send(`Signin received. Email: ${email}, Password: ${password}`);
});

module.exports = router;
