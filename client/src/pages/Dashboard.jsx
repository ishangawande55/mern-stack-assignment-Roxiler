import React from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const linkClasses = (path, baseClass, activeClass) =>
    location.pathname === path ? `${baseClass} ${activeClass}` : baseClass;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-5xl font-extrabold text-center text-red-600 drop-shadow-lg tracking-wide mb-8 font-serif">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8 p-20">
          {/* Transactions Table Link */}
          <Link
            to="/transactions"
            aria-label="Go to Transactions Table"
            className={linkClasses(
              "/transactions",
              "p-10 bg-white border border-blue-300 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105",
              "bg-blue-50"
            )}
          >
            <h2 className="text-3xl font-semibold text-blue-600">Transactions Table</h2>
            <p className="text-gray-700 mt-4 text-lg">View and manage all transactions.</p>
          </Link>

          {/* Statistics Link */}
          <Link
            to="/statistics"
            aria-label="Go to Statistics"
            className={linkClasses(
              "/statistics",
              "p-10 bg-white border border-green-300 rounded-lg shadow-lg hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105",
              "bg-green-50"
            )}
          >
            <h2 className="text-3xl font-semibold text-green-600">Statistics</h2>
            <p className="text-gray-700 mt-4 text-lg">View transaction statistics.</p>
          </Link>

          {/* Bar Chart Link */}
          <Link
            to="/barchart"
            aria-label="Go to Bar Chart"
            className={linkClasses(
              "/barchart",
              "p-10 bg-white border border-yellow-300 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out transform hover:scale-105",
              "bg-yellow-50"
            )}
          >
            <h2 className="text-3xl font-semibold text-yellow-600">Bar Chart</h2>
            <p className="text-gray-700 mt-4 text-lg">Price range distribution.</p>
          </Link>

          {/* Pie Chart Link */}
          <Link
            to="/piechart"
            aria-label="Go to Pie Chart"
            className={linkClasses(
              "/piechart",
              "p-10 bg-white border border-red-300 rounded-lg shadow-lg hover:bg-red-100 transition duration-300 ease-in-out transform hover:scale-105",
              "bg-red-50"
            )}
          >
            <h2 className="text-3xl font-semibold text-red-600">Pie Chart</h2>
            <p className="text-gray-700 mt-4 text-lg">Category-wise distribution.</p>
          </Link>

          {/* Combined Result Link */}
          <Link
            to="/combined-result"
            aria-label="Go to Combined Result"
            className={linkClasses(
              "/combined-result",
              "p-10 bg-white border border-purple-300 rounded-lg shadow-lg hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105",
              "bg-purple-50"
            )}
          >
            <h2 className="text-3xl font-semibold text-purple-600">Combined Result</h2>
            <p className="text-gray-700 mt-4 text-lg">View the combined results of various charts and data.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;