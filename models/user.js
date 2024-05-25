const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // інші поля, які вам потрібно зберігати для користувача
});

const User = mongoose.model("User", userSchema);

module.exports = User;
