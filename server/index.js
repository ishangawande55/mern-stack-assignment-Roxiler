const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("../server/routes/auth");
const transactionRoutes = require("../server/routes/transactionRoutes");
const mongoose=require("mongoose");

const app = express();
app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);  // For login
app.use("/api/transactions", transactionRoutes);  // For transaction-related routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});