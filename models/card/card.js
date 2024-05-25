const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: String,
  level: Number,
  price: Number,
  additionalIncome: Number
});

module.exports = mongoose.model('Card', cardSchema);
