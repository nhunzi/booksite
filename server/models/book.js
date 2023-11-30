const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  quantityAvailable: Number,
  description: String,
  image: String,
  isbn: String,
});

module.exports = mongoose.model("book", bookSchema);
