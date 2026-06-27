const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const scanRoutes = require("./routes/scanRoutes");


const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.get("/", (req, res) => {
  res.send("EcoLife API Running 🚀");
});

module.exports = app;