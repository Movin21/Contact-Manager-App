const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the userName"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "This email is already taken "],
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
