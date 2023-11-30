const express = require("express");
const OpenAI = require("openai");
const router = express.Router();
require("dotenv").config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  // DONT KEEP THIS HARD CODED
  //apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});

router.post("/recommendations", async (req, res) => {
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
      prompt: `Provide a list of book recommendations based on the following preferences: 
        - Age Of Reader: ${age}
        - Genres: ${favoriteGenres}
        - Favorite Authors: ${preferredAuthors}
        - Recent Enjoyed Books: ${previousBooks}
        - Preferred Mood: ${moodPreference}
        - Avoidance Topics: ${avoidanceTopics}
        
        The recommendations should be diverse and cater to the user's unique reading profile. Format the recommendations as "BookTitle:Author."`,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("Response:", response);
    // Convert the response text to an object with book names as keys and authors as values
    const recommendationsText = response.choices[0].text;
    const recommendationsObject = recommendationsText
      .split("\n") // Split by new line
      .filter((line) => line.trim().length > 0 && line.includes(":")) // Filter out empty lines and ensure it contains a book listing
      .map((line) => {
        const parts = line.trim().split(": ");
        if (parts.length === 2) {
          const title = parts[0].replace(/^\d+\.\s/, ""); // Remove numbering. some random regex i found online lol.
          return { [title]: parts[1] };
        }
      })
      .reduce((acc, item) => {
        if (item) {
          return { ...acc, ...item };
        } else {
          return acc;
        }
      }, {});

    res.json({ recommendations: recommendationsObject });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res
      .status(500)
      .json({ error: "Error processing your request", details: error.message });
  }
});

module.exports = router;
