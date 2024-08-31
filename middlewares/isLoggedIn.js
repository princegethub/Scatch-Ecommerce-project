const userModel = require("../model/user-model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to log in first");
    return res.redirect("/");
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    // Find the user based on the decoded email
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    // Attach user to request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle errors
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
