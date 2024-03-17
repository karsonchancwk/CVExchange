const mongoose = require("mongoose");

const Resume = mongoose.Schema({
  experience: { type: String, required: true },
});

module.exports = mongoose.model("Resume", Resume);
