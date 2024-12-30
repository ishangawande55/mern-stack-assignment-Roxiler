import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TransactionTable from "./components/TransactionTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import CombineResult from "./components/CombineResult";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionTable />} />
            <Route path="/statistics" element={<StatisticsBox />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/piechart" element={<PieChart />} />
            <Route path="/combined-result" element={<CombineResult />} />
          </Routes>
        </div>
        <footer className="bg-gray-800 text-white py-4">
          <div className="text-center">
            <a 
              href="https://github.com/ishangawande55" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex justify-center items-center space-x-2"
            >
              <svg
                className="w-6 h-6 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.74.5.5 5.74.5 12c0 5.08 3.29 9.36 7.86 10.87.57.1.78-.25.78-.55v-1.94c-3.19.7-3.87-1.37-3.87-1.37-.52-1.32-1.26-1.67-1.26-1.67-1.03-.71.08-.7.08-.7 1.13.08 1.72 1.16 1.72 1.16 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.64 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.47.1-3.07 0 0 .94-.3 3.07 1.15a10.63 10.63 0 015.58 0c2.12-1.44 3.06-1.15 3.06-1.15.6 1.6.22 2.78.1 3.07.72.8 1.16 1.82 1.16 3.07 0 4.39-2.69 5.35-5.25 5.63.42.37.8 1.09.8 2.2v3.26c0 .31.21.66.8.55A10.5 10.5 0 0023.5 12c0-6.26-5.24-11.5-11.5-11.5z" />
              </svg>
              <span>Created by Ishan Gawande</span>
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;