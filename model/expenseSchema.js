const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ExpenseSchema = mongoose.Schema({
  amount: Number,
  account: String,
  date: Date,
  time: String,
  note: String,
  category: String,
  user: {
    type: mongoose.ObjectId,
    ref: "users",
  },
});

const expenseModel = mongoose.model("expenses", ExpenseSchema);

module.exports = expenseModel;
