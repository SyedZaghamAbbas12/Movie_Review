const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// sentiment logic
function analyze(text) {
  text = text.toLowerCase();

  if (text.includes("good") || text.includes("amazing") || text.includes("best"))
    return "positive";

  if (text.includes("bad") || text.includes("worst"))
    return "negative";

  return "neutral";
}

// POST review
router.post("/", async (req, res) => {
  try {
    const { movie, text } = req.body;

    if (!movie || !text) {
      return res.status(400).json({ error: "Missing data" });
    }

    const sentiment = analyze(text);

    const review = new Review({ movie, text, sentiment });
    await review.save();

    res.json({ sentiment });
  } catch (error) {
    console.log("POST ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET stats
router.get("/:movie", async (req, res) => {
  try {
    const movie = req.params.movie;

    const reviews = await Review.find({ movie });

    const total = reviews.length;

    const pos = reviews.filter(r => r.sentiment === "positive").length;
    const neg = reviews.filter(r => r.sentiment === "negative").length;
    const neu = reviews.filter(r => r.sentiment === "neutral").length;

    res.json({
      positive: ((pos / total) * 100 || 0).toFixed(1),
      negative: ((neg / total) * 100 || 0).toFixed(1),
      neutral: ((neu / total) * 100 || 0).toFixed(1),
    });
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;