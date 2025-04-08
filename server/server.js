require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const answerSchema = new mongoose.Schema({
  username: String,
  password: Boolean,
});

const Answer = mongoose.model("User", answerSchema);

app.post("/api-auth", async (req, res) => {
  const { username, password } = req.body;

  const newAnswer = new Answer({
    username,
    password,
  });

  try {
    await newAnswer.save();
    res.status(200).json({ message: "Answer saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving answer" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
