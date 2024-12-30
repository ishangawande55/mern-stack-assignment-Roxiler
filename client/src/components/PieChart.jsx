import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Automatically imports necessary components

const PieChart = () => {
  const [month, setMonth] = useState("");  // Selected month
  const [pieData, setPieData] = useState([]);  // To store pie chart data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPieData([]);  // Clear previous pie chart data when month changes
  };

  const fetchPieChartData = async () => {
    if (!month) {
      setError("Please select a month.");
      return;
    }

    setLoading(true);
    setError("");  // Reset error

    try {
      const response = await axios.get(
        `http://localhost:8000/api/transactions/pie-chart?month=${month}`
      );
      setPieData(response.data); // Store pie chart data
    } catch (err) {
      setError("Failed to fetch pie chart data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare pie chart data for Chart.js
  const data = {
    labels: pieData.map((item) => item.category), // Category names
    datasets: [
      {
        data: pieData.map((item) => item.count), // Item count for each category
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF5733", "#C70039"
        ], // Colors for each slice
        hoverBackgroundColor: [
          "#FF4560", "#36A2EB", "#FFDD57", "#66BB6A", "#FF7043", "#F28C88"
        ], // Hover colors
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-black drop-shadow-lg tracking-wide mb-8 font-serif">Pie Chart</h1>

      {/* Month selection dropdown */}
      <div className="mb-4">
        <label htmlFor="month" className="block text-lg font-medium text-gray-600 mb-2">
          Select Month:
        </label>
        <select
          id="month"
          value={month}
          onChange={handleMonthChange}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">--Select Month--</option>
          {months.map((monthName, index) => (
            <option key={index} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      {/* Button to fetch pie chart data */}
      <div className="text-center mb-6">
        <button
          onClick={fetchPieChartData}
          disabled={loading}
          className="w-40 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch Chart"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Show the pie chart */}
      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        <div className="w-full h-90">
          {pieData.length === 0 ? (
            <div className="text-center text-xl text-gray-600">Select a month and click Fetch Chart.</div>
          ) : (
            <Pie data={data} options={{ responsive: true }} />
          )}
        </div>
      )}
    </div>
  );
};

export default PieChart;