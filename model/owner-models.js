const mongoose = require("mongoose");


const ownerSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
 
  picture: String,
  gstin : String,
  products: {
    type: Array,
    default: [],
  },


});


module.exports = mongoose.model("user", ownerSchema);
