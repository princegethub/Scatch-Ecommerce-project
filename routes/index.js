const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../model/product-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isloggedin, async (req, res) => {
  try {
   
    let products = await productModel.find();
    res.render("shop", { products });
  } catch (error) {

    console.error(error);
    res.status(500).send("page Not found.");
  }
});

module.exports = router;
