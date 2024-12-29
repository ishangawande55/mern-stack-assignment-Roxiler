const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /bar-chart?month=<month>
router.get("/bar-chart", async (req, res) => {
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
      const startDate = new Date(2021, monthIndex, 1); // Start of the month
      const endDate = new Date(2024, monthIndex + 1, 0, 23, 59, 59, 999); // End of the month
  
      // Build filter for date range
      const filter = {
        dateOfSale: { $gte: startDate, $lte: endDate },
      };
  
      // Define price ranges
      const priceRanges = [
        [0, 100],
        [101, 200],
        [201, 300],
        [301, 400],
        [401, 500],
        [501, 600],
        [601, 700],
        [701, 800],
        [801, 900],
        [901, Infinity],
      ];
  
      // Compute bar chart data
      const barChartData = await Promise.all(
        priceRanges.map(async ([min, max]) => {
          const count = await Transaction.aggregate([
            { $match: filter },
            {
              $addFields: {
                numericPrice: { $toDouble: "$price" }, // Convert price to a number
              },
            },
            {
              $match: {
                numericPrice: { $gte: min, $lte: max === Infinity ? Number.MAX_VALUE : max },
              },
            },
            { $count: "count" },
          ]);
  
          return {
            range: `${min}-${max === Infinity ? "above" : max}`,
            count: count[0]?.count || 0,
          };
        })
      );
  
      // Return response
      res.status(200).json(barChartData);
    } catch (err) {
      console.error("Error in /bar-chart:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;