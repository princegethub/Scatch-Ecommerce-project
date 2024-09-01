const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../model/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
 try {
    let {  name, discount, price, bgcolor, panelcolor, textcolor } =
    req.body;
  let product = await productModel.create({
    image : req.file.buffer,
    name,
    discount,
    price,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("success", "Product Created Successfully");
  res.redirect("/owners/admin");
  
 } catch (error) {
    res.send(error.message);
 } 
});

module.exports = router;
