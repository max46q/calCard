const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Card = require("./models/card");
const port = process.env.PORT || 3000;

require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let error = "";
  res.render("index", { error });
});

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(port);
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

start();
