const mongoose = require("mongoose");

const User = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  _resume: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
  balance: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
});

module.exports = mongoose.model("User", User);
