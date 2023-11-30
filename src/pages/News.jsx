import React from "react";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import meetNGreet from "../assets/meetngreet.jpeg";
import kids from "../assets/kids.webp";
import poet from "../assets/poet.jpeg";
import history from "../assets/history.jpeg";

function NewsPage() {
  // Sample data for news events
  const newsEvents = [
    {
      title: "Author Meet and Greet",
      date: "November 25, 2023",
      description:
        "An inspiring evening with bestselling author Robert Nicholason, discussing his latest novel 'Mystery of the Lost City'.",
      imageUrl: meetNGreet,
    },
    {
      title: "Children's Story Hour",
      date: "November 15, 2023",
      description:
        "A delightful storytelling session for kids, featuring animated readings from popular children's books.",
      imageUrl: kids,
    },
    {
      title: "Poetry Slam Night",
      date: "November 10, 2023",
      description:
        "Local poets gathered to share their latest works in a night of poetic expression and creative energy.",
      imageUrl: poet,
    },
    {
      title: "Historical Book Club Meeting",
      date: "November 5, 2023",
      description:
        "A deep dive discussion into this month's pick, 'The Times of Kings and Queens', a journey through medieval history.",
      imageUrl: history,
    },
  ];

  return (
    <div>
      <Navbar />
      <h1>Welcome to the news page.</h1>
      <p>
        There are a lot of community activities that took place this month.
        Here's a recap!
      </p>

      <Grid container spacing={2} justifyContent="center">
        {newsEvents.map((event, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <Box
                sx={{
                  height: 140,
                  backgroundImage: `url(${event.imageUrl})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
                <Typography variant="body1">{event.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NewsPage;
