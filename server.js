const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DB).then(() => {
  console.log(`DB Connection successfull`);
});