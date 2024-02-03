const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a Name"],
    },
    email: {
      type: String,
      required: [true, "Add a email"],
    },
    phone: {
      type: String,
      required: [true, "Add a phone"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("contacts", contactSchema);
