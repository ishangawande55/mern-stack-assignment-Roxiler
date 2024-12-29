const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET /statistics?month=<month>
router.get("/statistics", async (req, res) => {
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
  
      // Calculate total sale amount
      const totalSaleAmount = await Transaction.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: { $toDouble: "$price" } } } },
      ]);
  
      // Count sold items
      const soldItemsCount = await Transaction.countDocuments({
        ...filter,
        sold: true,
      });
  
      // Count unsold items
      const unsoldItemsCount = await Transaction.countDocuments({
        ...filter,
        sold: false,
      });
  
      // Respond with statistics
      res.status(200).json({
        totalSaleAmount: totalSaleAmount[0]?.total || 0,
        soldItems: soldItemsCount,
        unsoldItems: unsoldItemsCount,
      });
    } catch (err) {
      console.error("Error in /statistics:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;