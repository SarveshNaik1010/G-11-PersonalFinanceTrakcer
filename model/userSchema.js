const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({

  fullName: {
    type: String,
    // require: [true, "Name is required"]
  },

  email: {
    type: String,
    // require: [true, "Name is required"]
  },

  password: {
    type: String,
    // require: [true, "Name is required"]
  },

  passwordConfirm: {
    type: String,
    validator: {
      validate: function (el) {
        this.password === el;
      },
      message: "Passwords are not the same",
    },
    // require: [true, "Name is required"]
  },

  incomeCash: {
    type: Number,
  },

  incomeOnline: {
    type: Number,
  },

  categoryList: {
    type: Object,
  },

  expenses: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
