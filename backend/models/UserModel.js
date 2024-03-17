const mongoose = require("mongoose");

const User = mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  _resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
});

module.exports = mongoose.model("User", User);
