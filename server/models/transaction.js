const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
  image: String,
});

module.exports = mongoose.model("transaction", transactionSchema);