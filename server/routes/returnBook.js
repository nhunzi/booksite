const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const User = require("../models/user");

// PATCH route for returning a book
router.patch("/returnBook", async (req, res) => {
  const { isbn, userEmail } = req.body;

  try {
    // Find the book by ISBN
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Increment quantityAvailable
    book.quantityAvailable += 1;
    const updatedBook = await book.save();

    // Remove the book's ObjectId from the user's checkedOutBooks
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { checkedOutBooks: book._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Book returned successfully",
      book: updatedBook,
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error returning book", error: error.message });
  }
});

module.exports = router;
