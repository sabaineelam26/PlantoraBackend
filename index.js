const { initializeDB } = require("./db/db.connect");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

initializeDB();

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});