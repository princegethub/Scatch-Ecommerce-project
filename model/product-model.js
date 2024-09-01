const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  discount: {
    type: Number,
    default: 0
  },
  price: Number,
  bgcolor: String,
  panelcolor: String,
  textcolor : String,

});


module.exports = mongoose.model("product", postSchema);
