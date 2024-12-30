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
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionTable />} />
        <Route path="/statistics" element={<StatisticsBox />} />
        <Route path="/barchart" element={<BarChart />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/combined-result" element={<CombineResult />} />
      </Routes>
    </Router>
  );
}

export default App;