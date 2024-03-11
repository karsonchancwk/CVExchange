const mongoose = require("mongoose");

const Candidate = mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  // resume:{}
});

module.exports = mongoose.model("Candidate", Candidate);
