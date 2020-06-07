const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: string, required: true },
});

module.exports = mongoose.model("User", userSchema);
