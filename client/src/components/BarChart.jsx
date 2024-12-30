import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Automatically imports necessary components

const BarChart = () => {
  const [month, setMonth] = useState("");  // Selected month
  const [chartData, setChartData] = useState([]);  // To store chart data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setChartData([]);  // Clear previous chart data when month changes
  };

  const fetchBarChartData = async () => {
    if (!month) {
      setError("Please select a month.");
      return;
    }

    setLoading(true);
    setError("");  // Reset error

    try {
      const response = await axios.get(
        `http://localhost:8000/api/transactions/bar-chart?month=${month}`
      );
      setChartData(response.data); // Store chart data
    } catch (err) {
      setError("Failed to fetch chart data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data for Chart.js
  const data = {
    labels: chartData.map((item) => item.range), // Price ranges
    datasets: [
      {
        label: "Number of Items",
        data: chartData.map((item) => item.count), // Count of items in each range
        backgroundColor: "#4CAF50", // Green bars
        borderColor: "#388E3C", // Darker green for borders
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-black drop-shadow-lg tracking-wide mb-8 font-serif">Transaction Bar Chart</h1>

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

      {/* Button to fetch chart data */}
      <div className="text-center mb-6">
        <button
          onClick={fetchBarChartData}
          disabled={loading}
          className="w-40 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch Chart"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Show the bar chart */}
      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        <div className="w-full h-90">
          {chartData.length === 0 ? (
            <div className="text-center text-xl text-gray-600">Select a month and click Fetch Chart.</div>
          ) : (
            <Bar data={data} options={{ responsive: true }} />
          )}
        </div>
      )}
    </div>
  );
};

export default BarChart;