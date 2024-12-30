import React, { useState } from "react";
import axios from "axios";

const Statistics = () => {
  const [month, setMonth] = useState("");  // Selected month
  const [statistics, setStatistics] = useState(null);  // To store statistics data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state

  // Reset statistics whenever the month changes
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setStatistics(null); // Clear previous statistics when month changes
  };

  const fetchStatistics = async () => {
    if (!month) {
      setError("Please select a month.");
      return;
    }

    setLoading(true);
    setError("");  // Reset error

    try {
      const response = await axios.get(
        `http://localhost:8000/api/transactions/statistics?month=${month}`
      );
      setStatistics(response.data); // Store statistics data
    } catch (err) {
      setError("Failed to fetch statistics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-black drop-shadow-lg tracking-wide mb-8 font-serif">Statistics</h1>

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
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Button to fetch statistics */}
      <div className="text-center mb-6">
        <button
          onClick={fetchStatistics}
          disabled={loading}
          className="w-40 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch Statistics"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Statistics display */}
      {statistics && !loading && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Statistics for {month}
          </h3>
          <ul className="space-y-4">
            <li className="text-lg text-gray-600">
              <strong className="font-semibold">Total Sale Amount:</strong> ${statistics.totalSaleAmount}
            </li>
            <li className="text-lg text-gray-600">
              <strong className="font-semibold">Sold Items:</strong> {statistics.soldItems}
            </li>
            <li className="text-lg text-gray-600">
              <strong className="font-semibold">Unsold Items:</strong> {statistics.unsoldItems}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Statistics;