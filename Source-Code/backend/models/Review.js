const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movie: String,
  text: String,
  sentiment: String
});

module.exports = mongoose.model("Review", reviewSchema);