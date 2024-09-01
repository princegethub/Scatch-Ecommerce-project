const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../model/product-model");
const userModel = require("../model/user-model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const flash = require("flash");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error , loggedin:false});
});

router.get("/shop", isloggedin, async (req, res) => {
  try {
   
    let products = await productModel.find();
    let success = req.flash("success");
   
    res.render("shop", { products , success});
  } catch (error) {

    console.error(error);
    res.status(500).send("page Not found.");
  }
});



router.get("/cart", isloggedin, async (req, res) => {
  try {
   let user = await userModel.findOne({email: req.user.email}).populate("cart");


    let finalbill=  user.cart[0].price - user.cart[0].discount+ 20;
    res.render("cart" , {user , finalbill});
  } catch (error) {

    console.error(error);
    res.status(500).send("page Not found.");
  }
});


router.get("/addtocart/:productid", isloggedin, async (req, res) => {
  try {
   
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    
    req.flash("success", "Add To Cart")
    res.redirect("/shop");
  } catch (error) {

    console.error(error);
    res.status(500).send("page Not found.");
  }
});

module.exports = router;
