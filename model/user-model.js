const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  picture: String,

  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  orders: {
    type: Array,
    default: [],
  },

});


let user ;
try {
  user = mongoose.model('user');
} catch (error) {
  user = mongoose.model('user', userSchema);
}

module.exports = user;
