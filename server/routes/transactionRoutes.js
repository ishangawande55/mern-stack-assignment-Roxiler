const express = require("express");
const router = express.Router();
const axios = require("axios");
const Transaction = require("../models/transaction");
const authenticate=require("../middlewares/auth") // Middleware to validate the authorization token (JWT)

require("dotenv").config();


  // Initialize Database with authorization validation
  router.get("/initialize-db", authenticate, async (req, res) => {
    try {
      // Fetch product data from the external URL
      const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product");
  
      // Delete existing transactions and insert new data
      await Transaction.deleteMany({});
      await Transaction.insertMany(data);
  
      // Send success response
      res.status(200).send("Database initialized successfully!");
    } catch (err) {
      // Handle any errors during the process
      res.status(500).send(err.message);
    }
  });
  
  module.exports = router;