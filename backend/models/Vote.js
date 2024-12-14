const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  party: { type: String, required: true },
  voter: { type: String, required: true },
});

module.exports = mongoose.model("Vote", voteSchema);
