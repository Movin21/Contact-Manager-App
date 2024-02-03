const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
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
