const express = require("express");
const router = express.Router();
const ownerModel = require("../model/owner-models");

router.get("/", (req, res) => {
  res.send("hey it is working");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let {fullname, email, password} = req.body;
    let owenrs = await ownerModel.find();
    if (owenrs.length > 0) {
      return res
        .status(500)
        .send("You don't have permisson to create a new owner");
    }
 let createdOwner =    await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

module.exports = router;
