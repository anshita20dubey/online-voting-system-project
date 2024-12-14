const express = require("express");
const Vote = require("../models/Vote");

const router = express.Router();

// Vote
router.post("/", async (req, res) => {
  const { party, voter } = req.body;
  try {
    // Check if the voter has already voted
    const existingVote = await Vote.findOne({ voter });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    const newVote = new Vote({ party, voter });
    await newVote.save();

    // Emit real-time updates
    const io = req.app.get("socketio");
    const votes = await Vote.find();
    io.emit("vote-update", votes);

    res.status(201).json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get results
router.get("/results", async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get vote counts by party
router.get("/vote-counts", async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: "$party", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort by count in descending order
    ]);
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
