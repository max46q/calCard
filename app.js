const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Card = require("./models/card");
const port = process.env.PORT || 3000;

const cards = {};
//
require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
//
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
app.get("/", function (req, res) {
  let error = "";
  res.render("index", { error });
});

// Створіть функцію для оновлення карточки
app.post("/cards/:accountId/:cardId", (req, res) => {
  const accountId = req.params.accountId;
  const cardId = req.params.cardId;
  const level = req.body.level;
  const price = req.body.price;
  const nextIncome = req.body.nextIncome;

  if (!cards[accountId]) {
    cards[accountId] = {};
  }

  if (!cards[accountId][cardId]) {
    cards[accountId][cardId] = {
      level: 1,
      price: 0,
      nextIncome: 0,
    };
  }

  cards[accountId][cardId].level = level;
  cards[accountId][cardId].price = price;
  cards[accountId][cardId].nextIncome = nextIncome;

  res.redirect(`/cards/${accountId}`);
});

function updateCard(accountId, cardId) {
  const level = document.getElementById(`level-${cardId}`).value;
  const price = document.getElementById(`price-${cardId}`).value;
  const nextIncome = document.getElementById(`nextIncome-${cardId}`).value;

  fetch(`/cards/${accountId}/${cardId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, price, nextIncome }),
  })
    .then((response) => response.redirect(`/cards/${accountId}`))
    .catch((error) => console.error(error));
}

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
