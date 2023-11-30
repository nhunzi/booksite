import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile";
import BookCard from "../components/BookCard";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";

const Profile = () => {
  const [userBooks, setUserBooks] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  const fetchUserBooks = () => {
    if (user) {
      fetch(`http://localhost:5001/api/userBooks/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUserBooks(data.checkedOutBooks);
        })
        .catch((error) => {
          console.error("Error fetching user books:", error);
        });
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, [user]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleReturnBook = (isbn) => {
    fetch(`http://localhost:5001/api/returnBook`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn: isbn, userEmail: user.email }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchUserBooks(); // Re-fetch user's books after a successful return
      })
      .catch((error) => {
        console.error("Error returning book:", error);
      });
  };

  return (
    <div>
      <UserProfile />
      <Typography variant="h3" marginTop="20px">
        Checked Out Books
      </Typography>
      <Grid container spacing={2}>
        {userBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard
              title={book.title}
              author={book.author}
              thumbnail={book.image}
              genre={book.genre}
              onReturn={() => handleReturnBook(book.isbn)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
