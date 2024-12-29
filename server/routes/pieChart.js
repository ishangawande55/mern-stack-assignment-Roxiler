const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /pie-chart?month=<month>
router.get("/pie-chart", async (req, res) => {
    try {
      const { month } = req.query;
  
      // Validate month input
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      const monthIndex = months.indexOf(month);
      if (monthIndex === -1) {
        return res.status(400).json({ error: "Invalid month. Use full month name (e.g., January)." });
      }
  
      // Calculate start and end dates for the given month
      const startDate = new Date(20, monthIndex, 1); // Start of the month
      const endDate = new Date(2024, monthIndex + 1, 0, 23, 59, 59, 999); // End of the month
  
      // Build filter for date range
      const filter = {
        dateOfSale: { $gte: startDate, $lte: endDate },
      };
  
      // Aggregate to find unique categories and their counts
      const pieChartData = await Transaction.aggregate([
        { $match: filter },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { category: "$_id", count: 1, _id: 0 } }, // Rename _id to category
      ]);
  
      res.status(200).json(pieChartData);
    } catch (err) {
      console.error("Error in /pie-chart:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;