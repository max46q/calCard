const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Card = require("./models/card");
const User = require("./models/user");
const port = process.env.PORT || 3000;
const routes = require("./routes");

const cards = {};
//
require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
//
app.get("/", function (req, res) {
  let error = "";
  res.render("index", { error });
});

let currentAccountIndex = 0;
const accounts = ["account1", "account2"]; // список ваших акаунтів

function nextAccount() {
  currentAccountIndex = (currentAccountIndex + 1) % accounts.length;
  const accountId = accounts[currentAccountIndex];
  window.location.href = `account.html?accountId=${accountId}`;
}
function addCard() {
  const cardName = document.getElementById("cardName").value;
  const cardLevel = document.getElementById("cardLevel").value;
  const cardPrice = document.getElementById("cardPrice").value;
  const cardBonus = document.getElementById("cardBonus").value;
  // тут вам потрібно додати логіку для додавання карточки до акаунту
  console.log(
    `Карточка додана: ${cardName}, рівень: ${cardLevel}, ціна: ${cardPrice}, додатковий прибуток: ${cardBonus}`
  );
}

app.post("/cards", async (req, res) => {
  const { name, level, price, bonus, accountId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).send("Invalid account ID");
  }
  const account = await User.findById(accountId);
  if (!account) {
    return res.status(404).send("Account not found");
  }
  const card = new Card({
    name,
    level,
    price,
    bonus,
    user: account,
  });
  try {
    await card.save();
    res.redirect(`/cards/${accountId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating card");
  }
});

app.get("/cards/:id", async (req, res) => {
  const id = req.params.id;
  const account = await User.findById(id);
  if (!account) {
    return res.status(404).send("Акаунт не знайдено");
  }
  res.render("add-card", { account: account }); // Pass the account object to the template
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
