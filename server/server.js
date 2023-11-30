const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://nhunziker1:Donatello19@cluster0.qiogq.mongodb.net/BookSiteDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Example Route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const booksRouter = require("./routes/books");
app.use("/api", booksRouter);

const recommendationsRouter = require("./routes/recommendations");
app.use("/api", recommendationsRouter);

const recommendationsv2Router = require("./routes/recommendationsv2");
app.use("/api", recommendationsv2Router);

const bookInfoRouter = require("./routes/bookInfo");
app.use("/api", bookInfoRouter);

const addBookRouter = require("./routes/addBook");
app.use("/api", addBookRouter);

const deleteBooks = require("./routes/deleteBook");
app.use("/api", deleteBooks);

const checkoutBookRouter = require("./routes/checkoutBook");
app.use("/api", checkoutBookRouter);

const returnBookRouter = require("./routes/returnBook");
app.use("/api", returnBookRouter);

const userRoutes = require("./routes/register");
app.use("/api", userRoutes);

const userCheckoutBookRouter = require("./routes/userCheckoutBook");
app.use("/api", userCheckoutBookRouter);

const userBooksRouter = require("./routes/userBooks");
app.use("/api", userBooksRouter);
