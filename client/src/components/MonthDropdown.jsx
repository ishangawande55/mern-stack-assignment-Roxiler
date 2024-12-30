import React from "react";

const MonthDropdown = ({ selectedMonth, onChange }) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 my-4 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;