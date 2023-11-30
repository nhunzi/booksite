const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");

router.get("/userBooks/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user's checkedOutBooks array (contains Object IDs)
    const checkedOutBookIds = user.checkedOutBooks;

    // Use the Object IDs to populate the array with actual book data from the "books" collection
    const checkedOutBooks = await Book.find({
      _id: { $in: checkedOutBookIds },
    });

    // Return the populated array of checked out books
    return res.status(200).json({ checkedOutBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
