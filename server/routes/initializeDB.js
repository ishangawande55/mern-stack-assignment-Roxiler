const express = require("express");
const router = express.Router();
const axios = require("axios");
const Transaction = require("../models/Transaction");

// To Initialize Database
router.get("/initialize-db", async (req, res) => {
  try {
    const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).send("Database initialized successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;