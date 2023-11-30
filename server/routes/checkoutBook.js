const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// POST route for checking out a book
router.patch("/checkoutBook", async (req, res) => {
  const { isbn } = req.body;

  try {
    // Find the book by ISBN
    const foundBook = await Book.findOne({ isbn });

    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (foundBook.quantityAvailable <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    // Decrement quantityAvailable
    foundBook.quantityAvailable--;
    const updatedBook = await foundBook.save();

    res.json({ message: "Book checked out successfully", book: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking out book", error: error.message });
  }
});

module.exports = router;
