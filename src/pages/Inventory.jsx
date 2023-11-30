import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress, // Add CircularProgress for loading state
} from "@mui/material";

function InventoryPage() {
  const [books, setBooks] = useState([]);
  const [selectedISBN, setSelectedISBN] = useState(null); // State to store the selected book's ISBN
  const [loading, setLoading] = useState(true); // Loading state
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); // Set loading to false when done loading
  }, []);

  // Event handler for the "Checkout" button
  const handleCheckout = async (isbn) => {
    try {
      // Step 1: Update the user's checked-out books
      await axios.post("http://localhost:5001/api/userCheckoutBook", {
        email: user.email,
        isbn: isbn,
      });

      // Step 2: Update the total available books
      await axios.patch("http://localhost:5001/api/checkoutBook", { isbn });

      // Update the available copies locally
      const updatedBooks = books.map((book) => {
        if (book.isbn === isbn) {
          book.quantityAvailable--;
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error checking out book:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h3" gutterBottom marginTop="20px">
          Inventory
        </Typography>

        <Typography variant="h6" gutterBottom>
          Below is a list of all the books we have at our shop. To take a book
          out of the library, click "Checkout," and it will be added to your
          account.
        </Typography>
        {loading ? (
          // Show loading indicator while data is being fetched
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Genre: {book.genre}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      ISBN: {book.isbn}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Available Copies: {book.quantityAvailable}
                    </Typography>
                    {book.quantityAvailable > 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCheckout(book.isbn)}
                      >
                        Checkout
                      </Button>
                    ) : (
                      <p>Not in stock</p>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default InventoryPage;
