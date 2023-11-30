const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");

router.post("/userCheckoutBook", async (req, res) => {
  const { email, isbn } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book by ISBN
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is already checked out by the user
    if (user.checkedOutBooks.includes(book._id)) {
      return res.status(400).json({ message: "Book already checked out" });
    }

    // Add the books ObjectId to the user's checkedOutBooks array
    user.checkedOutBooks.push(book._id);

    // Save the user document with the updated checkedOutBooks array
    await user.save();

    return res
      .status(200)
      .json({ message: "Book added to user's checkedOutBooks" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
