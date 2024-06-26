require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to blogs API.");
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to backend at PORT:", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
