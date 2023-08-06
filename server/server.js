const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/database");

const app = express();
const port = process.env.PORT || 8000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () =>
  console.log(`app is listening successfully on port ${port}`)
);
