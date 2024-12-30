const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /transactions?search=<search>&month=<month>&page=<page>&perPage=<perPage>
router.get("/", async (req, res) => {
  try {
    const { search = "", month = "", page = 1, perPage = 10 } = req.query;

    // Create filter object
    const filter = {};

    // Validate the provided month (case-insensitive)
    if (month) {
      const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth(); // Convert month name to index (0-11)
      if (isNaN(monthIndex)) {
        return res.status(400).json({ error: "Invalid month provided" });
      }

      // Include records from the selected month across 2021 to the current year
      const startYear = 2021;
      const currentYear = new Date().getFullYear();
      const dateConditions = [];

      for (let year = startYear; year <= currentYear; year++) {
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        dateConditions.push({ dateOfSale: { $gte: startDate, $lte: endDate } });
      }

      filter.$or = dateConditions; // Match any date range condition
    } else {
      // Default: To Show all records from January 1, 2021 to the current date
      const startDate = new Date(2021, 0, 1);
      const endDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filter.dateOfSale = { $gte: startDate, $lte: endDate };
    }

    // search condition if a search term is provided
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination setup: Number of records per page and skip logic
    const limit = parseInt(perPage, 10) || 10;
    const skip = (parseInt(page, 10) - 1) * limit;

    // To Query the database with filter, pagination, and sorting (if needed)
    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(limit);

    // Count total matching documents for pagination metadata
    const totalCount = await Transaction.countDocuments(filter);

    // Return the response with transactions and pagination metadata
    res.status(200).json({
      transactions,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page, 10),
      totalRecords: totalCount,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;