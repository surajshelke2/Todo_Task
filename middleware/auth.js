const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { ErrorHandler } = require("./error");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "User is not present!!!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
     next(new ErrorHandler("Invalid Token",404))
  }
};

module.exports = isAuthenticated;
