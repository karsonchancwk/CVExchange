const mongoose = require("mongoose");

const Resume = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
    required: true,
  },
  exp: [{ type: String, required: true }],
  edu: [{ type: String, required: true }],
  skills: [{ type: String, required: true }],
  accessors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Resume", Resume);
