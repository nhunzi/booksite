const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// POST route for adding a new book
router.post("/addBook", async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      quantityAvailable,
      description,
      image,
      isbn,
    } = req.body;

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      genre,
      quantityAvailable,
      description,
      image,
      isbn,
    });

    // Save the book to the database
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
});

module.exports = router;
