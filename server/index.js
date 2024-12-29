const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
require("dotenv").config();

const initializeDbRoute = require("./routes/initializeDB");
const transactionsRoute = require("./routes/transactions");
const statisticsRoute = require("./routes/statistics");
const barChartRoute = require("./routes/barChart");
const pieChartRoute = require("./routes/pieChart");
const combinedStatsRoute = require("./routes/combinedStats")

const app = express();
app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/transactions", initializeDbRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/transactions", statisticsRoute);
app.use("/api/transactions", barChartRoute);
app.use("/api/transactions", pieChartRoute);
app.use("/api/transactions", combinedStatsRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});