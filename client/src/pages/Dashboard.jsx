import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-700 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8 p-20">
        {/* Transactions Table Link */}
        <Link
          to="/transactions"
          className="p-10 bg-white border border-blue-300 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-3xl font-semibold text-blue-600">Transactions Table</h2>
          <p className="text-gray-700 mt-4 text-lg">View and manage all transactions.</p>
        </Link>

        {/* Statistics Link */}
        <Link
          to="/statistics"
          className="p-10 bg-white border border-green-300 rounded-lg shadow-lg hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-3xl font-semibold text-green-600">Statistics</h2>
          <p className="text-gray-700 mt-4 text-lg">View transaction statistics.</p>
        </Link>

        {/* Bar Chart Link */}
        <Link
          to="/barchart"
          className="p-10 bg-white border border-yellow-300 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-3xl font-semibold text-yellow-600">Bar Chart</h2>
          <p className="text-gray-700 mt-4 text-lg">Price range distribution.</p>
        </Link>

        {/* Pie Chart Link */}
        <Link
          to="/piechart"
          className="p-10 bg-white border border-red-300 rounded-lg shadow-lg hover:bg-red-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <h2 className="text-3xl font-semibold text-red-600">Pie Chart</h2>
          <p className="text-gray-700 mt-4 text-lg">Category-wise distribution.</p>
        </Link>

        {/* Combined Result Link */}
        <Link
          to="/combined-result"
          className="p-10 bg-white border border-purple-300 rounded-lg shadow-lg hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105 "
        >
          <h2 className="text-3xl font-semibold text-purple-600">Combined Result</h2>
          <p className="text-gray-700 mt-4 text-lg">View the combined results of various charts and data.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;