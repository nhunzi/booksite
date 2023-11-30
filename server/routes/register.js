const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import your User model

router.post("/register", async (req, res) => {
  try {
    // Extract user data from the request body
    const { email } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists, return an error
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
