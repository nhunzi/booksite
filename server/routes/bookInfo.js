const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

router.post("/bookInfo", async (req, res) => {
  const { title } = req.body;

  console.log("Requested Book Title:", title);

  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    title
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Google Books API Response:", data);

    res.json(data);
  } catch (error) {
    console.error("Google Books API Error:", error);
    res
      .status(500)
      .json({ error: "Error fetching book data", details: error.message });
  }
});

module.exports = router;
