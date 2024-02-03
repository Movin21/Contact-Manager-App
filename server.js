const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./persistance/db.js");
const contactRoutes = require("./routes/contactRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const app = express();

connectDB();
app.use(express.json());
app.use("/api/contacts", contactRoutes);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
