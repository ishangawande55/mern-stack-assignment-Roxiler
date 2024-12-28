// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Example: Check credentials (replace with real DB authentication)
  if (username === "admin" && password === "password") {
    // Create JWT token
    const token = jwt.sign(
      { username: "admin" },  // Payload (user info)
      process.env.JWT_SECRET,  // Secret key from .env
      { expiresIn: "1h" }      // Token expiration time
    );

    return res.json({ token });  // Return the token to the client
  }

  return res.status(401).send("Invalid credentials");
});

module.exports = router;