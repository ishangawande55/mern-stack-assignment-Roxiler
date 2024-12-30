const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /combined-stats?month=<month>
router.get("/combined-stats", async (req, res) => {
    try {
        const { month } = req.query;

        // Ensure month is provided
        if (!month) {
            return res.status(400).json({ error: "Month parameter is required" });
        }

        // Fetch statistics data
        const statistics = await axios.get(`http://localhost:8000/api/transactions/statistics?month=${month}`);
        
        // Fetch bar chart data
        const barChart = await axios.get(`http://localhost:8000/api/transactions/bar-chart?month=${month}`);
        
        // Fetch pie chart data
        const pieChart = await axios.get(`http://localhost:8000/api/transactions/pie-chart?month=${month}`);
        
        // Ensure the data is correctly structured before sending
        const response = {
            statistics: statistics.data || {},
            barChart: barChart.data || { labels: [], datasets: [] }, // Default structure if data is missing
            pieChart: pieChart.data || { labels: [], datasets: [] }, // Default structure if data is missing
        };

        res.status(200).json(response);
    } catch (err) {
        // Catch any errors from the external API calls
        console.error(err.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to fetch combined data. Please try again later." });
    }
});

module.exports = router;