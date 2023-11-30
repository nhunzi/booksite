const express = require("express");
const OpenAI = require("openai");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: "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",
});

router.post("/recommendationsv2", async (req, res) => {
  const {
    age,
    preferredAuthors,
    favoriteGenres,
    previousBooks,
    moodPreference,
    avoidanceTopics,
  } = req.body;

  console.log("Request Data:", {
    age,
    preferredAuthors,
    favoriteGenres,
    previousBooks,
    moodPreference,
    avoidanceTopics,
  });

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Provide a list of 10-15 book recommendations based on the following preferences: 
                - Age Of Reader: ${age}
                - Genres: ${favoriteGenres}
                - Favorite Authors: ${preferredAuthors}
                - Recent Enjoyed Books: ${previousBooks}
                - Preferred Mood: ${moodPreference}
                - Avoidance Topics: ${avoidanceTopics}
                
                The recommendations should be diverse and cater to the user's unique reading profile. Format the recommendations as "BookTitle:Author."`,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("OpenAI Response:", response);
    const recommendationsText = response.choices[0].text;
    const recommendationsObject = recommendationsText
      .split("\n")
      .filter((line) => line.trim().length > 0 && line.includes(":"))
      .map((line) => {
        const parts = line.trim().split(": ");
        return parts.length === 2
          ? { title: parts[0].replace(/^\d+\.\s/, ""), author: parts[1] }
          : null;
      })
      .filter((item) => item !== null);

    // Fetch additional details for each recommended book
    const enrichedRecommendations = await Promise.all(
      recommendationsObject.map(async (book) => {
        const bookDetails = await fetchBookDetails(book.title);
        return {
          title: book.title,
          author: book.author,
          genre: bookDetails ? bookDetails.genre : "Unknown Genre",
          thumbnail: bookDetails ? bookDetails.thumbnail : null,
        };
      })
    );

    res.json({ recommendations: enrichedRecommendations });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error processing your request", details: error.message });
  }
});

// Function to fetch book details from Google Books API
async function fetchBookDetails(title) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    title
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;
      return {
        title: volumeInfo.title,
        author: volumeInfo.authors ? volumeInfo.authors.join(", ") : null,
        genre: volumeInfo.categories ? volumeInfo.categories.join(", ") : null,
        thumbnail: volumeInfo.imageLinks
          ? volumeInfo.imageLinks.thumbnail
          : null,
      };
    }
  } catch (error) {
    console.error(`Error fetching details for ${title}:`, error);
    return null;
  }
}

module.exports = router;
