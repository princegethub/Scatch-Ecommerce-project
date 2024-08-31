const mongoose = require("mongoose");
const config= require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => {
    dbgr("Database Connected");
  })
  .catch((error) => {
    dbgr("Bhaiya Error Aa gaya: ", error);
  });

module.exports = mongoose.connection;
