const mongoose = require("mongoose");

const Tx = mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: {
    type: Date,
    default: Date.now(),
    immutable: true,
    required: true,
  },
  amt: { type: mongoose.Decimal128, required: true },
});

module.exports = mongoose.model("Tx", Tx);
