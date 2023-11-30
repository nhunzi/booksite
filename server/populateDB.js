const axios = require("axios");
const mongoose = require("mongoose");
const Book = require("./models/book"); 

mongoose.connect(
  "mongodb+srv://nhunziker1:Donatello19@cluster0.qiogq.mongodb.net/BookSiteDatabase?retryWrites=true&w=majority"
);

const genres = ["fiction", "non-fiction", "mystery", "fantasy", "biography"];

async function populateBooks() {
  try {
    for (const genre of genres) {
      console.log("Processing genre:", genre);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=10`
      );

      if (!response.data.items || response.data.items.length === 0) {
        console.log(`No items found for genre: ${genre}`);
        continue;
      }

      const books = response.data.items.map((item) => {
        const isbnInfo = item.volumeInfo.industryIdentifiers || [];
        const isbn13 = isbnInfo.find(
          (identifier) => identifier.type === "ISBN_13"
        )?.identifier;

        return {
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown",
          genre: genre,
          quantityAvailable: Math.floor(Math.random() * 10) + 1,
          description:
            item.volumeInfo.description || "No description available.",
          image: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : "default_image_url",
          isbn: isbn13,
        };
      });

      await Book.insertMany(books);
    }
    console.log("Books have been populated!");
  } catch (error) {
    console.error("Error populating books:", error);
  }
}

populateBooks();
