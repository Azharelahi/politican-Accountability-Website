const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
