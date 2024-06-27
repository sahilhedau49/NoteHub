require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db");
const router = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to NoteHub API.");
});

app.use("/api", router);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to backend at PORT:", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
