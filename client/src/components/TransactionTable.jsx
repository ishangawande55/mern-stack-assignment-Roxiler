import React, { useState, useEffect } from "react";
import MonthDropdown from "./MonthDropdown";
import loadingGif from "../assets/loading.gif"
import { getTransactions } from "../services/api";

const TransactionTable = () => {
  const [month, setMonth] = useState("March"); // Set default month to March
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data whenever the month, search, or page changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for month: ", month); // Debugging statement

      // Call the API to fetch transactions based on month, search, and page
      const data = await getTransactions(month, search, page);

      setTransactions(data.transactions || []); // Ensure we are setting an empty array if no data
      setTotalPages(data.totalPages || 1); // Update totalPages for pagination
    };

    fetchData();
  }, [month, search, page]); // Re-run the fetch when month, search, or page changes

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Transactions</h1>

      {/* MonthDropdown component to select month */}
      <MonthDropdown selectedMonth={month} onChange={setMonth} />

      {/* Search input to filter transactions */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 my-4 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Table to display transactions */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              ID
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Title
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Description
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Price
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Category
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Sold
            </th>
            <th className="p-2 border border-gray-200 text-left font-medium text-gray-700">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-2 text-center text-gray-500">
                No transactions found for this month.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const TransactionRow = ({ transaction }) => {
  const [loading, setLoading] = useState(true); // State for tracking image load
  const handleImageLoad = () => setLoading(false); // Function to handle image load

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2 border border-gray-200 text-gray-800">
        {transaction.id}
      </td>
      <td className="p-2 border border-gray-200 text-gray-800">
        {transaction.title}
      </td>
      <td className="p-2 border border-gray-200 text-gray-800">
        {transaction.description}
      </td>
      <td className="p-2 border border-gray-200 text-gray-800">
        ${transaction.price}
      </td>
      <td className="p-2 border border-gray-200 text-gray-800">
        {transaction.category}
      </td>
      <td className="p-2 border border-gray-200 text-gray-800">
        {transaction.sold ? "Yes" : "No"}
      </td>
      <td className="p-2 border border-gray-200">
        <div className="relative group">
          {/* Display loading spinner while the image is loading */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <img src={loadingGif} alt="Loading..." className="w-8 h-8" />
            </div>
          )}
          {/* Image with hover zoom and fade-in effect */}
          <img
            src={transaction.image}
            alt={transaction.title}
            onLoad={handleImageLoad}
            className={`h-16 w-16 object-cover rounded border border-gray-200 transition-transform duration-200 ease-in-out ${
              loading ? "opacity-0" : "opacity-100"
            } group-hover:scale-150 group-hover:z-10`}
          />
        </div>
      </td>
    </tr>
  );
};

export default TransactionTable;