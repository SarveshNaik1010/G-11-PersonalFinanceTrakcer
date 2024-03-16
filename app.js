// npm packages
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Local packages
const userRouter = require("./routes/userRouter");
const expenseRouter = require("./routes/expenseRouter");
const errorController = require("./controller/errorController");
const AppError = require("./utils/appError");

// Basic setup

const app = express();


app.use(cookieParser());
dotenv.config({ path: "./config.env" });

// Express middlewares
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);

app.use(errorController.globalErrorHandler);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "Fail";
  err.statusCode = 404;
  next(new AppError(err));
});

app.listen(process.env.PORT, () => {
  console.log(`Listining on port: ${process.env.PORT}`);
});

module.exports = app;
