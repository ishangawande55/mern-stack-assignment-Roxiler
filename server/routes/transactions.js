const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /transactions?search=<search>&page=<page>&perPage=<perPage>
router.get("/", async (req, res) => {
    try {
      // Destructure query parameters with defaults
      const { search = "", page = 1, perPage = 10 } = req.query;
  
      // Create filter object
      const filter = {};
  
      // Add search condition
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } }, // Assuming price is stored as a string
        ];
      }
  
      // Pagination setup
      const limit = parseInt(perPage, 10); // Number of records per page
      const skip = (parseInt(page, 10) - 1) * limit; // Skip records for current page
  
      // Query the database with filter, pagination, and sorting (if needed)
      const transactions = await Transaction.find(filter)
        .skip(skip)
        .limit(limit);
  
      // Count total matching documents for pagination metadata
      const totalCount = await Transaction.countDocuments(filter);
  
      // Response with transactions and pagination metadata
      res.status(200).json({
        transactions: transactions, // List of transactions for the current page
        totalPages: Math.ceil(totalCount / limit), // Total number of pages
        currentPage: parseInt(page, 10), // Current page number
        totalRecords: totalCount, // Total number of matching records
      });
    } catch (err) {
      console.error("Error fetching transactions:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;