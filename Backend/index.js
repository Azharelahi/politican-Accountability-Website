const express = require("express");
const cors = require("cors"); 
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
