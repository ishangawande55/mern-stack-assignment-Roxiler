const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /combined-stats?month=<month>
router.get("/combined-stats", async (req, res) => {
    try {
      const { month } = req.query;
  
      const statistics = await axios.get(`http://localhost:8000/api/transactions/statistics?month=${month}`);
      const barChart = await axios.get(`http://localhost:8000/api/transactions/bar-chart?month=${month}`);
      const pieChart = await axios.get(`http://localhost:8000/api/transactions/pie-chart?month=${month}`);
  
      res.status(200).json({
        statistics: statistics.data,
        barChart: barChart.data,
        pieChart: pieChart.data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;