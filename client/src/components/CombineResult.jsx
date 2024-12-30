import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CombineResult = () => {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const fetchData = async () => {
    if (!month) {
      setError("Please select a month.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);
    try {
      const response = await axios.get(`http://localhost:8000/api/transactions/combined-stats?month=${month}`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (month) fetchData();
  }, [month]);

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: data?.pieChart.map((item) => item.category) || [],
    datasets: [
      {
        label: "Categories",
        data: data?.pieChart.map((item) => item.count) || [],
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#66BB6A", "#FF4081", "#64B5F6", "#BA68C8",
        ],
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#66BB6A", "#FF4081", "#64B5F6", "#BA68C8",
        ],
      },
    ],
  };

  // Prepare data for Bar Chart
  const barChartData = {
    labels: data?.barChart.map((range) => range.range) || [],
    datasets: [
      {
        label: "Price Range Count",
        data: data?.barChart.map((range) => range.count) || [],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6  bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Combined Stats Viewer</h1>

      <div className="mb-6">
        <label htmlFor="month" className="block text-lg font-semibold mb-2">
          Select Month
        </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Select a Month --</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-blue-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {data && (
        <div>
          {/* Statistics Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-gray-500">Total Sale Amount</p>
                <p className="text-xl font-bold">${data.statistics.totalSaleAmount}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-gray-500">Sold Items</p>
                <p className="text-xl font-bold">{data.statistics.soldItems}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-gray-500">Unsold Items</p>
                <p className="text-xl font-bold">{data.statistics.unsoldItems}</p>
              </div>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Pie Chart</h2>
            <div className="p-4 bg-white rounded-lg shadow">
              <Pie data={pieChartData} />
            </div>
          </div>

          {/* Bar Chart Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Bar Chart</h2>
            <div className="p-4 bg-white rounded-lg shadow">
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombineResult;