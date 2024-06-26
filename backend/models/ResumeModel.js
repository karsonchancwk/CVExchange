const mongoose = require("mongoose");

const Resume = mongoose.Schema({
  owner: { type: String, required: true },
  exp: [{ type: String, required: true }],
  edu: [{ type: String, required: true }],
  skills: [{ type: String, required: true }],
  accessors: [{ type: String, ref: "User" }],
  requestors: [{ type: String, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
    required: true,
  },
});

module.exports = mongoose.model("Resume", Resume);
