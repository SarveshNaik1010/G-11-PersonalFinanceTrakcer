const authController = require("../controller/authController");
const expenseController = require("../controller/expenseController");
const express = require("express");

const router = express.Router();

router.route("/add").post(expenseController.addExpense);
router.route("/get/:user").get(expenseController.getAllExpenses);
router.route("/edit/:note").patch(expenseController.editExpense);
// router.route("/delete/:note").post(expenseController.deleteExpense);

module.exports = router;
