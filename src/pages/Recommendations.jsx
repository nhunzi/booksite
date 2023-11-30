import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TextField from "../components/TextField";
import { useForm } from "react-hook-form";
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material"; // Import CircularProgress here
import axios from "axios";
import BookCard from "../components/BookCard";
import { Grid } from "@mui/material";

function RecommendationPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [showForm, setShowForm] = useState(true); // State to toggle form visibility

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
    "Other",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setShowForm(false);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/recommendationsv2",
        data
      );
      setBooks(response.data.recommendations);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setShowForm(true);
    }
  };

  return (
    <Container>
      <Navbar />
      {showForm && (
        <div>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ marginTop: "30px" }}
          >
            Welcome to the Recommendation Page
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Fill out the following questions for personalized book
            recommendations:
          </Typography>

          <Typography variant="h6" component="h1" gutterBottom>
            How old are you? (Recommendations will be age appropriate)
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box marginBottom={2}>
              <TextField
                label="Age:"
                register={register("Age", {
                  required: true,
                })}
                error={Boolean(errors.Age)}
                helperText={errors.Age && "This field is required"}
              />
            </Box>

            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Who are some of your favorite authors?
            </Typography>

            <Box marginBottom={2}>
              <TextField
                label="Preferred Authors:"
                register={register("preferredAuthors", { required: true })}
                error={Boolean(errors.preferredAuthors)}
                helperText={errors.preferredAuthors && "This field is required"}
              />
            </Box>

            <Typography variant="h6" component="h2" gutterBottom>
              Are there any specific genres you are particularly interested in?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Here is a list of genres:
            </Typography>
            <Typography variant="body2" gutterBottom>
              {genres.join(", ")}
            </Typography>

            <Box marginBottom={2}>
              <TextField
                label="Favorite Genres:"
                register={register("favoriteGenres", { required: true })}
                error={Boolean(errors.favoriteGenres)}
                helperText={errors.favoriteGenres && "This field is required"}
              />
            </Box>

            <Typography variant="h6" component="h1" gutterBottom>
              Can you name a few books you have recently read and enjoyed?
            </Typography>
            <Box marginBottom={2}>
              <TextField
                label="Previous Favorite Books:"
                register={register("previousBooks", { required: true })}
                error={Boolean(errors.previousBooks)}
                helperText={errors.previousBooks && "This field is required"}
              />
            </Box>

            <Typography variant="h6" component="h1" gutterBottom>
              What kind of mood do you prefer in the books you read? (e.g.,
              Uplifting, Thought-provoking, Dark, Romantic, Adventurous)
            </Typography>
            <Box marginBottom={2}>
              <TextField
                label="Mood Preference:"
                register={register("moodPreference", { required: true })}
                error={Boolean(errors.moodPreference)}
                helperText={errors.moodPreference && "This field is required"}
              />
            </Box>

            <Typography variant="h6" component="h1" gutterBottom>
              Are there any topics or themes you prefer to avoid in your readin
            </Typography>
            <Box marginBottom={2}>
              <TextField
                label="Avoidance Topics:"
                register={register("avoidanceTopics", { required: true })}
                error={Boolean(errors.avoidanceTopics)}
                helperText={errors.avoidanceTopics && "This field is required"}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      )}

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !showForm && (
        <>
          <Grid container spacing={2}>
            {books.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  thumbnail={book.thumbnail}
                  genre={book.genre}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="left" marginTop={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowForm(true)}
            >
              Back to Form
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default RecommendationPage;
