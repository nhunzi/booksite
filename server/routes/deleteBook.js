const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// DELETE route to delete a book by ISBN
router.delete("/deleteBook/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const deletedBook = await Book.findOneAndDelete({ isbn: isbn });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
});

// Export the router
module.exports = router;
