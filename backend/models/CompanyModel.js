const mongoose = require("mongoose");

const Company = mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  // resume:{}
});

module.exports = mongoose.model("Company", Company);
