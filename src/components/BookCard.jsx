import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BookCard = ({ title, author, thumbnail, genre, onReturn }) => {
  // URL for the default stock image
  const defaultThumbnail =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6c3ff365-d870-4fcc-bfea-f2f764b8ae85/d1u2rbq-b2e15486-55b9-4f43-92dd-6cb0de976bcf.jpg/v1/fill/w_600,h_877,q_75,strp/classic_red_book_cover_by_semireal_stock_d1u2rbq-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODc3IiwicGF0aCI6IlwvZlwvNmMzZmYzNjUtZDg3MC00ZmNjLWJmZWEtZjJmNzY0YjhhZTg1XC9kMXUycmJxLWIyZTE1NDg2LTU1YjktNGY0My05MmRkLTZjYjBkZTk3NmJjZi5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.eSNJf91XhxrCd4jvfU3vDn4YdJsMIogT2jEsi5Lo95U";

  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: "auto", maxHeight: 300 }} // Adjust height and width as needed
        image={thumbnail || defaultThumbnail} // Use provided thumbnail or default
        alt={`Cover of the book ${title}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
        {genre && (
          <Typography variant="body2" color="text.secondary">
            {genre}
          </Typography>
        )}
        {onReturn && (
          <Button size="small" color="primary" onClick={onReturn}>
            Return
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
