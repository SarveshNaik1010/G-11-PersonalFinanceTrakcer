const expenseModel = require("../model/expenseSchema");
const userModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");

exports.addExpense = async function (req, res, next) {
  const user = await userModel.findById(jwt.decode(req.cookies.userCookie).id);
  req.body.user = user._id;
  const newExpense = await expenseModel.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Added Successfully",
    newExpense,
  });
};

exports.getAllExpenses = async function (req, res, next) {
  const expenses = await expenseModel.find({ user: req.params.id });
  res.status(200).json({
    expenses,
  });
};

exports.editExpense = async function (req, res, next) {
  const expense = await expenseModel.findOne({ note: req.body.note });
  console.log(expense);
  const updateExpense = await expenseModel.updateOne(
    { _id: req.body.id },
    req.body
  );
  res.status(200).json({
    status: "success",
    updateExpense,
  });
};
