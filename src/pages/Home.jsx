import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import bookshelfImage from "../assets/books.jpeg";
import nookImage from "../assets/nook.jpeg";
import clubImage from "../assets/club.jpeg";
import recommendationImage from "../assets/recommendation.jpeg";
import Grid from "@mui/material/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function HomePage() {
  const { isAuthenticated, user } = useAuth0();

  // Function to create a new user in MongoDB
  const createUserInDatabase = async (email) => {
    try {
      await axios.post("http://localhost:5001/api/register", { email }); // Replace with your API endpoint
      console.log("User created in MongoDB");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Check if the user is authenticated and create the user in MongoDB
  if (isAuthenticated) {
    createUserInDatabase(user.email);
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  // Rest of your HomePage component code
  return (
    <div>
      <Navbar />
      <h1>The Open Door</h1>
      <p>A Local Haven for Book Enthusiasts and Dreamers Alike</p>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card
            title="Welcome to The Open Door"
            description="Nestled in the heart of Glenville, NY, The Open Door Bookstore is a sanctuary for book lovers. Explore our diverse range of carefully curated books in a warm, welcoming atmosphere."
            image={nookImage}
            altText="alt text"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="A World of Stories"
            description="Delve into our extensive collection that spans gripping novels, insightful biographies, and enchanting children’s tales. Discover books that fuel your imagination and inspire new perspectives."
            image={bookshelfImage}
            altText="alt text"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="Community and Events"
            description="More than just a bookstore, we're a vibrant community hub. Join us for exciting events, author signings, and book clubs where readers and storytellers come together."
            image={clubImage}
            altText="alt text"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            title="Tailored Recommendations"
            description="Explore our personalized book recommendation service. Share your favorite genres and authors, and receive handpicked suggestions from our knowledgeable staff, curated just for you."
            image={recommendationImage}
            altText="alt text"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
