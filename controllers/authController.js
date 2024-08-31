const userModel = require("../model/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "User already registered. Please login");
      return res.redirect("/");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create the user
    user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate a token
    const token = generateToken(user);

    // Set the token in a cookie and send a response
    res.cookie("token", token);
    res.send("User created successfully");
  } catch (error) {
    console.error("Error registering user:", error); 
    if (!res.headersSent) {
      res.status(500).send(error.message);
    }
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Find the user
    let user = await userModel.findOne({ email: email });
    if (!user) {
     
      req.flash("error", "Email or password is incorrect");
      return res.redirect("/");
    }


    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        req.flash("error", "Email or password is incorrect");
        return res.redirect("/");
      }

      if (result) {
       
        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        req.flash("error", "Email or password is incorrect");
        return res.redirect("/");
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    if (!res.headersSent) {
      res.status(500).send("Internal server error");
    }
  }
};


module.exports.logoutUser = (req,res) => {
  res.cookie("token", "");
  res.redirect("/");
}