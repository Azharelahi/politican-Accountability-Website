const UserModel = require("../models/userModel");
const { hashPassword, verifyPassword } = require("../utils/hash");

const authController = {
  async signup(req, res) {
    try {
      const { userName, fatherName, DOB, email, password } = req.body;
      const hashed = await hashPassword(password);
      const user = await UserModel.createUser({
        userName,
        fatherName,
        DOB,
        email,
        password: hashed,
      });
      res.status(201).json({ message: "Sign up successful", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(404).json({ error: "User not found" });

      const isValid = await verifyPassword(user.password, password);
      if (!isValid)
        return res.status(401).json({ error: "Invalid credentials" });

      res.status(200).json({ message: "Welcome!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = authController;
