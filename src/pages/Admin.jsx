import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    quantityAvailable: "",
    description: "",
    image: "",
    isbn: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setBookData({ ...bookData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/addBook",
        bookData
      );
      console.log(response.data);
      alert("Book added successfully");
      setBookData({
        title: "",
        author: "",
        genre: "",
        quantityAvailable: "",
        description: "",
        image: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Navbar />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ marginTop: "30px" }}
      >
        Add a New Book
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Add Book"}
        </Button>
      </form>
    </Container>
  );
};

export default AdminPage;
