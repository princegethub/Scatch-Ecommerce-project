const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/scatch")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Bhaiya Error Aa gaya: ", error);
  });

module.exports = mongoose.connection;